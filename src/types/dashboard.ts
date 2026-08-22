import type { BadgeTone } from './badge';
import type { IconName } from './icon';

export interface StatMetric {
  id: string;
  /** Pre-formatted display value exactly as shown (e.g. "03"). */
  value: string;
  label: string;
  icon: IconName;
}

export interface ChartDatum {
  label: string;
  value: number;
  /** Second series drawn below the baseline (diverging charts only). */
  secondaryValue?: number;
  emphasis?: boolean;
  tooltip?: string;
}

export type ChartMode = 'diverging' | 'single';

export interface ChartCardData {
  id: string;
  title: string;
  /** Pre-formatted headline metric (e.g. "$ 100K"). */
  metric: string;
  mode: ChartMode;
  /** Axis labels from top to bottom, exactly as displayed. */
  yTicks: string[];
  /** Value range covered by the grid, [min, max]. */
  domain: [number, number];
  data: ChartDatum[];
}

export interface ReviewItem {
  id: string;
  title: string;
  tag: { label: string; tone: BadgeTone };
  description: string;
}

export interface DashboardData {
  greeting: string;
  subtitle: string;
  primaryStats: StatMetric[];
  secondaryStats: StatMetric[];
  charts: ChartCardData[];
  review: {
    title: string;
    subtitle: string;
    queueCount: number;
    items: ReviewItem[];
  };
}

export interface Project {
  id: string;
  name: string;
}
