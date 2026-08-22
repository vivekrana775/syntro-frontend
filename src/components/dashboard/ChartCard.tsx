import { BarChart, Card, Icon, IconChip } from '@/components/ui';
import type { ChartCardData } from '@/types';

export interface ChartCardProps {
  chart: ChartCardData;
}

/** 544×388 chart tile (1:1228 / 1:1288): title, headline metric, arrow chip and the bar chart. */
export function ChartCard({ chart }: ChartCardProps) {
  return (
    <Card className="min-h-chart-card flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-xl font-medium text-graphite">{chart.title}</h3>
          <p className="font-display text-4xl font-bold text-graphite">{chart.metric}</p>
        </div>
        <IconChip>
          <Icon name="arrow-top-right" />
        </IconChip>
      </div>
      <BarChart
        mode={chart.mode}
        yTicks={chart.yTicks}
        domain={chart.domain}
        data={chart.data}
        title={`${chart.title} by month`}
      />
    </Card>
  );
}
