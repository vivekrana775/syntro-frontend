import { useRef } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  IconButton,
} from '@/components/ui';

export interface BomRowMenuProps {
  bomName: string;
  /** Each callback receives the kebab button so a dialog can return focus to it. */
  onRename: (opener: HTMLElement | null) => void;
  onMove: (opener: HTMLElement | null) => void;
  onDelete: (opener: HTMLElement | null) => void;
}

/** Row actions menu (1:18889): Rename, Move Project, Delete. */
export function BomRowMenu({ bomName, onRename, onMove, onDelete }: BomRowMenuProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          ref={triggerRef}
          variant="surface"
          size={32}
          aria-label={`More actions for ${bomName}`}
        >
          <Icon name="more-vertical" size={16} />
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
          icon="folder"
          onSelect={() => {
            onMove(triggerRef.current);
          }}
        >
          Move Project
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
