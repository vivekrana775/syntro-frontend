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
  Select,
} from '@/components/ui';
import type { Project } from '@/types';

export interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projects: Project[];
  onApply: (projectId: string | null) => void;
}

/** "Filter" dialog (1:2410): a single Project select with Reset / Apply. */
export function FilterModal({ open, onOpenChange, projects, onApply }: FilterModalProps) {
  const [projectId, setProjectId] = useState('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md">
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
          <DialogDescription>Select a project to filter dashboard metrics.</DialogDescription>
        </DialogHeader>

        <FormField label="Project" htmlFor="filter-project">
          <Select
            id="filter-project"
            placeholder="Select"
            value={projectId}
            onValueChange={setProjectId}
            options={projects.map((project) => ({ value: project.id, label: project.name }))}
          />
        </FormField>

        <DialogFooter>
          <Button
            variant="neutral"
            size="lg"
            onClick={() => {
              setProjectId('');
            }}
          >
            Reset
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              onApply(projectId || null);
            }}
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
