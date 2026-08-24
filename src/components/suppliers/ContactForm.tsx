import { useId } from 'react';

import { Button, FormField, Input } from '@/components/ui';

export interface ContactFormValues {
  name: string;
  email: string;
  role: string;
}

export interface ContactFormProps {
  values: ContactFormValues;
  onChange: (values: ContactFormValues) => void;
  onSave: () => void;
}

/** Inline add/edit contact row (1:26193): three fields and a Save pill on a white card. */
export function ContactForm({ values, onChange, onSave }: ContactFormProps) {
  const fieldId = useId();

  return (
    <div className="flex flex-wrap items-end gap-4 rounded-lg border border-subtle bg-white p-4">
      <FormField label="Primary Contact Name" htmlFor={`${fieldId}-name`} className="flex-1">
        <Input
          id={`${fieldId}-name`}
          placeholder="E.g. Alex Rivera"
          value={values.name}
          onChange={(event) => {
            onChange({ ...values, name: event.target.value });
          }}
        />
      </FormField>
      <FormField label="Primary Email Address" htmlFor={`${fieldId}-email`} className="flex-1">
        <Input
          id={`${fieldId}-email`}
          type="email"
          placeholder="E.g. alex@supplier.com"
          value={values.email}
          onChange={(event) => {
            onChange({ ...values, email: event.target.value });
          }}
        />
      </FormField>
      <FormField label="Role" htmlFor={`${fieldId}-role`} className="flex-1">
        <Input
          id={`${fieldId}-role`}
          placeholder="E.g. Sales Manager"
          value={values.role}
          onChange={(event) => {
            onChange({ ...values, role: event.target.value });
          }}
        />
      </FormField>
      <Button variant="neutral" size="lg" onClick={onSave}>
        Save
      </Button>
    </div>
  );
}
