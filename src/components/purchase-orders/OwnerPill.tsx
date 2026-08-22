import { Badge } from '@/components/ui';
import { TRACKER_OWNER, type TrackerOwner } from '@/types';

export interface OwnerPillProps {
  owner: TrackerOwner;
}

/** Tracker owner tag without the status dot (1:20421). */
export function OwnerPill({ owner }: OwnerPillProps) {
  const spec = TRACKER_OWNER[owner];
  return (
    <Badge tone={spec.tone} dot={false}>
      {spec.label}
    </Badge>
  );
}
