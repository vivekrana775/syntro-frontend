import { PageHeading } from '@/components/layout';
import { Icon, IconButton, SearchInput } from '@/components/ui';

export interface DashboardHeaderProps {
  greeting: string;
  subtitle: string;
  onOpenFilter: () => void;
}

/** Greeting row with search and filter controls (1:1158 + 1:1481). */
export function DashboardHeader({ greeting, subtitle, onOpenFilter }: DashboardHeaderProps) {
  return (
    <PageHeading title={greeting} subtitle={subtitle}>
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
    </PageHeading>
  );
}
