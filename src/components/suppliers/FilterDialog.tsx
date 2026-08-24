import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormField,
} from '@/components/ui';
import type { SupplierFilterOptions } from '@/types';

import { ChipMultiSelect } from './ChipMultiSelect';

export interface SupplierFilters {
  statuses: string[];
  tags: string[];
}

export interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Restores focus to the opener when the dialog closes (see `useDisclosure`). */
  onCloseAutoFocus?: (event: Event) => void;
  options: SupplierFilterOptions;
  onApply: (filters: SupplierFilters) => void;
}

/** "Filter" dialog (1:22327): Status and Tags chip multi-selects with Reset / Apply. */
export function FilterDialog({
  open,
  onOpenChange,
  onCloseAutoFocus,
  options,
  onApply,
}: FilterDialogProps) {
  // The dialog opens with the designed selection (1:22342, 1:22361).
  const [statuses, setStatuses] = useState<string[]>(options.statuses);
  const [tags, setTags] = useState<string[]>(options.tags);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md" onCloseAutoFocus={onCloseAutoFocus}>
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
          <DialogDescription>Refine the supplier list using the filters below.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <FormField label="Status" htmlFor="filter-status">
            <ChipMultiSelect
              id="filter-status"
              label="Status options"
              options={options.statuses}
              value={statuses}
              onValueChange={setStatuses}
            />
          </FormField>
          <FormField label="Tags" htmlFor="filter-tags">
            <ChipMultiSelect
              id="filter-tags"
              label="Tag options"
              options={options.tags}
              value={tags}
              onValueChange={setTags}
            />
          </FormField>
        </div>

        <DialogFooter>
          <Button
            variant="neutral"
            size="lg"
            onClick={() => {
              setStatuses([]);
              setTags([]);
            }}
          >
            Reset
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              onApply({ statuses, tags });
            }}
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
