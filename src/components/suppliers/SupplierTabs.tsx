import { SegmentedControl } from '@/components/ui';
import { SUPPLIERS_TABS, type SuppliersTab, type SuppliersTabMeta } from '@/types';

export interface SupplierTabsProps {
  value: SuppliersTab;
  tabs: Record<SuppliersTab, SuppliersTabMeta>;
  counts: Record<SuppliersTab, number>;
  onValueChange: (tab: SuppliersTab) => void;
}

/** Approved / Discovered / Reconcile switcher (1:21919). Counts are zero-padded to two digits like the design. */
export function SupplierTabs({ value, tabs, counts, onValueChange }: SupplierTabsProps) {
  const options = SUPPLIERS_TABS.map((tab) => ({
    value: tab,
    label: `${tabs[tab].label} (${String(counts[tab]).padStart(2, '0')})`,
  }));

  return (
    <SegmentedControl
      tone="paper"
      fit="hug"
      aria-label="Supplier views"
      options={options}
      value={value}
      onValueChange={onValueChange}
    />
  );
}
