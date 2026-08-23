import { useId, useState } from 'react';

import { Badge, Checkbox, Icon, IconButton } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { BomAssembly } from '@/types';

import { BomTreeRow } from './BomTreeRow';

export interface BomTreeProps {
  assembly: BomAssembly;
  selected: ReadonlySet<string>;
  onToggle: (id: string) => void;
  onView: (id: string) => void;
}

/**
 * Assembly tree (1:19453): a 582px bordered scroll box with the root row and its parts joined by
 * a tree connector. Rows hold their own controls, so this is a disclosure list rather than an ARIA tree.
 */
export function BomTree({ assembly, selected, onToggle, onView }: BomTreeProps) {
  const [open, setOpen] = useState(true);
  const panelId = useId();

  return (
    <div className="scrollbar-slate h-bom-tree overflow-auto rounded-lg border border-subtle p-3.5">
      <div className="grid grid-cols-bom-root items-start pr-7.25">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex items-center gap-4">
            <Checkbox
              aria-label={`Select ${assembly.number}`}
              checked={selected.has(assembly.id)}
              onChange={() => {
                onToggle(assembly.id);
              }}
            />
            <div className="flex min-w-0 items-center gap-3">
              <span className="truncate font-display text-lg font-semibold text-graphite">
                {assembly.number}
              </span>
              {assembly.rev !== null ? (
                <Badge tone="outline-strong" size="md" dot={false}>
                  {assembly.rev}
                </Badge>
              ) : null}
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                aria-label={open ? 'Collapse assembly' : 'Expand assembly'}
                className="rounded-sm text-graphite"
                onClick={() => {
                  setOpen((value) => !value);
                }}
              >
                <Icon
                  name="arrow-bottom"
                  className={cn('transition-transform', !open && '-rotate-90')}
                />
              </button>
            </div>
          </div>
          <span className="truncate pl-8.5 font-display text-base text-graphite/60">
            {assembly.name}
          </span>
        </div>
        <span className="flex items-center gap-1.75 self-center truncate pr-4 font-sans text-base text-graphite">
          <span className="text-graphite/60">{assembly.kindLabel}</span>
          <span aria-hidden className="size-1 shrink-0 rounded-full bg-graphite" />
          <span>{assembly.partsLabel}</span>
        </span>
        <IconButton
          variant="surface"
          size={32}
          aria-label={`View ${assembly.number}`}
          className="self-center"
          onClick={() => {
            onView(assembly.id);
          }}
        >
          <Icon name="eye" size={16} />
        </IconButton>
      </div>
      {open ? (
        <ul
          id={panelId}
          className={cn(
            'relative mt-3 flex flex-col gap-2 pl-10.25',
            // trunk: 1px `line` at x24 of the box, from under the root checkbox (y48) to the last row's tick
            'before:absolute before:-top-8.5 before:bottom-[42px] before:left-2.25 before:w-px before:bg-line',
          )}
        >
          {assembly.parts.map((part) => (
            <li
              key={part.id}
              className={cn(
                'relative',
                // branch: 20px tick from the trunk to the row, ending in a 4px dot at the row's vertical centre (85 / 2)
                'after:absolute after:-left-8 after:top-[42px] after:h-px after:w-5 after:bg-line',
              )}
            >
              <span
                aria-hidden
                className="absolute -left-3 top-[41px] size-1 rounded-full bg-line"
              />
              <BomTreeRow
                part={part}
                selected={selected.has(part.id)}
                onToggle={onToggle}
                onView={onView}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
