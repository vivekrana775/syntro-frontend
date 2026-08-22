import { Button, Icon } from '@/components/ui';
import type { DashboardData } from '@/types';

import { ReviewList } from './ReviewList';

export interface ReviewSectionProps {
  review: DashboardData['review'];
  onOpenQueue?: () => void;
  onSelectItem?: (id: string) => void;
}

/** "Needs your review" header + list (1:1334, 1:1343). */
export function ReviewSection({ review, onOpenQueue, onSelectItem }: ReviewSectionProps) {
  const count = String(review.queueCount).padStart(2, '0');

  return (
    <section aria-labelledby="review-heading" className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 id="review-heading" className="font-display text-xl font-semibold text-graphite">
            {review.title}
          </h2>
          <p className="font-sans text-base text-graphite/60">{review.subtitle}</p>
        </div>
        <Button
          variant="primary"
          size="md"
          className="mt-[3px]"
          trailingIcon={<Icon name="arrow-top-right" size={18} />}
          onClick={onOpenQueue}
        >
          Open action queue ({count})
        </Button>
      </div>
      <ReviewList items={review.items} onSelect={onSelectItem} />
    </section>
  );
}
