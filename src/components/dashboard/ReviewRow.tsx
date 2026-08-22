import { Badge, Icon } from '@/components/ui';
import type { ReviewItem } from '@/types';

export interface ReviewRowProps {
  item: ReviewItem;
  onSelect?: (id: string) => void;
}

/** One "Needs your review" entry (1:1344): title + tag, description, trailing chevron. */
export function ReviewRow({ item, onSelect }: ReviewRowProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between gap-6 rounded-md text-left transition-colors hover:bg-surface/60"
      onClick={() => {
        onSelect?.(item.id);
      }}
    >
      <span className="flex min-w-0 flex-col gap-2">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-display text-base font-medium text-graphite">{item.title}</span>
          <Badge tone={item.tag.tone}>{item.tag.label}</Badge>
        </span>
        <span className="font-sans text-sm text-graphite/60">{item.description}</span>
      </span>
      <Icon name="arrow-right" />
    </button>
  );
}
