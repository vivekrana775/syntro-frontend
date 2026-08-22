import { forwardRef, type HTMLAttributes } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const cardVariants = cva('rounded-2xl bg-card', {
  variants: {
    padding: {
      md: 'p-6',
      none: 'p-0',
    },
  },
  defaultVariants: {
    padding: 'md',
  },
});

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { padding, className, ...rest },
  ref,
) {
  return <div ref={ref} className={cn(cardVariants({ padding }), className)} {...rest} />;
});
