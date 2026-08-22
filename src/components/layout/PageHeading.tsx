import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export interface PageHeadingProps {
  title: string;
  subtitle: string;
  /** Controls aligned to the right of the heading (search, filter, sync…). */
  children?: ReactNode;
  className?: string;
}

/** Page title over a muted subtitle, with an optional right-hand slot (1:1158, 1:22823, 1:23226). */
export function PageHeading({ title, subtitle, children, className }: PageHeadingProps) {
  return (
    <div className={cn('flex min-h-[60px] flex-wrap items-start justify-between gap-4', className)}>
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-2xl font-semibold text-graphite">{title}</h2>
        <p className="font-sans text-base text-graphite/60">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
