import dataInsights from '@/assets/images/data-insights.svg';
import { EmptyState } from '@/components/ui';

export interface BomEmptyStateProps {
  title: string;
  description: string;
}

/** "No BOMs Yet" (1:19269): 200px illustration over centred copy, vertically centred in the card. */
export function BomEmptyState({ title, description }: BomEmptyStateProps) {
  return (
    <EmptyState
      className="w-bom-empty-copy"
      title={title}
      description={description}
      // The heading carries the meaning; the artwork is decorative.
      media={<img src={dataInsights} width={200} height={200} alt="" className="size-50" />}
    />
  );
}
