import { Card } from '@/components/ui';
import type { ReviewItem } from '@/types';

import { ReviewRow } from './ReviewRow';

export interface ReviewListProps {
  items: ReviewItem[];
  onSelect?: (id: string) => void;
}

/** Paper card listing review items separated by hairlines (1:1343). */
export function ReviewList({ items, onSelect }: ReviewListProps) {
  return (
    <Card>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li
            key={item.id}
            // 24px above and below each row; the hairline sits on the boundary without adding height
            className="relative py-6 first:pt-0 last:pb-0 [&:not(:first-child)]:before:absolute [&:not(:first-child)]:before:inset-x-0 [&:not(:first-child)]:before:top-0 [&:not(:first-child)]:before:h-px [&:not(:first-child)]:before:bg-graphite/[0.08]"
          >
            <ReviewRow item={item} onSelect={onSelect} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
