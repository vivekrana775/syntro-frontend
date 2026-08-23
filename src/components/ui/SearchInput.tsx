import { forwardRef, type InputHTMLAttributes } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

import { Icon } from './Icon';

const fieldVariants = cva(
  'flex h-13 max-w-full items-center gap-3 rounded-pill text-graphite transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-vermilion has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-page',
  {
    variants: {
      tone: {
        paper: 'bg-paper px-4',
        // bordered pill on a paper card (1:18818); the stroke sits inside the 16px padding
        outline: 'border border-subtle bg-transparent px-3.75',
      },
      // widths are variants (not `className`) because tailwind-merge cannot reconcile two named widths
      width: {
        md: 'w-search',
        sm: 'w-bom-search',
      },
    },
    defaultVariants: {
      tone: 'paper',
      width: 'md',
    },
  },
);

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'width'>, VariantProps<typeof fieldVariants> {
  /** Accessible name for the field (rendered visually hidden). */
  label?: string;
  fieldClassName?: string;
}

/** Search pill (1:1482 on paper, 1:18818 outlined): 52px high, search icon 18, Inter 16 placeholder at 60%. */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { label = 'Search', placeholder = 'Search...', tone, width, fieldClassName, className, ...rest },
  ref,
) {
  return (
    <label className={cn(fieldVariants({ tone, width }), fieldClassName)}>
      <span className="sr-only">{label}</span>
      <Icon name="search" size={18} />
      <input
        ref={ref}
        type="search"
        placeholder={placeholder}
        className={cn(
          'h-5 min-w-0 flex-1 bg-transparent font-sans text-base text-graphite outline-none placeholder:text-graphite/60 focus-visible:ring-0 [&::-webkit-search-cancel-button]:hidden',
          className,
        )}
        {...rest}
      />
    </label>
  );
});
