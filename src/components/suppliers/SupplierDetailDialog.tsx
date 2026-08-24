import { useId, useState } from 'react';

import {
  Badge,
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
  Textarea,
} from '@/components/ui';
import { SUPPLIER_STATUS, type Supplier, type SupplierContact } from '@/types';

import { ContactForm, type ContactFormValues } from './ContactForm';
import { ContactRow } from './ContactRow';
import { TagInput } from './TagInput';

export interface SupplierDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Restores focus to the opener when the dialog closes (see `useDisclosure`). */
  onCloseAutoFocus?: (event: Event) => void;
  supplier: Supplier | null;
  onSave: (supplier: Supplier) => void;
}

const EMPTY_CONTACT: ContactFormValues = { name: '', email: '', role: '' };

const sectionTitle = 'font-display text-lg font-medium text-graphite/80';
const infoBox = 'flex w-full flex-col gap-4 rounded-lg border border-subtle p-4';

/**
 * Supplier detail dialog (1:25660; full layout 1:26137): editable name, tags, contacts and
 * notes over the read-only Parts Purchased and Activity facts. Save commits the draft.
 */
export function SupplierDetailDialog({
  open,
  onOpenChange,
  onCloseAutoFocus,
  supplier,
  onSave,
}: SupplierDetailDialogProps) {
  return (
    <Dialog open={open && supplier !== null} onOpenChange={onOpenChange}>
      {supplier ? (
        <DialogContent size="xl" onCloseAutoFocus={onCloseAutoFocus}>
          {/* Radix unmounts the content on close, so the draft resets each time it opens. */}
          <SupplierDetailForm supplier={supplier} onSave={onSave} />
        </DialogContent>
      ) : null}
    </Dialog>
  );
}

interface SupplierDetailFormProps {
  supplier: Supplier;
  onSave: (supplier: Supplier) => void;
}

function SupplierDetailForm({ supplier, onSave }: SupplierDetailFormProps) {
  const fieldId = useId();
  const [name, setName] = useState(supplier.name);
  const [tags, setTags] = useState<string[]>([...supplier.tags]);
  const [notes, setNotes] = useState(supplier.detailNotes);
  const [contacts, setContacts] = useState<SupplierContact[]>([...supplier.contacts]);
  const [contactForm, setContactForm] = useState<ContactFormValues>(EMPTY_CONTACT);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [contactSeq, setContactSeq] = useState(1);

  const status = SUPPLIER_STATUS[supplier.status];

  const handleEditContact = (id: string) => {
    const contact = contacts.find((item) => item.id === id);
    if (!contact) return;
    setEditingContactId(id);
    setContactForm({ name: contact.name, email: contact.email, role: contact.role ?? '' });
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    if (editingContactId === id) {
      setEditingContactId(null);
      setContactForm(EMPTY_CONTACT);
    }
  };

  const handleSaveContact = () => {
    const trimmedName = contactForm.name.trim();
    if (!trimmedName) return;
    const role = contactForm.role.trim() || undefined;
    if (editingContactId !== null) {
      setContacts(
        contacts.map((contact) =>
          contact.id === editingContactId
            ? { ...contact, name: trimmedName, email: contactForm.email.trim(), role }
            : contact,
        ),
      );
    } else {
      // TODO(api): the server will assign the contact id.
      setContacts([
        ...contacts,
        {
          id: `contact-new-${String(contactSeq)}`,
          name: trimmedName,
          email: contactForm.email.trim(),
          role,
          primary: contacts.length === 0,
        },
      ]);
      setContactSeq(contactSeq + 1);
    }
    setEditingContactId(null);
    setContactForm(EMPTY_CONTACT);
  };

  return (
    <>
      <DialogHeader>
        <div className="flex items-center gap-3">
          <DialogTitle>{supplier.name}</DialogTitle>
          <Badge tone={status.tone} dot={false}>
            {status.label}
          </Badge>
        </div>
        <DialogDescription>{supplier.domain}</DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Supplier Name" htmlFor={`${fieldId}-name`}>
            <Input
              id={`${fieldId}-name`}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </FormField>
          <FormField label="Tags" htmlFor={`${fieldId}-tags`}>
            <TagInput
              id={`${fieldId}-tags`}
              label="Add a tag"
              value={tags}
              onValueChange={setTags}
            />
          </FormField>
        </div>

        <section aria-label="Contact" className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-medium text-graphite">Contact</h3>
            <Button
              variant="neutral"
              size="sm"
              leadingIcon={<Icon name="plus" size={20} />}
              onClick={() => {
                setEditingContactId(null);
                setContactForm(EMPTY_CONTACT);
              }}
            >
              Add
            </Button>
          </div>
          {contacts.map((contact) => (
            <ContactRow
              key={contact.id}
              contact={contact}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
            />
          ))}
          <ContactForm values={contactForm} onChange={setContactForm} onSave={handleSaveContact} />
        </section>

        <FormField label="Notes" htmlFor={`${fieldId}-notes`}>
          <Textarea
            id={`${fieldId}-notes`}
            className="h-sup-notes"
            value={notes}
            onChange={(event) => {
              setNotes(event.target.value);
            }}
          />
        </FormField>

        <section aria-label="Parts Purchased" className="flex flex-col gap-3">
          <h3 className={sectionTitle}>Parts Purchased</h3>
          <div className={infoBox}>
            {supplier.parts.map((part, index) => (
              <div key={part.id} className="flex flex-col gap-4">
                {index > 0 ? <div className="border-t border-subtle" /> : null}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <p className="truncate font-display text-base font-medium text-umber">
                      {part.number}
                    </p>
                    <p className="truncate font-sans text-sm text-graphite/40">
                      {part.description}
                    </p>
                  </div>
                  <p className="font-display text-base font-semibold text-umber">
                    {part.priceLabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-label="Activity" className="flex flex-col gap-3">
          <h3 className={sectionTitle}>Activity</h3>
          <dl className={infoBox}>
            {[
              { label: 'Messages', value: supplier.activity.messages },
              { label: 'Last Seen', value: supplier.activity.lastSeen },
              { label: 'Last Purchase', value: supplier.activity.lastPurchase },
              { label: 'Two-way email', value: supplier.activity.twoWayEmail },
            ].map((fact) => (
              <div key={fact.label} className="grid w-full grid-cols-modal-facts items-center">
                <dt className="font-sans text-lg text-graphite/60">{fact.label}</dt>
                <dd className="font-sans text-lg text-graphite">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="neutral" size="lg">
            Cancel
          </Button>
        </DialogClose>
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            onSave({ ...supplier, name, tags, detailNotes: notes, contacts });
          }}
        >
          Save
        </Button>
      </DialogFooter>
    </>
  );
}
