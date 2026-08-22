import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';
import type { PurchaseOrderSummary } from '@/types';

import { SectionHeader } from './SectionHeader';

export interface PurchaseOrderDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Restores focus to the opener when the dialog closes (see `useDisclosure`). */
  onCloseAutoFocus?: (event: Event) => void;
  po: PurchaseOrderSummary | null;
  onDone: (id: string) => void;
}

/** PO detail dialog opened from a watchlist row (1:20239). */
export function PurchaseOrderDetailModal({
  open,
  onOpenChange,
  onCloseAutoFocus,
  po,
  onDone,
}: PurchaseOrderDetailModalProps) {
  if (!po) return null;

  const facts = [
    { label: 'Total', value: po.total },
    { label: 'Sent', value: po.sent },
    { label: 'Vendor Commit', value: po.vendorCommit },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg" onCloseAutoFocus={onCloseAutoFocus}>
        <DialogHeader>
          <DialogTitle>{po.number}</DialogTitle>
          <DialogDescription>{po.vendor}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <dl className="grid grid-cols-modal-facts gap-y-4 rounded-lg border border-subtle p-5.75 font-sans text-lg text-graphite">
            <dt className="text-graphite/60">Ack State</dt>
            <dd>
              <Badge tone={po.ackState.tone}>{po.ackState.label}</Badge>
            </dd>
            {facts.map((fact) => (
              <FactRow key={fact.label} label={fact.label} value={fact.value} />
            ))}
          </dl>

          <section className="flex flex-col gap-3">
            <SectionHeader size="md" title="Thread" />
            {/* Populated threads are not designed; only the empty state exists (1:20270). */}
            <p className="font-sans text-base text-graphite/60">No thread messages indexed yet.</p>
          </section>

          {po.chasers.length > 0 ? (
            <section className="flex flex-col gap-3">
              <SectionHeader size="md" title="Chasers" />
              {po.chasers.map((chaser) => (
                <div key={chaser.id} className="flex items-center">
                  <span className="min-w-0 flex-1 truncate font-sans text-lg text-graphite/60">
                    {chaser.kind}
                  </span>
                  <span className="flex min-w-0 flex-1 items-center gap-3">
                    {/* Figma dims the whole tag to 60% (1:20276) rather than just its text. */}
                    <Badge tone="neutral" dot={false} className="text-graphite opacity-60">
                      {chaser.state.label}
                    </Badge>
                    <span className="truncate font-sans text-base text-graphite/60">
                      {chaser.draftedLabel}
                    </span>
                  </span>
                </div>
              ))}
            </section>
          ) : null}

          <section className="flex flex-col gap-3">
            <SectionHeader size="md" title="ACK History" />
            <p className="font-sans text-base text-graphite/60">No ack history yet.</p>
          </section>
        </div>

        <DialogFooter>
          <Button
            variant="neutral"
            size="lg"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              onDone(po.id);
            }}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-graphite/60">{label}</dt>
      <dd className="truncate">{value}</dd>
    </>
  );
}
