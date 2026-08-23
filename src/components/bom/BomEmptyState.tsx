import dataInsights from '@/assets/images/data-insights.svg';

export interface BomEmptyStateProps {
  title: string;
  description: string;
}

/** "No BOMs Yet" (1:19269): 200px illustration over centred copy, vertically centred in the card. */
export function BomEmptyState({ title, description }: BomEmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-6">
      <div className="flex w-bom-empty-copy max-w-full flex-col items-center gap-6 text-center">
        {/* The heading carries the meaning; the artwork is decorative. */}
        <img src={dataInsights} width={200} height={200} alt="" className="size-50" />
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-display text-xl font-semibold text-graphite">{title}</h3>
          <p className="font-sans text-base text-graphite/60">{description}</p>
        </div>
      </div>
    </div>
  );
}
