import { Card } from '@/components/ui';
import type { PurchaseOrderDetail } from '@/types';

import { PoFactsList } from './PoFactsList';
import { PurchaseOrderDetailHeader } from './PurchaseOrderDetailHeader';
import { ShipmentTimelinePanel } from './ShipmentTimelinePanel';
import { SupplierMemoryPanel } from './SupplierMemoryPanel';

export interface PurchaseOrderDetailContentProps {
  detail: PurchaseOrderDetail;
  onGenerateTimeline: (id: string) => void;
}

/** Everything inside the PO detail page's `<main>` (1:20501). */
export function PurchaseOrderDetailContent({
  detail,
  onGenerateTimeline,
}: PurchaseOrderDetailContentProps) {
  return (
    <div className="flex flex-col gap-6">
      <PurchaseOrderDetailHeader
        number={detail.number}
        supplier={detail.supplier}
        stateLabel={detail.stateLabel}
      />
      <PoFactsList facts={detail.facts} />
      <Card padding="none" className="flex min-h-po-detail-h flex-col lg:flex-row">
        <ShipmentTimelinePanel
          onGenerateTimeline={() => {
            onGenerateTimeline(detail.id);
          }}
        />
        <SupplierMemoryPanel memory={detail.supplierMemory} />
      </Card>
    </div>
  );
}
