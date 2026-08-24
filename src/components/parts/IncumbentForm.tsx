import { useId } from 'react';

import { Button, FormField, Input, Select, type SelectOption } from '@/components/ui';
import { TOOLING_OWNER_LABEL, TOOLING_OWNERS } from '@/types';

export interface IncumbentFormValues {
  supplierId: string;
  /** Raw select value ("" until chosen); narrowed to `ToolingOwner` on save. */
  toolingOwner: string;
  sunkNre: string;
  notes: string;
}

export interface IncumbentFormProps {
  values: IncumbentFormValues;
  onChange: (values: IncumbentFormValues) => void;
  supplierOptions: readonly SelectOption[];
  onSave: () => void;
  onCancel: () => void;
}

const TOOLING_OWNER_OPTIONS = TOOLING_OWNERS.map((owner) => ({
  value: owner,
  label: TOOLING_OWNER_LABEL[owner],
}));

/**
 * "Tooled / Incumbent Supplier" form (1:21462): two selects and two inputs on a 2×2 grid over
 * Save Incumbent / Cancel (1:21487).
 */
export function IncumbentForm({
  values,
  onChange,
  supplierOptions,
  onSave,
  onCancel,
}: IncumbentFormProps) {
  const fieldId = useId();

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Supplier" htmlFor={`${fieldId}-supplier`}>
          <Select
            id={`${fieldId}-supplier`}
            options={supplierOptions}
            value={values.supplierId}
            onValueChange={(supplierId) => {
              onChange({ ...values, supplierId });
            }}
          />
        </FormField>
        <FormField label="Tooling Owner" htmlFor={`${fieldId}-owner`}>
          <Select
            id={`${fieldId}-owner`}
            options={TOOLING_OWNER_OPTIONS}
            value={values.toolingOwner}
            onValueChange={(toolingOwner) => {
              onChange({ ...values, toolingOwner });
            }}
          />
        </FormField>
        <FormField label="Sunk NRE" htmlFor={`${fieldId}-nre`}>
          <Input
            id={`${fieldId}-nre`}
            inputMode="decimal"
            placeholder="E.g. 1200"
            value={values.sunkNre}
            onChange={(event) => {
              onChange({ ...values, sunkNre: event.target.value });
            }}
          />
        </FormField>
        <FormField label="Notes" htmlFor={`${fieldId}-notes`}>
          <Input
            id={`${fieldId}-notes`}
            placeholder="Add a note here..."
            value={values.notes}
            onChange={(event) => {
              onChange({ ...values, notes: event.target.value });
            }}
          />
        </FormField>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="primary" size="lg" onClick={onSave}>
          Save Incumbent
        </Button>
        <Button variant="neutral" size="lg" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
