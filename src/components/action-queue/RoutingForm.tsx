import { useId, useState } from 'react';

import { Button, Input, Label, Select } from '@/components/ui';
import type { Project } from '@/types';

export interface RoutingFormProps {
  prompt: string;
  note: string;
  projects: Project[];
  suggestedProjectName: string;
  onRoute: (projectId: string) => void;
  onCreate: (projectName: string) => void;
}

/** Route-this-quote form (1:26096): pick an existing project, or create one from the suggested name. */
export function RoutingForm({
  prompt,
  note,
  projects,
  suggestedProjectName,
  onRoute,
  onCreate,
}: RoutingFormProps) {
  const id = useId();
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState(suggestedProjectName);
  const projectFieldId = `${id}-project`;
  const nameFieldId = `${id}-name`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-base font-medium text-graphite">{prompt}</h3>
        <p className="font-display text-base text-graphite/60">{note}</p>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor={projectFieldId}>Add an existing project</Label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select
            id={projectFieldId}
            options={projects.map((project) => ({ value: project.id, label: project.name }))}
            value={projectId}
            onValueChange={setProjectId}
          />
          <Button
            variant="primary-deep"
            size="lg"
            onClick={() => {
              onRoute(projectId);
            }}
          >
            Route here
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor={nameFieldId}>Project Name</Label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            id={nameFieldId}
            value={projectName}
            onChange={(event) => {
              setProjectName(event.target.value);
            }}
          />
          <Button
            variant="surface"
            size="lg"
            onClick={() => {
              onCreate(projectName);
            }}
          >
            Create &amp; route
          </Button>
        </div>
      </div>
    </div>
  );
}
