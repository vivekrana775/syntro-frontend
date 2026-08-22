import { Badge } from '@/components/ui';
import { TRACKER_STATUS, type TrackerStatus } from '@/types';

export interface StatusPillProps {
  status: TrackerStatus;
}

/** Dotted tracker status pill (1:20412). */
export function StatusPill({ status }: StatusPillProps) {
  const spec = TRACKER_STATUS[status];
  return <Badge tone={spec.tone}>{spec.label}</Badge>;
}
