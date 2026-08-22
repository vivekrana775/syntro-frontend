import { forwardRef, type HTMLAttributes } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const badgeVariants = cva(
  'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-pill px-2 py-1 font-sans text-xs',
  {
    variants: {
      tone: {
        info: 'bg-blue/[0.08] text-blue',
        urgent: 'bg-vermilion-deep/[0.08] text-vermilion-deep',
      },
    },
    defaultVariants: {
      tone: 'info',
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone, className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cn(badgeVariants({ tone }), className)} {...rest}>
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
});
