import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/lib/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 56×56 slot rendered inside the field with a left border (password toggle, select chevron). */
  trailingAddon?: ReactNode;
  invalid?: boolean;
  /** Classes for the outer field box; `className` targets the native input. */
  fieldClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { trailingAddon, invalid = false, fieldClassName, className, ...rest },
  ref,
) {
  return (
    <div
      className={cn(
        'flex h-14 w-full items-center rounded-lg border border-subtle bg-transparent transition-colors',
        'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-vermilion has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-page',
        'has-[:disabled]:opacity-40',
        invalid && 'border-vermilion',
        fieldClassName,
      )}
    >
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          'h-full min-w-0 flex-1 bg-transparent px-4 font-sans text-lg text-graphite outline-none placeholder:text-graphite/40 focus-visible:ring-0',
          className,
        )}
        {...rest}
      />
      {trailingAddon ? (
        <div className="flex size-14 shrink-0 items-center justify-center border-l border-subtle">
          {trailingAddon}
        </div>
      ) : null}
    </div>
  );
});
