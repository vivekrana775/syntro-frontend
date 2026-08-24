import { forwardRef, type TextareaHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

/** Multi-line field with the `Input` chrome (supplier detail Notes, 1:26137). */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid = false, className, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        'w-full resize-none rounded-lg border border-subtle bg-transparent p-4 font-sans text-lg text-graphite outline-none transition-colors placeholder:text-graphite/40',
        'focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 focus-visible:ring-offset-page',
        'disabled:opacity-40',
        invalid && 'border-vermilion',
        className,
      )}
      {...rest}
    />
  );
});
