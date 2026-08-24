import { Badge, Icon, IconButton } from '@/components/ui';
import type { SupplierContact } from '@/types';

export interface ContactRowProps {
  contact: SupplierContact;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

/** Saved contact card (1:26177): name + Primary chip over the email, with edit / delete actions. */
export function ContactRow({ contact, onEdit, onDelete }: ContactRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-neutral p-4">
      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex items-center gap-2">
          <p className="truncate font-display text-base font-medium text-umber">{contact.name}</p>
          {contact.primary ? (
            <Badge tone="outline-strong" size="md" dot={false}>
              Primary
            </Badge>
          ) : null}
        </div>
        <p className="truncate font-sans text-sm text-graphite/40">{contact.email}</p>
      </div>
      <div className="flex items-center gap-2">
        <IconButton
          variant="white"
          size={32}
          aria-label={`Edit ${contact.name}`}
          onClick={() => {
            onEdit(contact.id);
          }}
        >
          <Icon name="edit" size={16} />
        </IconButton>
        <IconButton
          variant="white"
          size={32}
          aria-label={`Delete ${contact.name}`}
          onClick={() => {
            onDelete(contact.id);
          }}
        >
          <Icon name="trash" size={16} />
        </IconButton>
      </div>
    </div>
  );
}
