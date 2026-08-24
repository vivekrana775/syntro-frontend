import { useId, useState } from 'react';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormField,
  Icon,
  Input,
  Label,
  Select,
} from '@/components/ui';
import { SUPPLIER_STATUS, type SupplierStatus } from '@/types';

import { TagInput } from './TagInput';

export interface NewSupplierValues {
  name: string;
  status: SupplierStatus;
  website: string;
  contactName: string;
  phone: string;
  emails: string[];
  tags: string[];
}

export interface NewSupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Restores focus to the opener when the dialog closes (see `useDisclosure`). */
  onCloseAutoFocus?: (event: Event) => void;
  onCreate: (values: NewSupplierValues) => void;
}

const STATUS_OPTIONS = (Object.keys(SUPPLIER_STATUS) as SupplierStatus[]).map((status) => ({
  value: status,
  label: SUPPLIER_STATUS[status].label,
}));

/** "New Supplier" dialog (1:25607). The subtitle repeats the designed copy verbatim. */
export function NewSupplierDialog({
  open,
  onOpenChange,
  onCloseAutoFocus,
  onCreate,
}: NewSupplierDialogProps) {
  const fieldId = useId();
  const [name, setName] = useState('');
  const [status, setStatus] = useState<SupplierStatus>('unverified');
  const [website, setWebsite] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [emails, setEmails] = useState<string[]>(['']);
  const [tags, setTags] = useState<string[]>([]);

  const reset = () => {
    setName('');
    setStatus('unverified');
    setWebsite('');
    setContactName('');
    setPhone('');
    setEmails(['']);
    setTags([]);
  };

  const handleCreate = () => {
    onCreate({ name, status, website, contactName, phone, emails, tags });
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="wide" onCloseAutoFocus={onCloseAutoFocus}>
        <DialogHeader>
          <DialogTitle>New Supplier</DialogTitle>
          <DialogDescription>
            Create a project, then add quotes by importing emails or uploading files and compare
            them.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <FormField label="Supplier Name" htmlFor={`${fieldId}-name`}>
            <Input
              id={`${fieldId}-name`}
              placeholder="E.g. Q3 Control Board Build"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </FormField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Status" htmlFor={`${fieldId}-status`}>
              <Select
                id={`${fieldId}-status`}
                options={STATUS_OPTIONS}
                value={status}
                onValueChange={(next) => {
                  setStatus(next as SupplierStatus);
                }}
              />
            </FormField>
            <FormField label="Website" htmlFor={`${fieldId}-website`}>
              <Input
                id={`${fieldId}-website`}
                placeholder="www.acme-industrial.com"
                value={website}
                onChange={(event) => {
                  setWebsite(event.target.value);
                }}
              />
            </FormField>
            <FormField label="Primary Contact Name" htmlFor={`${fieldId}-contact`}>
              <Input
                id={`${fieldId}-contact`}
                placeholder="E.g. Jane Dave"
                value={contactName}
                onChange={(event) => {
                  setContactName(event.target.value);
                }}
              />
            </FormField>
            <FormField label="Phone" htmlFor={`${fieldId}-phone`}>
              <Input
                id={`${fieldId}-phone`}
                placeholder="+91 6532522212"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
            </FormField>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Label htmlFor={`${fieldId}-email-0`}>Contact Emails</Label>
              <Button
                variant="neutral"
                size="sm"
                leadingIcon={<Icon name="plus" size={20} />}
                onClick={() => {
                  setEmails([...emails, '']);
                }}
              >
                Add another email
              </Button>
            </div>
            {emails.map((email, index) => (
              <Input
                // Rows are only appended, so the index is a stable identity here.
                key={index}
                id={`${fieldId}-email-${String(index)}`}
                type="email"
                aria-label={index === 0 ? undefined : `Contact email ${String(index + 1)}`}
                placeholder="primary@supplier.com"
                value={email}
                onChange={(event) => {
                  setEmails(emails.map((item, i) => (i === index ? event.target.value : item)));
                }}
              />
            ))}
          </div>

          <FormField label="Tags" htmlFor={`${fieldId}-tags`}>
            <TagInput
              id={`${fieldId}-tags`}
              label="Add a tag"
              placeholder="Add a tag..."
              value={tags}
              onValueChange={setTags}
            />
          </FormField>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="neutral" size="lg">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="primary" size="lg" onClick={handleCreate}>
            Create Supplier
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
