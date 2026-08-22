import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-pill font-display font-medium transition-colors disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        primary: 'bg-vermilion text-paper hover:bg-vermilion-deep',
        // result-dialog "Confirm" (1:26432) is drawn in the deep red at rest
        'primary-deep': 'bg-vermilion-deep text-paper hover:bg-vermilion',
        neutral: 'bg-neutral text-graphite hover:bg-surface',
        // secondary action inside paper cards (Dismiss / No, Reject — 1:20037, 1:20061)
        surface: 'bg-surface text-graphite hover:bg-hatch',
        // paper pill on the white page, e.g. Sources "Sync Now" (1:23230)
        paper: 'bg-paper text-graphite hover:bg-surface',
        ghost: 'bg-transparent text-graphite hover:bg-paper',
      },
      size: {
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant,
    size,
    fullWidth,
    leadingIcon,
    trailingIcon,
    className,
    type = 'button',
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
});
