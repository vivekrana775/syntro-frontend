import { forwardRef, type ImgHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt'> {
  alt: string;
}

/** 48px circular avatar. The source photo is portrait, so it is top-aligned like the Figma crop. */
export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(function Avatar(
  { alt, className, ...rest },
  ref,
) {
  return (
    <img
      ref={ref}
      alt={alt}
      width={48}
      height={48}
      className={cn('size-12 shrink-0 rounded-pill object-cover object-top', className)}
      {...rest}
    />
  );
});
