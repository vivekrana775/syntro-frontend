import { forwardRef, type HTMLAttributes } from 'react';

import LogoMark from '@/assets/icons/logo-mark.svg?react';
import { cn } from '@/lib/cn';

export interface LogoProps extends HTMLAttributes<HTMLSpanElement> {
  /** `sidebar` matches 1:1060 (29.5px wordmark); `auth` matches 1:2788 (32.8px wordmark). */
  size?: 'sidebar' | 'auth';
}

// The wordmark is live "Helvetica Neue Medium" text in Figma; the metrics below are the exact export values.
const sizes = {
  sidebar: {
    mark: 'h-[21.692px] w-[34.394px]',
    gap: 'gap-2',
    text: 'text-[29.538px] leading-[36px]',
  },
  auth: {
    mark: 'h-[24.103px] w-[38.216px]',
    gap: 'gap-[8.889px]',
    text: 'text-[32.821px] leading-[40px]',
  },
} as const;

export const Logo = forwardRef<HTMLSpanElement, LogoProps>(function Logo(
  { size = 'sidebar', className, ...rest },
  ref,
) {
  const s = sizes[size];
  return (
    <span ref={ref} className={cn('inline-flex items-center', s.gap, className)} {...rest}>
      <LogoMark aria-hidden focusable="false" className={cn('shrink-0', s.mark)} />
      <span className={cn('font-logo font-medium tracking-normal text-graphite', s.text)}>
        Syntro
      </span>
    </span>
  );
});
