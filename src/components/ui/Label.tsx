import { forwardRef, type LabelHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Labels always target a control by id so screen readers pair them. */
  htmlFor: string;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { htmlFor, className, ...rest },
  ref,
) {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={cn('block font-display text-lg font-medium text-graphite/80', className)}
      {...rest}
    />
  );
});
