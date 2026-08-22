import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

export type InboxListProps = HTMLAttributes<HTMLUListElement>;

/** Stack of `InboxRow`s with Figma's 8px rhythm (1:22812, 1:23199). */
export function InboxList({ className, ...rest }: InboxListProps) {
  return <ul className={cn('flex flex-col gap-2', className)} {...rest} />;
}
