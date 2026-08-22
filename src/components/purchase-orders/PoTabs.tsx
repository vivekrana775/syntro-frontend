import { SegmentedControl } from '@/components/ui';
import type { PurchaseOrdersTab, PurchaseOrdersTabMeta } from '@/types';

const TAB_ORDER: readonly PurchaseOrdersTab[] = ['watchlist', 'tracker'];

export interface PoTabsProps {
  value: PurchaseOrdersTab;
  tabs: Record<PurchaseOrdersTab, PurchaseOrdersTabMeta>;
  onValueChange: (tab: PurchaseOrdersTab) => void;
}

/** Watchlist / Tracker switcher (1:20006). Counts are zero-padded to two digits like the design. */
export function PoTabs({ value, tabs, onValueChange }: PoTabsProps) {
  const options = TAB_ORDER.map((tab) => ({
    value: tab,
    label: `${tabs[tab].label} (${String(tabs[tab].count).padStart(2, '0')})`,
  }));

  return (
    <SegmentedControl
      tone="paper"
      fit="hug"
      aria-label="Purchase order views"
      options={options}
      value={value}
      onValueChange={onValueChange}
    />
  );
}
