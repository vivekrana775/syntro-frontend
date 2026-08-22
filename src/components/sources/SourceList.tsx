import { InboxList, InboxRow } from '@/components/review';
import { sourcePath } from '@/lib/constants';
import type { SourceEmail } from '@/types';

export interface SourceListProps {
  /** Count heading exactly as displayed, e.g. "Unrouted (04)". */
  heading: string;
  items: SourceEmail[];
}

/** Sources list (1:23197): count heading and one row per synced email. */
export function SourceList({ heading, items }: SourceListProps) {
  return (
    <section aria-labelledby="sources-heading" className="flex flex-col gap-4 p-6">
      <h2 id="sources-heading" className="font-display text-lg text-graphite">
        {heading}
      </h2>
      {items.length > 0 ? (
        <InboxList>
          {items.map((item) => (
            <InboxRow
              key={item.id}
              to={sourcePath(item.id)}
              title={item.sender.name}
              subtitle={item.subject}
              meta={item.receivedAt.short}
            />
          ))}
        </InboxList>
      ) : (
        // Empty tabs are not designed in Figma; a muted line keeps the card from collapsing.
        <p className="font-display text-base text-graphite/60">No sources in this view.</p>
      )}
    </section>
  );
}
