import {
  forwardRef,
  useId,
  type ForwardedRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactElement,
} from 'react';

import { cn } from '@/lib/cn';

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  options: readonly SegmentedOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  /** Accessible name for the group. */
  'aria-label': string;
}

function SegmentedControlInner<T extends string>(
  { options, value, onValueChange, className, ...rest }: SegmentedControlProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const id = useId();

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = options.findIndex((option) => option.value === value);
    if (index === -1) return;
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown')
      next = (index + 1) % options.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = (index - 1 + options.length) % options.length;
    }
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = options.length - 1;
    const option = options[next];
    if (next !== index && option) {
      event.preventDefault();
      onValueChange(option.value);
      document.getElementById(`${id}-${option.value}`)?.focus();
    }
  };

  return (
    <div
      ref={ref}
      role="tablist"
      className={cn('flex w-full rounded-pill bg-surface p-1', className)}
      {...rest}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            id={`${id}-${option.value}`}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => {
              onValueChange(option.value);
            }}
            onKeyDown={onKeyDown}
            className={cn(
              'flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-pill px-6 font-display text-base font-medium transition-colors',
              selected ? 'bg-graphite text-paper' : 'text-graphite hover:bg-paper',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/** Two-state pill toggle (1:2798). Selection is controlled; the parent decides what it means. */
export const SegmentedControl = forwardRef(SegmentedControlInner) as <T extends string>(
  props: SegmentedControlProps<T> & { ref?: ForwardedRef<HTMLDivElement> },
) => ReactElement;
