import {
  forwardRef,
  useId,
  type ForwardedRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactElement,
} from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const controlVariants = cva('rounded-pill p-1', {
  variants: {
    tone: {
      surface: 'bg-surface',
      paper: 'bg-paper',
    },
    fit: {
      fill: 'flex w-full',
      hug: 'inline-flex self-start',
    },
  },
  defaultVariants: {
    tone: 'surface',
    fit: 'fill',
  },
});

const tabVariants = cva(
  'flex h-12 items-center justify-center whitespace-nowrap rounded-pill px-6 font-display text-base font-medium transition-colors',
  {
    variants: {
      tone: {
        surface: '',
        paper: '',
      },
      fit: {
        fill: 'flex-1',
        hug: '',
      },
      selected: {
        true: 'bg-graphite text-paper',
        false: 'text-graphite',
      },
    },
    compoundVariants: [
      // unselected tabs lift to the opposite neutral on hover so the state is visible on either container
      { selected: false, tone: 'surface', class: 'hover:bg-paper' },
      { selected: false, tone: 'paper', class: 'hover:bg-surface' },
    ],
    defaultVariants: {
      tone: 'surface',
      fit: 'fill',
      selected: false,
    },
  },
);

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>, VariantProps<typeof controlVariants> {
  options: readonly SegmentedOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  /** Accessible name for the group. */
  'aria-label': string;
}

function SegmentedControlInner<T extends string>(
  { options, value, onValueChange, tone, fit, className, ...rest }: SegmentedControlProps<T>,
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
      className={cn(controlVariants({ tone, fit }), className)}
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
            className={tabVariants({ tone, fit, selected })}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/** Pill tab switcher (1:2798 on surface, 1:20006 on paper). Selection is controlled; the parent decides what it means. */
export const SegmentedControl = forwardRef(SegmentedControlInner) as <T extends string>(
  props: SegmentedControlProps<T> & { ref?: ForwardedRef<HTMLDivElement> },
) => ReactElement;
