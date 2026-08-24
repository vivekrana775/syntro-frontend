import type { ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const titleVariants = cva('font-display text-xl text-graphite', {
  variants: {
    tone: {
      display: 'font-semibold',
      soft: 'font-medium',
    },
  },
  defaultVariants: {
    tone: 'display',
  },
});

const descriptionVariants = cva('whitespace-pre-line text-graphite/60', {
  variants: {
    tone: {
      display: 'font-sans text-base',
      soft: 'font-display text-lg',
    },
  },
  defaultVariants: {
    tone: 'display',
  },
});

export interface EmptyStateProps extends VariantProps<typeof titleVariants> {
  /** Decorative artwork above the copy (illustration, icon tile); omit for text-only states. */
  media?: ReactNode;
  title: string;
  /** May carry explicit line breaks ("\n") where Figma draws them. */
  description: string;
  /** Gap between artwork and copy: 24px illustrations (1:22049) vs 16px icon tiles (1:23633). */
  mediaGap?: 'md' | 'lg';
  /** Width of the copy block, e.g. `w-bom-empty-copy` (named width classes cannot be merged, so the caller sets it). */
  className?: string;
}

/**
 * Centred empty state (1:19269, 1:22049 at `display`; 1:22506, 1:23633 at `soft`):
 * optional artwork over a heading and muted copy.
 */
export function EmptyState({
  media,
  title,
  description,
  tone,
  mediaGap = 'lg',
  className,
}: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-6">
      <div
        className={cn(
          'flex max-w-full flex-col items-center text-center',
          mediaGap === 'lg' ? 'gap-6' : 'gap-4',
          className,
        )}
      >
        {media}
        <div className="flex flex-col items-center gap-2">
          <h3 className={titleVariants({ tone })}>{title}</h3>
          <p className={descriptionVariants({ tone })}>{description}</p>
        </div>
      </div>
    </div>
  );
}
