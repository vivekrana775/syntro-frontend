import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormField,
  Select,
} from '@/components/ui';
import {
  PURCHASE_HISTORY_FILTERS,
  PURCHASE_HISTORY_LABEL,
  type PurchaseHistoryFilter,
} from '@/types';

export interface PartsFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Restores focus to the opener when the dialog closes (see `useDisclosure`). */
  onCloseAutoFocus?: (event: Event) => void;
  /** The filter currently applied to the list; the form opens on it. */
  value: PurchaseHistoryFilter;
  onApply: (filter: PurchaseHistoryFilter) => void;
}

const OPTIONS = PURCHASE_HISTORY_FILTERS.map((filter) => ({
  value: filter,
  label: PURCHASE_HISTORY_LABEL[filter],
}));

/** "Filter" dialog (1:21680): the Has Purchase History select with Reset / Apply. */
export function PartsFilterDialog({
  open,
  onOpenChange,
  onCloseAutoFocus,
  value,
  onApply,
}: PartsFilterDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md" onCloseAutoFocus={onCloseAutoFocus}>
        {/* Radix unmounts the content on close, so the draft re-seeds from `value` each time it opens. */}
        <PartsFilterForm value={value} onApply={onApply} />
      </DialogContent>
    </Dialog>
  );
}

interface PartsFilterFormProps {
  value: PurchaseHistoryFilter;
  onApply: (filter: PurchaseHistoryFilter) => void;
}

function PartsFilterForm({ value, onApply }: PartsFilterFormProps) {
  const [draft, setDraft] = useState<PurchaseHistoryFilter>(value);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Filter</DialogTitle>
        <DialogDescription>Refine the parts list using the filters below.</DialogDescription>
      </DialogHeader>

      <FormField label="Has Purchase History" htmlFor="filter-purchase-history">
        <Select
          id="filter-purchase-history"
          options={OPTIONS}
          value={draft}
          onValueChange={(next) => {
            setDraft(PURCHASE_HISTORY_FILTERS.find((filter) => filter === next) ?? 'any');
          }}
        />
      </FormField>

      <DialogFooter>
        <Button
          variant="neutral"
          size="lg"
          onClick={() => {
            setDraft('any');
          }}
        >
          Reset
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            onApply(draft);
          }}
        >
          Apply
        </Button>
      </DialogFooter>
    </>
  );
}
