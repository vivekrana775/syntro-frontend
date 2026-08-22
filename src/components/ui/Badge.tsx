import { forwardRef, type HTMLAttributes } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const badgeVariants = cva(
  'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-pill py-1 font-sans text-xs',
  {
    variants: {
      tone: {
        info: 'bg-blue/[0.08] text-blue',
        urgent: 'bg-vermilion-deep/[0.08] text-vermilion-deep',
        success: 'bg-green/[0.08] text-green',
        warning: 'bg-amber/[0.08] text-amber',
        danger: 'bg-vermilion/[0.08] text-vermilion',
        neutral: 'bg-surface text-graphite/60',
        // Figma draws the stroke inside the pill; an inset ring keeps the box the size of a filled pill.
        outline: 'bg-transparent text-graphite/60 ring-1 ring-inset ring-graphite/[0.08]',
      },
      size: {
        sm: 'px-2',
        md: 'px-3',
      },
    },
    defaultVariants: {
      tone: 'info',
      size: 'sm',
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  /** Leading 6px status dot. Status pills show it; owner/state tags do not. */
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone, size, dot = true, className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cn(badgeVariants({ tone, size }), className)} {...rest}>
      {dot ? <span aria-hidden className="size-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
});
