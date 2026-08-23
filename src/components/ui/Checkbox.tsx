import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

import { Icon } from './Icon';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  /** Row checkboxes have no visible label, so the purpose must be announced. */
  'aria-label': string;
}

/**
 * 18px square checkbox (1:19477): surface fill inside a subtle stroke, 4px radius.
 * Figma only draws the unchecked state; checked fills graphite with a paper check (assumed).
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, ...rest },
  ref,
) {
  return (
    <span className={cn('relative inline-flex size-4.5 shrink-0', className)}>
      <input
        ref={ref}
        type="checkbox"
        className="peer size-4.5 cursor-pointer appearance-none rounded border border-subtle bg-surface transition-colors checked:border-graphite checked:bg-graphite disabled:cursor-not-allowed disabled:opacity-40"
        {...rest}
      />
      <Icon
        name="check"
        size={16}
        className="pointer-events-none absolute inset-0 m-auto hidden text-paper peer-checked:block"
      />
    </span>
  );
});
