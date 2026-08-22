import { StatCard } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { StatMetric } from '@/types';

export interface StatsGridProps {
  stats: StatMetric[];
  columns: 3 | 4;
  className?: string;
}

const columnClasses = {
  3: 'sm:grid-cols-2 xl:grid-cols-3',
  4: 'sm:grid-cols-2 xl:grid-cols-4',
} as const;

export function StatsGrid({ stats, columns, className }: StatsGridProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-6', columnClasses[columns], className)}>
      {stats.map((stat) => (
        <StatCard key={stat.id} value={stat.value} label={stat.label} icon={stat.icon} />
      ))}
    </div>
  );
}
