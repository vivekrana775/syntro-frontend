import dataInsights from '@/assets/images/data-insights.svg';
import { EmptyState } from '@/components/ui';

/** "No Suppliers Yet" (1:22049): the data-insights illustration over centred copy. */
export function SuppliersEmptyState() {
  return (
    <EmptyState
      className="w-bom-empty-copy"
      title="No Suppliers Yet"
      description="Add your first supplier to start building your approved vendor list."
      // The heading carries the meaning; the artwork is decorative.
      media={<img src={dataInsights} width={200} height={200} alt="" className="size-50" />}
    />
  );
}
