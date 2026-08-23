import { Icon, IconButton, SearchInput } from '@/components/ui';

export interface BomLibraryToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onNewFolder: () => void;
}

/** Library card controls (1:18817): outlined search pill and the "new folder" button. */
export function BomLibraryToolbar({ search, onSearchChange, onNewFolder }: BomLibraryToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <SearchInput
        tone="outline"
        label="Search BOMs"
        value={search}
        onChange={(event) => {
          onSearchChange(event.target.value);
        }}
        width="sm"
      />
      <IconButton
        variant="outline"
        size={52}
        shape="md"
        aria-label="New folder"
        onClick={onNewFolder}
      >
        <Icon name="add-folder" />
      </IconButton>
    </div>
  );
}
