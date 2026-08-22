import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';
import type { EmailBodyData } from '@/types';

export interface EmailBodyProps extends HTMLAttributes<HTMLDivElement> {
  body: EmailBodyData;
}

/** Email paragraphs and signature as Figma sets them (1:26088, 1:23361): Manrope Medium 18, 12px apart. */
export function EmailBody({ body, className, ...rest }: EmailBodyProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 font-display text-lg font-medium text-graphite',
        className,
      )}
      {...rest}
    >
      {/* Static fixture text has no natural key; paragraphs never reorder. */}
      {body.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {body.signature ? (
        <p>
          {body.signature.closing}
          <br />
          <span className="font-semibold">{body.signature.name}</span>
        </p>
      ) : null}
    </div>
  );
}
