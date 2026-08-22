import { useState } from 'react';

import { Icon, IconButton } from '@/components/ui';
import { cn } from '@/lib/cn';
import { pad2 } from '@/lib/review';
import type { TeamGroup } from '@/types';

export interface TeamGroupRowsProps {
  group: TeamGroup;
  /** The first group sits 18px under the header row; later groups 12px under the previous rows. */
  first: boolean;
  onView: (id: string) => void;
}

const cellClasses =
  'h-14 border-b border-subtle pl-4.5 pr-4 text-left align-middle font-sans text-base text-graphite/60';

/** One collapsible group of the Team table (1:22932, 1:22966): vermilion label row, then its items. */
export function TeamGroupRows({ group, first, onView }: TeamGroupRowsProps) {
  const [open, setOpen] = useState(true);

  return (
    <tbody>
      <tr>
        <th
          scope="rowgroup"
          colSpan={4}
          className={cn('px-0 pb-2 text-left', first ? 'pt-4.5' : 'pt-3')}
        >
          <button
            type="button"
            aria-expanded={open}
            className="flex items-center gap-4 rounded-sm font-sans text-base font-medium text-vermilion"
            onClick={() => {
              setOpen((value) => !value);
            }}
          >
            {group.label} ({pad2(group.items.length)})
            <Icon
              name="arrow-bottom"
              size={20}
              className={cn('transition-transform', !open && '-rotate-90')}
            />
          </button>
        </th>
      </tr>
      {open
        ? group.items.map((item, index) => {
            const last = index === group.items.length - 1;
            return (
              <tr key={item.id}>
                <td className={cn(cellClasses, last && 'border-b-0')}>{item.ref}</td>
                <td className={cn(cellClasses, 'truncate', last && 'border-b-0')}>
                  {item.summary}
                </td>
                <td className={cn(cellClasses, last && 'border-b-0')}>{item.age}</td>
                <td className={cn(cellClasses, last && 'border-b-0')}>
                  <IconButton
                    variant="surface"
                    size={32}
                    aria-label={`View: ${item.summary}`}
                    onClick={() => {
                      onView(item.id);
                    }}
                  >
                    <Icon name="eye" size={16} />
                  </IconButton>
                </td>
              </tr>
            );
          })
        : null}
    </tbody>
  );
}
