import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export interface AuthPromoPanelProps {
  /** Artwork rendered under the headline (the tilted dashboard preview). */
  preview?: ReactNode;
  className?: string;
}

/** Vermilion marketing panel (1:2466) with the headline and room for the dashboard preview. */
export function AuthPromoPanel({ preview, className }: AuthPromoPanelProps) {
  return (
    <aside
      className={cn(
        'min-h-auth-panel relative w-promo shrink-0 flex-col overflow-hidden rounded-2xl bg-vermilion',
        className,
      )}
    >
      <h2 className="absolute left-1/2 top-[52px] w-[350px] -translate-x-1/2 text-center font-display text-3xl font-bold text-paper">
        Procure hardware at the <br />
        speed of AI
      </h2>
      {preview}
    </aside>
  );
}
