import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const titleVariants = cva('font-display text-graphite', {
  variants: {
    size: {
      lg: 'text-xl font-semibold',
      md: 'text-lg font-medium',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

export interface SectionHeaderProps extends VariantProps<typeof titleVariants> {
  /** Heading id so the owning `<section>` can point `aria-labelledby` at it. */
  id?: string;
  title: string;
  description?: string;
  as?: 'h2' | 'h3';
  className?: string;
}

/** Section title + muted description (1:20013 at `lg`, 1:20615 / 1:20268 at `md`). */
export function SectionHeader({
  id,
  title,
  description,
  size,
  as: Heading = 'h3',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Heading id={id} className={titleVariants({ size })}>
        {title}
      </Heading>
      {description ? <p className="font-sans text-base text-graphite/60">{description}</p> : null}
    </div>
  );
}
