import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

import { Icon } from './Icon';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  /** Removes the chip; omit to render a plain, non-removable chip. */
  onRemove?: () => void;
}

/** Neutral tag chip (1:22342): 40px, 12px radius, label with an optional 20px remove button. */
export const Chip = forwardRef<HTMLSpanElement, ChipProps>(function Chip(
  { label, onRemove, className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex h-10 shrink-0 items-center gap-3 whitespace-nowrap rounded-md bg-neutral px-4 font-sans text-base text-graphite',
        className,
      )}
      {...rest}
    >
      {label}
      {onRemove ? (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          className="rounded-sm text-graphite transition-opacity hover:opacity-60"
          onClick={onRemove}
        >
          <Icon name="close" size={20} />
        </button>
      ) : null}
    </span>
  );
});
