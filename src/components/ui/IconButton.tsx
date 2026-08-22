import { forwardRef, type ButtonHTMLAttributes } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const iconButtonVariants = cva(
  'inline-flex shrink-0 items-center justify-center transition-colors disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        paper: 'bg-paper text-graphite hover:bg-surface',
        outline: 'border border-subtle bg-transparent text-graphite hover:bg-paper',
        graphite: 'bg-graphite text-paper hover:bg-graphite/90',
        facebook: 'bg-facebook text-paper hover:bg-facebook/90',
        plain: 'bg-transparent text-graphite hover:bg-paper',
      },
      size: {
        24: 'size-6',
        48: 'size-12',
        52: 'size-13',
        56: 'size-14',
      },
      shape: {
        pill: 'rounded-pill',
        md: 'rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'paper',
      size: 56,
      shape: 'pill',
    },
  },
);

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
  /** Icon-only controls must announce their purpose. */
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant, size, shape, className, type = 'button', children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(iconButtonVariants({ variant, size, shape }), className)}
      {...rest}
    >
      {children}
    </button>
  );
});
