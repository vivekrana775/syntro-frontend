import { Badge } from '@/components/ui';

export interface PurchaseOrderDetailHeaderProps {
  number: string;
  supplier: string;
  stateLabel: string;
}

/** PO number + state tag + supplier (1:20619). */
export function PurchaseOrderDetailHeader({
  number,
  supplier,
  stateLabel,
}: PurchaseOrderDetailHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <h2 className="font-display text-2xl font-semibold leading-8 text-graphite">{number}</h2>
        <Badge tone="outline" size="md" dot={false}>
          {stateLabel}
        </Badge>
      </div>
      <p className="font-sans text-base text-graphite/60">{supplier}</p>
    </div>
  );
}
