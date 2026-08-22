import { forwardRef, type ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';
import type { IconName } from '@/types';

import { Icon } from './Icon';
import { IconChip } from './IconChip';

export interface OptionCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  title: string;
  description: string;
  selected: boolean;
}

/** Selectable card used as a radio inside a `role="radiogroup"` (1:1715 selected, 1:1722 default). */
export const OptionCard = forwardRef<HTMLButtonElement, OptionCardProps>(function OptionCard(
  { icon, title, description, selected, className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      role="radio"
      aria-checked={selected}
      className={cn(
        'flex h-option-card w-option-card max-w-full flex-col items-start gap-3 rounded-lg border p-5 text-left transition-colors',
        selected ? 'border-vermilion' : 'border-subtle hover:bg-paper',
        className,
      )}
      {...rest}
    >
      <IconChip tone="neutral">
        <Icon name={icon} />
      </IconChip>
      <span className="flex w-full flex-col gap-2">
        <span className="whitespace-nowrap font-display text-xl font-medium text-graphite">
          {title}
        </span>
        <span className="font-sans text-base text-graphite/50">{description}</span>
      </span>
    </button>
  );
});
