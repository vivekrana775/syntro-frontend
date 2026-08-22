import { InboxList, InboxRow } from '@/components/review';
import { actionQueueItemPath } from '@/lib/constants';
import type { InboundRfqItem } from '@/types';

export interface NeedsYouListProps {
  items: InboundRfqItem[];
}

/** "Needs You" tab (1:22810): heading and one row per inbound RFQ reply. */
export function NeedsYouList({ items }: NeedsYouListProps) {
  return (
    <section aria-labelledby="needs-you-heading" className="flex flex-col gap-6 p-6">
      <h2 id="needs-you-heading" className="font-display text-xl font-semibold text-graphite">
        Needs You
      </h2>
      <InboxList>
        {items.map((item) => (
          <InboxRow
            key={item.id}
            to={actionQueueItemPath(item.id)}
            title={item.category}
            subtitle={item.summary}
            meta={item.age}
          />
        ))}
      </InboxList>
    </section>
  );
}
