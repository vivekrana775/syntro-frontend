import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { orientation = 'horizontal', className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'shrink-0 bg-graphite/[0.08]',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-7 w-px',
        className,
      )}
      {...rest}
    />
  );
});
