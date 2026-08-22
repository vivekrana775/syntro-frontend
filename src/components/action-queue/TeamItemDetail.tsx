import { DetailHeading, Hairline } from '@/components/review';
import { Button, Icon } from '@/components/ui';
import type { TeamItem } from '@/types';

export interface TeamItemDetailProps {
  item: TeamItem;
  onResolve: (id: string) => void;
}

/** Escalation / shipment detail (1:23077): headline, meta, body and the Resolve action. */
export function TeamItemDetail({ item, onResolve }: TeamItemDetailProps) {
  return (
    <div className="flex flex-col gap-5 p-6">
      <DetailHeading title={item.title} meta={item.meta} />
      <Hairline />
      <p className="font-display text-lg font-medium text-graphite">{item.body}</p>
      <div className="pt-1">
        <Button
          variant="primary"
          size="md"
          leadingIcon={<Icon name="check" />}
          onClick={() => {
            onResolve(item.id);
          }}
        >
          Resolve
        </Button>
      </div>
    </div>
  );
}
