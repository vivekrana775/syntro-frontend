import { NewOrderModal } from '@/components/dashboard';
import { KnowledgeTable } from '@/components/knowledge';
import { AppLayout, PageHeading } from '@/components/layout';
import { Card } from '@/components/ui';
import { useDisclosure } from '@/hooks';
import { currentUser, knowledge, navigation } from '@/mocks';
import type { NewOrderKind } from '@/types';

/** Knowledge page (1:23399): the learned-memories table on a single card. */
export function KnowledgePage() {
  const newOrder = useDisclosure();

  const handleContinue = (kind: NewOrderKind) => {
    // TODO(api): start the selected sourcing flow.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('new order', kind);
    newOrder.onClose();
  };

  return (
    <AppLayout
      title={knowledge.title}
      user={currentUser}
      navigation={navigation}
      onNewOrder={newOrder.onOpen}
    >
      <div className="flex flex-1 flex-col gap-6">
        <PageHeading title={knowledge.title} subtitle={knowledge.subtitle} />
        <Card className="flex flex-1 flex-col gap-6">
          <KnowledgeTable caption="Learned memories" memories={knowledge.memories} />
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
