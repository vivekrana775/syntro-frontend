import { useId, useState } from 'react';

import syncResolved from '@/assets/images/sync-resolved.svg';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FileInput,
  FormField,
  Input,
} from '@/components/ui';
import type { SyntroField, UploadPreview } from '@/types';

import { MapColumnsTable } from './MapColumnsTable';

export type UploadStep = 'upload' | 'map' | 'done';

export interface UploadResult {
  bomName: string;
  /** Syntro field per spreadsheet column id. */
  mapping: Record<string, string>;
}

export interface UploadBomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Restores focus to the opener when the dialog closes (see `useDisclosure`). */
  onCloseAutoFocus?: (event: Event) => void;
  /** Parser proposal shown in the Map Columns step. */
  preview: UploadPreview;
  fields: readonly SyntroField[];
  onComplete: (result: UploadResult) => void;
}

const SIZE = { upload: 'md', map: 'xl', done: 'sm' } as const;

/**
 * Upload wizard in a single dialog so focus and the overlay persist across steps:
 * Upload BOM (1:23853) → Map Columns (1:24088) → BOM Uploaded Successfully (1:24620).
 */
export function UploadBomDialog({
  open,
  onOpenChange,
  onCloseAutoFocus,
  preview,
  fields,
  onComplete,
}: UploadBomDialogProps) {
  const fileId = useId();
  const nameId = useId();
  const [step, setStep] = useState<UploadStep>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [bomName, setBomName] = useState(preview.bomName);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [wasOpen, setWasOpen] = useState(open);
  // Restart the wizard on every open (state reset on prop change, no effect).
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setStep('upload');
      setFile(null);
      setBomName(preview.bomName);
      setMapping({});
    }
  }

  const cancel = (
    <Button
      variant="neutral"
      size="lg"
      onClick={() => {
        onOpenChange(false);
      }}
    >
      Cancel
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size={SIZE[step]} onCloseAutoFocus={onCloseAutoFocus}>
        {step === 'upload' ? (
          <>
            <DialogHeader>
              <DialogTitle>Upload BOM</DialogTitle>
              <DialogDescription>Upload a CSV or XLSX file to create a new BOM.</DialogDescription>
            </DialogHeader>
            <FormField label="Spreadsheet" htmlFor={fileId}>
              <FileInput
                id={fileId}
                placeholder="Choose CSV or XLSX..."
                accept=".csv,.xlsx,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                fileName={file?.name ?? null}
                onFileChange={setFile}
              />
            </FormField>
            <DialogFooter>
              {cancel}
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  setStep('map');
                }}
              >
                Upload
              </Button>
            </DialogFooter>
          </>
        ) : null}

        {step === 'map' ? (
          <>
            <DialogHeader>
              <DialogTitle>Map Columns</DialogTitle>
              <DialogDescription>
                Match this file&apos;s columns to Syntro fields. We&apos;ll remember this for next
                time.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <FormField label="BOM Name" htmlFor={nameId} className="max-w-dialog-field">
                <Input
                  id={nameId}
                  value={bomName}
                  autoComplete="off"
                  onChange={(event) => {
                    setBomName(event.target.value);
                  }}
                />
              </FormField>
              <MapColumnsTable
                rows={preview.columns}
                values={mapping}
                fields={fields}
                onChange={(rowId, field) => {
                  setMapping((current) => ({ ...current, [rowId]: field }));
                }}
              />
            </div>
            <DialogFooter>
              {cancel}
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  setStep('done');
                }}
              >
                Confirm Mapping
              </Button>
            </DialogFooter>
          </>
        ) : null}

        {step === 'done' ? (
          <>
            {/* The title carries the meaning; the artwork is decorative. */}
            <img src={syncResolved} width={200} height={200} alt="" className="mx-auto size-50" />
            <DialogHeader className="items-center pr-0 text-center">
              <DialogTitle>BOM Uploaded Successfully</DialogTitle>
              <DialogDescription>
                Your BOM has been uploaded and is ready for review and sourcing.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {cancel}
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  const resolved = Object.fromEntries(
                    preview.columns.map((column) => [
                      column.id,
                      mapping[column.id] ?? column.syntroField,
                    ]),
                  );
                  onComplete({ bomName, mapping: resolved });
                }}
              >
                Done
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
