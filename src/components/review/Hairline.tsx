import { cn } from '@/lib/cn';

export interface HairlineProps {
  className?: string;
}

/** Zero-height separator drawn as a 1px stroke, matching Figma's auto-layout lines (1:26082, 1:23373). */
export function Hairline({ className }: HairlineProps) {
  // The 1px stroke hangs below the line without taking space, as in Figma's auto-layout.
  return <hr className={cn('-mb-px h-0 w-full border-0 border-t border-subtle', className)} />;
}
