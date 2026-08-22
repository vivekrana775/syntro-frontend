import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';
import type { IconName } from '@/types';

import { Icon } from './Icon';

export type Theme = 'light' | 'dark';

export interface ThemeToggleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: Theme;
  onValueChange: (theme: Theme) => void;
}

const options: { value: Theme; icon: IconName; label: string }[] = [
  { value: 'dark', icon: 'moon', label: 'Dark theme' },
  { value: 'light', icon: 'sun', label: 'Light theme' },
];

/** Moon / sun pill (1:1138). Figma only designs a light theme, so this is presentational state. */
export const ThemeToggle = forwardRef<HTMLDivElement, ThemeToggleProps>(function ThemeToggle(
  { value, onValueChange, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label="Theme"
      className={cn('flex shrink-0 rounded-pill bg-paper p-1', className)}
      {...rest}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={option.label}
            onClick={() => {
              onValueChange(option.value);
            }}
            className={cn(
              'flex size-12 items-center justify-center rounded-pill transition-colors',
              active ? 'bg-vermilion text-paper' : 'text-graphite hover:bg-surface',
            )}
          >
            <Icon name={option.icon} />
          </button>
        );
      })}
    </div>
  );
});
