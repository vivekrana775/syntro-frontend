import { forwardRef } from 'react';

import { cn } from '@/lib/cn';
import type { IconName } from '@/types';

import { Card, type CardProps } from './Card';
import { Icon } from './Icon';
import { IconChip } from './IconChip';

export interface StatCardProps extends Omit<CardProps, 'children'> {
  value: string;
  label: string;
  icon: IconName;
}

/** 108px metric tile (1:1166): value, muted label and a surface icon chip. */
export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  { value, label, icon, className, ...rest },
  ref,
) {
  return (
    <Card
      ref={ref}
      className={cn('flex h-stat items-center justify-between gap-4 overflow-hidden', className)}
      {...rest}
    >
      <div className="flex min-w-0 flex-col gap-2">
        <span className="font-display text-2xl font-medium text-graphite">{value}</span>
        <span className="truncate font-sans text-base text-graphite/50">{label}</span>
      </div>
      <IconChip>
        <Icon name={icon} />
      </IconChip>
    </Card>
  );
});
