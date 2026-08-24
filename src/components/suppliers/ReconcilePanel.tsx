import { useId, useState } from 'react';

import { SectionHeader } from '@/components/purchase-orders';
import { Button, FormField, Select } from '@/components/ui';
import type { ReconcileGap, Supplier } from '@/types';

import { MissingInfoRow } from './MissingInfoRow';

export interface ReconcilePanelProps {
  suppliers: readonly Supplier[];
  gaps: readonly ReconcileGap[];
  onMerge: (keepId: string, mergeId: string) => void;
  onSaveVendorId: (gapId: string, vendorId: string) => void;
}

/** Reconcile tab (1:22519): merge two supplier records and fill missing NetSuite vendor ids. */
export function ReconcilePanel({ suppliers, gaps, onMerge, onSaveVendorId }: ReconcilePanelProps) {
  const mergeHeadingId = useId();
  const missingHeadingId = useId();
  const [keepId, setKeepId] = useState('');
  const [mergeId, setMergeId] = useState('');

  const options = suppliers.map((supplier) => ({ value: supplier.id, label: supplier.name }));

  return (
    <div className="flex flex-1 flex-col gap-6">
      <section aria-labelledby={mergeHeadingId} className="flex flex-col gap-5">
        <SectionHeader
          id={mergeHeadingId}
          title="Merge two suppliers"
          description="Same vendor under two supplier records that didn't auto-cluster (e.g. an abbreviation)."
        />
        <div className="flex flex-wrap items-end gap-4">
          <FormField label="Keep" htmlFor="reconcile-keep" className="max-w-modal-sm flex-1">
            <Select
              id="reconcile-keep"
              placeholder="Select"
              value={keepId}
              onValueChange={setKeepId}
              options={options}
            />
          </FormField>
          <FormField label="Merge In" htmlFor="reconcile-merge" className="max-w-modal-sm flex-1">
            <Select
              id="reconcile-merge"
              placeholder="Select"
              value={mergeId}
              onValueChange={setMergeId}
              options={options}
            />
          </FormField>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              onMerge(keepId, mergeId);
            }}
          >
            Merge
          </Button>
        </div>
      </section>

      <section aria-labelledby={missingHeadingId} className="flex flex-col gap-5">
        <SectionHeader
          id={missingHeadingId}
          title="Missing Info"
          description="Suppliers missing a NetSuite vendor id can't be issued a PO. Fill it inline; email/domain gaps are managed on the supplier's row."
        />
        <div className="flex flex-col gap-2">
          {gaps.map((gap) => (
            <MissingInfoRow key={gap.id} gap={gap} onSave={onSaveVendorId} />
          ))}
        </div>
      </section>
    </div>
  );
}
