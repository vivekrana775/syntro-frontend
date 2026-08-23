import { useRef } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  IconButton,
} from '@/components/ui';

export interface FolderMenuProps {
  folderName: string;
  /** Each callback receives the kebab button so a dialog can return focus to it. */
  onRename: (opener: HTMLElement | null) => void;
  onDelete: (opener: HTMLElement | null) => void;
}

/** Folder header menu (1:19125): Rename, Delete. */
export function FolderMenu({ folderName, onRename, onDelete }: FolderMenuProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          ref={triggerRef}
          variant="plain"
          size={24}
          aria-label={`More actions for ${folderName}`}
          className="rounded-sm"
        >
          <Icon name="more-vertical" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          icon="edit-square"
          onSelect={() => {
            onRename(triggerRef.current);
          }}
        >
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem
          icon="trash"
          onSelect={() => {
            onDelete(triggerRef.current);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
