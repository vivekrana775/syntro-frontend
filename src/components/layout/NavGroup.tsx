import { useId, useState } from 'react';

import { Icon } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { NavGroup as NavGroupData } from '@/types';

import { NavItem } from './NavItem';

export interface NavGroupProps {
  group: NavGroupData;
  /** Route-derived open state from `Sidebar`; falls back to `group.defaultOpen`. */
  initialOpen?: boolean;
  className?: string;
}

/** Expandable nav section (1:1079). Child rows are indented 48px and joined by a tree connector. */
export function NavGroup({ group, initialOpen, className }: NavGroupProps) {
  const resolvedInitial = initialOpen ?? group.defaultOpen ?? false;
  const [open, setOpen] = useState(resolvedInitial);
  const [prevInitial, setPrevInitial] = useState(resolvedInitial);
  // Follow the route when it changes but keep a manual toggle otherwise (state reset on prop change, no effect).
  if (resolvedInitial !== prevInitial) {
    setPrevInitial(resolvedInitial);
    setOpen(resolvedInitial);
  }
  const panelId = useId();
  const hasChildren = group.children.length > 0;

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <NavItem
        label={group.label}
        icon={group.icon}
        dim={!open}
        aria-expanded={open}
        aria-controls={hasChildren ? panelId : undefined}
        onClick={() => {
          setOpen((value) => !value);
        }}
        trailing={<Icon name={open ? 'arrow-top' : 'arrow-bottom'} />}
      />
      {open && hasChildren ? (
        <ul id={panelId} className="flex flex-col gap-1 pl-12 pt-2">
          {group.children.map((child) => (
            <li
              key={child.id}
              className={cn(
                'relative',
                // vertical connector: 1px `line` at x=27.5 of the group, from the header down to the last tick
                'before:absolute before:-left-[20.5px] before:-top-2 before:h-[calc(100%+8px)] before:w-px before:bg-line last:before:h-[calc(50%+8px)]',
                // horizontal tick: 18px line ending in a 4px dot at the row's vertical centre
                'after:absolute after:-left-5 after:top-[23.5px] after:h-px after:w-[18px] after:bg-line',
              )}
            >
              <span
                aria-hidden
                className="absolute -left-1 top-[22px] size-1 rounded-full bg-graphite/[0.08]"
              />
              {/* pr-3: Chrome sets Manrope 500 ~3px wider than Figma, so "Purchase Orders" needs the room */}
              <NavItem label={child.label} icon={child.icon} to={child.to} dim className="pr-3" />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
