import chartSquare from '@/assets/images/chart-square.svg';
import { NewOrderModal } from '@/components/dashboard';
import { AppLayout, PageHeading } from '@/components/layout';
import { Card, EmptyState } from '@/components/ui';
import { useDisclosure } from '@/hooks';
import { currentUser, navigation } from '@/mocks';
import type { NewOrderKind } from '@/types';

const DESCRIPTION =
  'Spend, delivery, and sourcing metrics will appear here automatically once there’s\nenough history to compute them. No setup needed.';

/** Analytics page (1:23548): the "Collecting data as you use Syntro" empty state. */
export function AnalyticsPage() {
  const newOrder = useDisclosure();

  const handleContinue = (kind: NewOrderKind) => {
    // TODO(api): start the selected sourcing flow.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('new order', kind);
    newOrder.onClose();
  };

  return (
    <AppLayout
      title="Analytics"
      user={currentUser}
      navigation={navigation}
      onNewOrder={newOrder.onOpen}
    >
      <div className="flex flex-1 flex-col gap-6">
        <PageHeading title="Analytics" subtitle="spend, delivery, and sourcing performance" />
        <Card className="flex flex-1 flex-col">
          <EmptyState
            tone="soft"
            mediaGap="md"
            title="Collecting data as you use Syntro"
            description={DESCRIPTION}
            // The heading carries the meaning; the chart tile is decorative (1:23634).
            media={<img src={chartSquare} width={48} height={48} alt="" className="size-12" />}
          />
        </Card>
      </div>

      <NewOrderModal
        open={newOrder.open}
        onOpenChange={newOrder.onOpenChange}
        onCloseAutoFocus={newOrder.onCloseAutoFocus}
        onContinue={handleContinue}
      />
    </AppLayout>
  );
}
