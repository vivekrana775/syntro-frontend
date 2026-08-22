import { cn } from '@/lib/cn';

export interface DetailHeadingProps {
  title: string;
  /** Muted meta line, e.g. "Escalation · 12d · escalation". */
  meta: string;
  className?: string;
}

/** Detail title over its meta line (1:26079, 1:23089). */
export function DetailHeading({ title, meta, className }: DetailHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <h2 className="font-display text-xl font-semibold text-graphite">{title}</h2>
      <p className="font-display text-base text-graphite/60">{meta}</p>
    </div>
  );
}
