import dataInsights from '@/assets/images/data-insights.svg';
import { EmptyState } from '@/components/ui';

/** "No Parts Yet" (1:20763): the data-insights illustration over centred copy. */
export function PartsLibraryEmptyState() {
  return (
    <EmptyState
      className="w-bom-empty-copy"
      title="No Parts Yet"
      description="Upload a BOM to automatically extract and organize your parts for sourcing."
      // The heading carries the meaning; the artwork is decorative.
      media={<img src={dataInsights} width={200} height={200} alt="" className="size-50" />}
    />
  );
}
