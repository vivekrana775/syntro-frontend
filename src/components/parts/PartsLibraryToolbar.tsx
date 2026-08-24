import { Icon, IconButton, SearchInput } from '@/components/ui';

export interface PartsLibraryToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onOpenFilter: () => void;
}

/** Parts card controls (1:20912, 1:20916): outlined search pill and the filter button. */
export function PartsLibraryToolbar({
  search,
  onSearchChange,
  onOpenFilter,
}: PartsLibraryToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <SearchInput
        tone="outline"
        width="md"
        label="Search parts"
        value={search}
        onChange={(event) => {
          onSearchChange(event.target.value);
        }}
      />
      <IconButton
        variant="outline"
        size={52}
        shape="md"
        aria-label="Filter parts"
        onClick={onOpenFilter}
      >
        <Icon name="filter" />
      </IconButton>
    </div>
  );
}
