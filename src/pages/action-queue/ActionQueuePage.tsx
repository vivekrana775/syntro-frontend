import { Navigate, useNavigate, useParams } from 'react-router-dom';

import {
  InboundRfqDetail,
  NeedsYouList,
  TeamItemDetail,
  TeamTable,
} from '@/components/action-queue';
import { NewOrderModal } from '@/components/dashboard';
import { AppLayout, PageHeading } from '@/components/layout';
import { PurchaseOrderDetailContent } from '@/components/purchase-orders';
import { DetailToolbar } from '@/components/review';
import { Card, SegmentedControl, type SegmentedOption } from '@/components/ui';
import { useDisclosure, useTabParam } from '@/hooks';
import { actionQueueItemPath, actionQueuePath, ROUTES } from '@/lib/constants';
import { findActionQueueItem, getPager, tabForItem } from '@/lib/review';
import { actionQueue, currentUser, getPurchaseOrderDetail, navigation, projects } from '@/mocks';
import { ACTION_QUEUE_TABS, type ActionQueueTab, type NewOrderKind } from '@/types';

const TAB_LABELS: Record<ActionQueueTab, string> = { 'needs-you': 'Needs You', team: 'Team' };

const TAB_OPTIONS: readonly SegmentedOption<ActionQueueTab>[] = ACTION_QUEUE_TABS.map((value) => ({
  value,
  label: TAB_LABELS[value],
}));

/**
 * Action Queue list and item detail (1:22719, 1:22831, 1:25976, 1:22986), keyed by `:itemId`.
 * Purchase-order ids resolve to the PO detail (1:20501), which Figma places under this route.
 */
export function ActionQueuePage() {
  const { itemId } = useParams<{ itemId: string }>();
  const [tab, setTab] = useTabParam(ACTION_QUEUE_TABS, 'needs-you');
  const navigate = useNavigate();
  const newOrder = useDisclosure();

  const match = itemId === undefined ? null : findActionQueueItem(actionQueue, itemId);
  const purchaseOrder =
    itemId !== undefined && match === null ? getPurchaseOrderDetail(itemId) : undefined;
  if (itemId !== undefined && match === null && purchaseOrder === undefined) {
    return <Navigate to={actionQueuePath(tab)} replace />;
  }

  const item = match?.item;
  const activeTab = item ? tabForItem(item) : tab;
  const pager = match ? getPager(match.siblings, match.item.id) : null;

  const handleTabChange = (value: ActionQueueTab) => {
    if (item) {
      navigate(actionQueuePath(value));
    } else {
      setTab(value);
    }
  };

  const handleContinue = (kind: NewOrderKind) => {
    // TODO(api): start the selected sourcing flow.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('new order', kind);
    newOrder.onClose();
  };

  const handleRoute = (projectId: string) => {
    // TODO(api): attach the inbound quote to an existing project.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('route quote', itemId, projectId);
  };

  const handleCreate = (projectName: string) => {
    // TODO(api): create the project and route the quote into it.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('create project and route', itemId, projectName);
  };

  const handleDismiss = () => {
    // TODO(api): mark the email as not an RFQ reply.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('not an rfq', itemId);
  };

  const handleResolve = (id: string) => {
    // TODO(api): resolve the escalation.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('resolve', id);
  };

  const handleView = (id: string) => {
    navigate(actionQueueItemPath(id));
  };

  const handleGenerateTimeline = (id: string) => {
    // TODO(api): ask the agent to build the shipment timeline.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('generate timeline', id);
  };

  const newOrderModal = (
    <NewOrderModal
      open={newOrder.open}
      onOpenChange={newOrder.onOpenChange}
      onCloseAutoFocus={newOrder.onCloseAutoFocus}
      onContinue={handleContinue}
    />
  );

  if (purchaseOrder) {
    return (
      <AppLayout
        title={purchaseOrder.number}
        breadcrumb={[
          { label: 'Action Queue', to: ROUTES.actionQueue },
          { label: purchaseOrder.number },
        ]}
        user={currentUser}
        navigation={navigation}
        onNewOrder={newOrder.onOpen}
      >
        <PurchaseOrderDetailContent
          detail={purchaseOrder}
          onGenerateTimeline={handleGenerateTimeline}
        />
        {newOrderModal}
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title="Action Queue"
      user={currentUser}
      navigation={navigation}
      onNewOrder={newOrder.onOpen}
    >
      <div className="flex flex-1 flex-col gap-6">
        <PageHeading title="Action Queue" subtitle={actionQueue.subtitle} />
        <SegmentedControl
          tone="paper"
          fit="hug"
          aria-label="Action queue views"
          options={TAB_OPTIONS}
          value={activeTab}
          onValueChange={handleTabChange}
          className="max-w-full self-start overflow-x-auto"
        />
        <Card padding="none" className="flex flex-1 flex-col">
          {item && pager ? (
            <>
              <DetailToolbar
                backTo={actionQueuePath(activeTab)}
                backLabel={`Back to ${TAB_LABELS[activeTab]}`}
                index={pager.index}
                total={pager.total}
                prevTo={pager.prev ? actionQueueItemPath(pager.prev.id) : null}
                nextTo={pager.next ? actionQueueItemPath(pager.next.id) : null}
              />
              {item.kind === 'inbound-rfq' ? (
                <InboundRfqDetail
                  item={item}
                  projects={projects}
                  onRoute={handleRoute}
                  onCreate={handleCreate}
                  onDismiss={handleDismiss}
                />
              ) : (
                <TeamItemDetail item={item} onResolve={handleResolve} />
              )}
            </>
          ) : activeTab === 'needs-you' ? (
            <NeedsYouList items={actionQueue.needsYou} />
          ) : (
            <TeamTable groups={actionQueue.team} onView={handleView} />
          )}
        </Card>
      </div>
      {newOrderModal}
    </AppLayout>
  );
}
