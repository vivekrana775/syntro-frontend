import { useId, useState, type FormEvent } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormField,
  Input,
} from '@/components/ui';

export type NameDialogMode = 'new-folder' | 'rename-folder' | 'rename-bom';

export interface NameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Restores focus to the opener when the dialog closes (see `useDisclosure`). */
  onCloseAutoFocus?: (event: Event) => void;
  mode: NameDialogMode;
  /** Current name when renaming; the draft resets to it each time the dialog opens. */
  initialName?: string;
  /** Skip the scrim when stacked on another dialog (Move → New Folder). */
  overlay?: boolean;
  onSubmit: (name: string) => void;
}

interface NameDialogCopy {
  title: string;
  description: string;
  label: string;
  placeholder?: string;
  submit: string;
}

const copy: Record<NameDialogMode, NameDialogCopy> = {
  'new-folder': {
    title: 'New Folder',
    description: 'Create a folder to organize projects.',
    label: 'Folder Name',
    placeholder: 'E.g. Dispenser Robot',
    submit: 'Create',
  },
  'rename-folder': {
    title: 'Rename Folder',
    description: 'Update the folder name to keep your BOMs organized.',
    label: 'Folder Name',
    submit: 'Save',
  },
  // Not designed: the row menu offers Rename, so the folder dialog is reused with BOM wording.
  'rename-bom': {
    title: 'Rename BOM',
    description: 'Update the BOM name to keep your library organized.',
    label: 'BOM Name',
    submit: 'Save',
  },
};

/** Single-field name dialog: New Folder (1:25141) and Rename Folder (1:24392). */
export function NameDialog({
  open,
  onOpenChange,
  onCloseAutoFocus,
  mode,
  initialName = '',
  overlay,
  onSubmit,
}: NameDialogProps) {
  const inputId = useId();
  const [name, setName] = useState(initialName);
  const [wasOpen, setWasOpen] = useState(open);
  // Reset the draft on every open (state reset on prop change, no effect).
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setName(initialName);
  }
  const content = copy[mode];
  const trimmed = name.trim();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (trimmed.length === 0) return;
    onSubmit(trimmed);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md" overlay={overlay} onCloseAutoFocus={onCloseAutoFocus}>
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription>{content.description}</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <FormField label={content.label} htmlFor={inputId}>
            <Input
              id={inputId}
              value={name}
              placeholder={content.placeholder}
              autoComplete="off"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </FormField>
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
            {/* Figma draws the button enabled over the empty field; empty submits are ignored. */}
            <Button type="submit" variant="primary" size="lg">
              {content.submit}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
