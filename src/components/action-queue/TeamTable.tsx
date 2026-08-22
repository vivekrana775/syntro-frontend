import { cn } from '@/lib/cn';
import type { TeamGroup } from '@/types';

import { TeamGroupRows } from './TeamGroupRows';

export interface TeamTableProps {
  groups: TeamGroup[];
  onView: (id: string) => void;
}

// Figma's header row is a bordered, rounded box whose text sits 18px in; the 1px border is inside
// the cell, so the first column pads 17px (`pl-4.25`) to land on the same pixel as the body rows.
const headerCellClasses =
  'h-14 border-y border-subtle pl-4.5 pr-4 text-left align-middle font-sans text-base font-medium text-graphite first:rounded-l-lg first:border-l first:pl-4.25 last:rounded-r-lg last:border-r';

/** "Team" tab (1:22922): grouped table of escalations and shipments with a view action per row. */
export function TeamTable({ groups, onView }: TeamTableProps) {
  return (
    <section aria-labelledby="team-heading" className="flex flex-col gap-6 p-6">
      <h2 id="team-heading" className="font-display text-xl font-semibold text-graphite">
        Team
      </h2>
      {/* Desktop-only design: below the table's natural width it scrolls instead of reflowing. */}
      <div className="overflow-x-auto">
        <table
          aria-labelledby="team-heading"
          className={cn('w-full min-w-review-table table-fixed border-separate border-spacing-0')}
        >
          <colgroup>
            <col className="w-col-ref" />
            <col />
            <col className="w-col-age" />
            <col className="w-col-actions" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className={headerCellClasses}>
                REF
              </th>
              <th scope="col" className={headerCellClasses}>
                Action
              </th>
              <th scope="col" className={headerCellClasses}>
                Age
              </th>
              <th scope="col" className={headerCellClasses}>
                Actions
              </th>
            </tr>
          </thead>
          {groups.map((group, index) => (
            <TeamGroupRows key={group.id} group={group} first={index === 0} onView={onView} />
          ))}
        </table>
      </div>
    </section>
  );
}
