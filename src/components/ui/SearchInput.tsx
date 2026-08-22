import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

import { Icon } from './Icon';

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Accessible name for the field (rendered visually hidden). */
  label?: string;
  fieldClassName?: string;
}

/** Paper pill search field (1:1482): 260×52, search icon 18, Inter 16 placeholder at 60%. */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { label = 'Search', placeholder = 'Search...', fieldClassName, className, ...rest },
  ref,
) {
  return (
    <label
      className={cn(
        'flex h-13 w-search max-w-full items-center gap-3 rounded-pill bg-paper px-4 text-graphite transition-colors',
        'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-vermilion has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-page',
        fieldClassName,
      )}
    >
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
