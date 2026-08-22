import { Icon, IconButton, SearchInput } from '@/components/ui';

export interface DashboardHeaderProps {
  greeting: string;
  subtitle: string;
  onOpenFilter: () => void;
}

/** Greeting row with search and filter controls (1:1158 + 1:1481). */
export function DashboardHeader({ greeting, subtitle, onOpenFilter }: DashboardHeaderProps) {
  return (
    <div className="flex min-h-[60px] flex-wrap items-start justify-between gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-2xl font-semibold text-graphite">{greeting}</h2>
        <p className="font-sans text-base text-graphite/60">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2 pt-1">
        <SearchInput label="Search the dashboard" />
        <IconButton
          variant="paper"
          size={52}
          shape="md"
          aria-label="Filter dashboard"
          onClick={onOpenFilter}
        >
          <Icon name="filter" />
        </IconButton>
      </div>
    </div>
  );
}
