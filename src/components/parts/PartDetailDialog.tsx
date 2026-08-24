import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Divider,
  Icon,
  type SelectOption,
} from '@/components/ui';
import { cn } from '@/lib/cn';
import {
  TOOLING_OWNER_LABEL,
  TOOLING_OWNERS,
  type Part,
  type PartHistoryEntry,
  type PartIncumbent,
} from '@/types';

import { IncumbentForm, type IncumbentFormValues } from './IncumbentForm';

export interface PartDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Restores focus to the opener when the dialog closes (see `useDisclosure`). */
  onCloseAutoFocus?: (event: Event) => void;
  part: Part | null;
  /** Approved vendors offered by the incumbent form's Supplier select. */
  supplierOptions: readonly SelectOption[];
  onAssignIncumbent: (partId: string, incumbent: PartIncumbent) => void;
}

const sectionTitle = 'font-display text-lg font-semibold text-graphite';
const muted = 'font-sans text-lg text-graphite/60';

/**
 * Part detail dialog (1:21214): incumbent supplier, BOM usage, purchase history and quotes.
 * "Assign Supplier" swaps the first section for the inline incumbent form (1:21452).
 */
export function PartDetailDialog({
  open,
  onOpenChange,
  onCloseAutoFocus,
  part,
  supplierOptions,
  onAssignIncumbent,
}: PartDetailDialogProps) {
  return (
    <Dialog open={open && part !== null} onOpenChange={onOpenChange}>
      {part ? (
        <DialogContent size="lg" onCloseAutoFocus={onCloseAutoFocus}>
          {/* Radix unmounts the content on close, so the dialog reopens in read mode with a fresh draft. */}
          <PartDetailContent
            part={part}
            supplierOptions={supplierOptions}
            onAssignIncumbent={onAssignIncumbent}
          />
        </DialogContent>
      ) : null}
    </Dialog>
  );
}

interface PartDetailContentProps {
  part: Part;
  supplierOptions: readonly SelectOption[];
  onAssignIncumbent: (partId: string, incumbent: PartIncumbent) => void;
}

const draftFrom = (incumbent: PartIncumbent | null): IncumbentFormValues => ({
  supplierId: incumbent?.supplierId ?? '',
  toolingOwner: incumbent?.toolingOwner ?? '',
  sunkNre: incumbent?.sunkNre ?? '',
  notes: incumbent?.notes ?? '',
});

function PartDetailContent({ part, supplierOptions, onAssignIncumbent }: PartDetailContentProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<IncumbentFormValues>(() => draftFrom(part.incumbent));

  const handleEdit = () => {
    setDraft(draftFrom(part.incumbent));
    setEditing(true);
  };

  const handleSave = () => {
    const supplier = supplierOptions.find((option) => option.value === draft.supplierId);
    if (!supplier) return;
    onAssignIncumbent(part.id, {
      supplierId: supplier.value,
      supplierName: supplier.label,
      toolingOwner: TOOLING_OWNERS.find((owner) => owner === draft.toolingOwner) ?? null,
      sunkNre: draft.sunkNre.trim(),
      notes: draft.notes.trim(),
    });
    setEditing(false);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{part.number}</DialogTitle>
        <DialogDescription>{part.description}</DialogDescription>
      </DialogHeader>
      <Divider />

      <section aria-label="Tooled / Incumbent Supplier" className="flex flex-col gap-4">
        {editing ? (
          <>
            <h3 className={sectionTitle}>Tooled / Incumbent Supplier</h3>
            <IncumbentForm
              values={draft}
              onChange={setDraft}
              supplierOptions={supplierOptions}
              onSave={handleSave}
              onCancel={() => {
                setEditing(false);
              }}
            />
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <h3 className={sectionTitle}>Tooled / Incumbent Supplier</h3>
              {part.incumbent ? (
                <IncumbentSummary incumbent={part.incumbent} />
              ) : (
                <p className={muted}>No incumbent set</p>
              )}
            </div>
            <Button
              variant="neutral"
              size="md"
              className="gap-2 self-start"
              leadingIcon={<Icon name={part.incumbent ? 'edit' : 'plus'} size={20} />}
              onClick={handleEdit}
            >
              {part.incumbent ? 'Edit Incumbent' : 'Assign Supplier'}
            </Button>
          </>
        )}
      </section>

      <section aria-label="Appears in BOM" className="flex flex-col gap-4">
        <h3 className={sectionTitle}>Appears in BOM</h3>
        {part.boms.map((bom) => (
          <p key={bom} className={muted}>
            {bom}
          </p>
        ))}
      </section>

      <section aria-label="Purchase History" className="flex flex-col gap-4">
        <h3 className={sectionTitle}>Purchase History</h3>
        {part.purchases.length > 0 ? (
          part.purchases.map((entry) => <HistoryRow key={entry.id} entry={entry} />)
        ) : (
          <p className={muted}>No purchase history.</p>
        )}
      </section>

      <section aria-label="Historical Quotes" className="flex flex-col gap-4">
        <h3 className={sectionTitle}>Historical Quotes</h3>
        {part.quotes.length > 0 ? (
          part.quotes.map((entry) => <HistoryRow key={entry.id} entry={entry} />)
        ) : (
          <p className={muted}>No supplier quotes on file.</p>
        )}
      </section>
    </>
  );
}

interface HistoryRowProps {
  entry: PartHistoryEntry;
}

/** Supplier · price · relative time spread across the dialog width (1:21237). */
function HistoryRow({ entry }: HistoryRowProps) {
  return (
    <div className={cn('flex items-center justify-between gap-4', muted)}>
      <span className="truncate">{entry.supplier}</span>
      <span>{entry.priceLabel}</span>
      <span>{entry.whenLabel}</span>
    </div>
  );
}

interface IncumbentSummaryProps {
  incumbent: PartIncumbent;
}

/** The saved incumbent in read mode — Figma only draws the unset state ("No incumbent set"). */
function IncumbentSummary({ incumbent }: IncumbentSummaryProps) {
  const facts: string[] = [];
  if (incumbent.toolingOwner) {
    facts.push(`Tooling owner: ${TOOLING_OWNER_LABEL[incumbent.toolingOwner]}`);
  }
  if (incumbent.sunkNre) facts.push(`Sunk NRE: ${incumbent.sunkNre}`);
  if (incumbent.notes) facts.push(incumbent.notes);

  return (
    <>
      <p className={muted}>{incumbent.supplierName}</p>
      {facts.length > 0 ? (
        <p className="font-sans text-base text-graphite/60">{facts.join(' · ')}</p>
      ) : null}
    </>
  );
}
