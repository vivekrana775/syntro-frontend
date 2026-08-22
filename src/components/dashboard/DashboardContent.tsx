import type { DashboardData } from '@/types';

import { ChartCard } from './ChartCard';
import { DashboardHeader } from './DashboardHeader';
import { ReviewSection } from './ReviewSection';
import { StatsGrid } from './StatsGrid';

export interface DashboardContentProps {
  data: DashboardData;
  onOpenFilter: () => void;
  onOpenQueue?: () => void;
  onSelectReviewItem?: (id: string) => void;
}

/** Everything inside the dashboard's `<main>` (1:1157), shared by the page and the auth promo preview. */
export function DashboardContent({
  data,
  onOpenFilter,
  onOpenQueue,
  onSelectReviewItem,
}: DashboardContentProps) {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader
        greeting={data.greeting}
        subtitle={data.subtitle}
        onOpenFilter={onOpenFilter}
      />
      <StatsGrid stats={data.primaryStats} columns={4} />
      <StatsGrid stats={data.secondaryStats} columns={3} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {data.charts.map((chart) => (
          <ChartCard key={chart.id} chart={chart} />
        ))}
      </div>
      <ReviewSection
        review={data.review}
        onOpenQueue={onOpenQueue}
        onSelectItem={onSelectReviewItem}
      />
    </div>
  );
}
