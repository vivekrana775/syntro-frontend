import type { ReactNode } from 'react';

import { Badge } from '@/components/ui';
import { cn } from '@/lib/cn';

export interface BomDetailHeaderProps {
  title: string;
  /** Version chips beside the title ("v1", "v2"). */
  versions: readonly string[];
  /** Muted line under the title ("8 lines · 9 unique parts"). */
  summary: string;
  /** Controls aligned to the right (Re-upload BOM). */
  children?: ReactNode;
  className?: string;
}

/** Detail page heading (1:19570): title with paper version chips over a muted summary. */
export function BomDetailHeader({
  title,
  versions,
  summary,
  children,
  className,
}: BomDetailHeaderProps) {
  return (
    <div className={cn('flex min-h-[60px] flex-wrap items-start justify-between gap-4', className)}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="font-display text-2xl font-semibold text-graphite">{title}</h2>
          <div className="flex items-center gap-2">
            {versions.map((version) => (
              <Badge key={version} tone="paper" size="lg" dot={false}>
                {version}
              </Badge>
            ))}
          </div>
        </div>
        <p className="font-sans text-base text-graphite/60">{summary}</p>
      </div>
      {children}
    </div>
  );
}
