import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export interface WatchlistRowProps extends HTMLAttributes<HTMLDivElement> {
  number: string;
  vendor: string;
  /** Muted third column ("48h follow up", "72% Verified", "No ack yet"). */
  meta: string;
  /** Muted fourth column ("drafted 12 days ago" + toggle, "Replied", "sent 12 days ago"). */
  trailing?: ReactNode;
  /** Right-aligned action (the view button). */
  action: ReactNode;
}

/** Column grid shared by every watchlist row (1:20017, 1:20044, 1:20070). */
export function WatchlistRow({
  number,
  vendor,
  meta,
  trailing,
  action,
  className,
  ...rest
}: WatchlistRowProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-watchlist items-center font-sans text-base leading-5 text-graphite',
        className,
      )}
      {...rest}
    >
      <span className="truncate font-medium">{number}</span>
      <span className="truncate">{vendor}</span>
      <span className="truncate text-graphite/60">{meta}</span>
      <span className="flex min-w-0 items-center gap-2 text-graphite/60">{trailing}</span>
      <span className="flex justify-end">{action}</span>
    </div>
  );
}
