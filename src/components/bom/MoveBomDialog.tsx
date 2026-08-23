import { useId, useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormField,
  Icon,
  Select,
} from '@/components/ui';
import { useDisclosure } from '@/hooks';
import type { BomFolder } from '@/types';

import { NameDialog } from './NameDialog';

export interface MoveBomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Restores focus to the opener when the dialog closes (see `useDisclosure`). */
  onCloseAutoFocus?: (event: Event) => void;
  bomName: string;
  folders: readonly BomFolder[];
  onMove: (folderId: string) => void;
  /** Creates a folder from the nested New Folder dialog and returns it so it can be preselected. */
  onCreateFolder: (name: string) => BomFolder;
}

/** Move “BOM” dialog (1:25368): destination folder select with an inline New Folder shortcut. */
export function MoveBomDialog({
  open,
  onOpenChange,
  onCloseAutoFocus,
  bomName,
  folders,
  onMove,
  onCreateFolder,
}: MoveBomDialogProps) {
  const selectId = useId();
  const newFolder = useDisclosure();
  const [folderId, setFolderId] = useState('');
  const [wasOpen, setWasOpen] = useState(open);
  // Start from the placeholder on every open (state reset on prop change, no effect).
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setFolderId('');
  }

  const options = folders.map((folder) => ({ value: folder.id, label: folder.name }));

  const handleCreate = (name: string) => {
    const folder = onCreateFolder(name);
    setFolderId(folder.id);
    newFolder.onClose();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent size="md" onCloseAutoFocus={onCloseAutoFocus}>
          <DialogHeader>
            <DialogTitle>Move “{bomName}”</DialogTitle>
            <DialogDescription>Select a destination folder to organise this BOM</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-start gap-4">
            <FormField label="Choose Folder" htmlFor={selectId}>
              <Select
                id={selectId}
                options={options}
                placeholder="Select"
                value={folderId}
                onValueChange={setFolderId}
              />
            </FormField>
            <Button
              variant="neutral"
              size="sm"
              leadingIcon={<Icon name="plus" size={20} />}
              onClick={newFolder.onOpen}
            >
              New Folder
            </Button>
          </div>
          <DialogFooter>
            <Button
              variant="neutral"
              size="lg"
              onClick={() => {
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            {/* Figma draws the button enabled over the placeholder; moving without a folder is ignored. */}
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                if (folderId !== '') onMove(folderId);
              }}
            >
              Move
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <NameDialog
        open={newFolder.open}
        onOpenChange={newFolder.onOpenChange}
        onCloseAutoFocus={newFolder.onCloseAutoFocus}
        mode="new-folder"
        overlay={false}
        onSubmit={handleCreate}
      />
    </>
  );
}
