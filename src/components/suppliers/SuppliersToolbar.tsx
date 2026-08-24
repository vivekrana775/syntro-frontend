import { Icon, IconButton, SearchInput } from '@/components/ui';

export interface SuppliersToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onOpenFilter: () => void;
}

/** Approved card controls (1:21903, 1:21907): outlined search pill and the filter button. */
export function SuppliersToolbar({ search, onSearchChange, onOpenFilter }: SuppliersToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <SearchInput
        tone="outline"
        width="md"
        label="Search suppliers"
        value={search}
        onChange={(event) => {
          onSearchChange(event.target.value);
        }}
      />
      <IconButton
        variant="outline"
        size={52}
        shape="md"
        aria-label="Filter suppliers"
        onClick={onOpenFilter}
      >
        <Icon name="filter" />
      </IconButton>
    </div>
  );
}
