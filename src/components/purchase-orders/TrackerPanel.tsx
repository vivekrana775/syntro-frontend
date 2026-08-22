import { useId } from 'react';

import { Card } from '@/components/ui';
import type { TrackerGroup } from '@/types';

import { SectionHeader } from './SectionHeader';
import { TrackerTable } from './TrackerTable';

export interface TrackerPanelProps {
  groups: TrackerGroup[];
  onView: (id: string) => void;
}

/** Tracker tab body (1:20396): one table per group (Pending, Issued). */
export function TrackerPanel({ groups, onView }: TrackerPanelProps) {
  const id = useId();

  return (
    <Card className="flex flex-col gap-6">
      {groups.map((group) => {
        const headingId = `${id}-${group.id}`;
        return (
          <section key={group.id} aria-labelledby={headingId} className="flex flex-col gap-5">
            <SectionHeader id={headingId} title={group.title} description={group.description} />
            <TrackerTable
              caption={`${group.title} purchase orders`}
              rows={group.rows}
              onView={onView}
            />
          </section>
        );
      })}
    </Card>
  );
}
