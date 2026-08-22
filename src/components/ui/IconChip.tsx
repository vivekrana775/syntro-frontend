import { forwardRef, type HTMLAttributes } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const iconChipVariants = cva(
  'inline-flex size-12 shrink-0 items-center justify-center rounded-pill p-3 text-graphite',
  {
    variants: {
      tone: {
        surface: 'bg-chip',
        neutral: 'bg-neutral',
      },
    },
    defaultVariants: {
      tone: 'surface',
    },
  },
);

export interface IconChipProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof iconChipVariants> {}

/** Decorative 48px circle holding a 24px icon (stat cards, chart cards, option cards). */
export const IconChip = forwardRef<HTMLSpanElement, IconChipProps>(function IconChip(
  { tone, className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} aria-hidden className={cn(iconChipVariants({ tone }), className)} {...rest}>
      {children}
    </span>
  );
});
