import { useId, useState, type ReactNode } from 'react';

import { Icon } from '@/components/ui';
import { cn } from '@/lib/cn';

export interface BomGroupProps {
  title: string;
  /** Folders carry the folder glyph (1:19042); "Ungrouped" does not (1:19058). */
  folder: boolean;
  /** Right-aligned menu for folder groups. */
  menu?: ReactNode;
  children: ReactNode;
}

/** Collapsible group on the library card (1:19038): title row with a chevron, then its table. */
export function BomGroup({ title, folder, menu, children }: BomGroupProps) {
  const [open, setOpen] = useState(true);
  const panelId = useId();

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-4">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            setOpen((value) => !value);
          }}
          className="flex items-center gap-3 rounded-sm font-display text-lg font-medium text-graphite"
        >
          <span className="flex items-center gap-2">
            {folder ? <Icon name="folder" /> : null}
            {title}
          </span>
          <Icon name="arrow-bottom" className={cn('transition-transform', !open && '-rotate-90')} />
        </button>
        {menu}
      </div>
      {open ? <div id={panelId}>{children}</div> : null}
    </section>
  );
}
