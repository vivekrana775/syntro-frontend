import { Button, Divider } from '@/components/ui';

import { SectionHeader } from './SectionHeader';

export interface ShipmentTimelinePanelProps {
  onGenerateTimeline: () => void;
}

/** Left column of the PO detail card (1:20597, 1:20615). Only the empty states are designed. */
export function ShipmentTimelinePanel({ onGenerateTimeline }: ShipmentTimelinePanelProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6 p-6">
      <div className="flex flex-col items-start gap-4">
        <SectionHeader
          title="Shipment Timeline"
          description="No shipment events yet. Tracking will populate this as supplier emails arrive."
        />
        <Button variant="primary" size="md" onClick={onGenerateTimeline}>
          Generate CEO Timeline
        </Button>
      </div>
      <Divider />
      <SectionHeader
        size="md"
        title="Supplier Communication"
        description="No supplier emails referenced from this PO yet."
      />
    </div>
  );
}
