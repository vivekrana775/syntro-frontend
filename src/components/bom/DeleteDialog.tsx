import errorReduction from '@/assets/images/error-reduction.svg';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';

export type DeleteTargetKind = 'folder' | 'bom';

export interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Restores focus to the opener when the dialog closes (see `useDisclosure`). */
  onCloseAutoFocus?: (event: Event) => void;
  kind: DeleteTargetKind;
  onConfirm: () => void;
}

const copy: Record<DeleteTargetKind, { title: string; description: string }> = {
  folder: {
    title: 'Delete Folder?',
    description:
      'This will permanently delete the folder and all its contents. This action cannot be undone.',
  },
  // Not designed: the row menu offers Delete, so the folder dialog is reused with BOM wording.
  bom: {
    title: 'Delete BOM?',
    description: 'This will permanently delete the BOM. This action cannot be undone.',
  },
};

/** Delete confirmation (1:24878): illustration, centred copy, Cancel / Delete. */
export function DeleteDialog({
  open,
  onOpenChange,
  onCloseAutoFocus,
  kind,
  onConfirm,
}: DeleteDialogProps) {
  const content = copy[kind];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm" onCloseAutoFocus={onCloseAutoFocus}>
        {/* The title carries the meaning; the artwork is decorative. */}
        <img src={errorReduction} width={200} height={200} alt="" className="mx-auto size-50" />
        <DialogHeader className="items-center pr-0 text-center">
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription>{content.description}</DialogDescription>
        </DialogHeader>
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
          <Button variant="primary-deep" size="lg" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
