import {
  PURCHASE_ORDER_FACT_KEYS,
  PURCHASE_ORDER_FACT_LABELS,
  type PurchaseOrderFactKey,
} from '@/types';

export interface PoFactsListProps {
  facts: Record<PurchaseOrderFactKey, string>;
}

/** Two-column facts list under the PO title (1:20625). */
export function PoFactsList({ facts }: PoFactsListProps) {
  return (
    <dl className="grid max-w-po-facts grid-cols-2 gap-y-4 font-sans text-lg text-graphite">
      {PURCHASE_ORDER_FACT_KEYS.map((key) => (
        <FactRow key={key} label={PURCHASE_ORDER_FACT_LABELS[key]} value={facts[key]} />
      ))}
    </dl>
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
