import { useId, useState } from 'react';

import { Badge, Button, Input } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { ReconcileGap } from '@/types';

export interface MissingInfoRowProps {
  gap: ReconcileGap;
  onSave: (id: string, vendorId: string) => void;
}

/** One supplier missing its NetSuite vendor id (1:22659): name + chip, inline id field and Save. */
export function MissingInfoRow({ gap, onSave }: MissingInfoRowProps) {
  const inputId = useId();
  const [vendorId, setVendorId] = useState('');

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-surface p-4.5">
      <div
        className={cn(
          'flex items-start',
          // The last designed row (1:22699) lays the chip beside the name instead of under it.
          gap.layout === 'inline' ? 'flex-row items-center gap-3' : 'flex-col gap-3',
        )}
      >
        <p className="font-sans text-base text-graphite">{gap.supplierName}</p>
        <Badge tone="paper" dot={false} className="text-graphite/60">
          No Netsuite ID
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="sr-only" htmlFor={inputId}>
          NetSuite Vendor ID for {gap.supplierName}
        </label>
        <Input
          id={inputId}
          placeholder="NetSuite Vendor ID"
          value={vendorId}
          onChange={(event) => {
            setVendorId(event.target.value);
          }}
          fieldClassName="w-sup-vendor-id"
        />
        <Button
          variant="paper"
          size="lg"
          onClick={() => {
            onSave(gap.id, vendorId);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
