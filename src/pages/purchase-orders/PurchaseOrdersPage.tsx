import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { NewOrderModal } from '@/components/dashboard';
import { AppLayout } from '@/components/layout';
import {
  PoTabs,
  PurchaseOrderDetailModal,
  PurchaseOrdersHeader,
  ReplyResultDialog,
  TrackerPanel,
  WatchlistPanel,
  type ReplyResultVariant,
} from '@/components/purchase-orders';
import { useDisclosure } from '@/hooks';
import { actionQueueItemPath, ROUTES, type RoutePath } from '@/lib/constants';
import { currentUser, navigation, purchaseOrders } from '@/mocks';
import type { NewOrderKind, PurchaseOrdersTab } from '@/types';

const TAB_ROUTES: Record<PurchaseOrdersTab, RoutePath> = {
  watchlist: ROUTES.purchaseOrdersWatchlist,
  tracker: ROUTES.purchaseOrdersTracker,
};

export interface PurchaseOrdersPageProps {
  tab: PurchaseOrdersTab;
}

/** Purchase Orders page; the active tab is part of the URL (1:19897 Watchlist, 1:20282 Tracker). */
export function PurchaseOrdersPage({ tab }: PurchaseOrdersPageProps) {
  const navigate = useNavigate();
  const newOrder = useDisclosure();
  const detail = useDisclosure();
  const result = useDisclosure();
  const [selectedPoId, setSelectedPoId] = useState<string | null>(null);
  const [resultVariant, setResultVariant] = useState<ReplyResultVariant>('confirmed');

  const data = purchaseOrders;
  const selectedPo = selectedPoId === null ? null : (data.summaries[selectedPoId] ?? null);

  const handleTabChange = (next: PurchaseOrdersTab) => {
    navigate(TAB_ROUTES[next]);
  };

  const handleContinue = (kind: NewOrderKind) => {
    // TODO(api): start the selected sourcing flow.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('new order', kind);
    newOrder.onClose();
  };

  const handleNewPurchaseOrder = () => {
    // TODO(api): start a new purchase order (flow not in Figma).
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('new purchase order');
  };

  const handleView = (poId: string) => {
    setSelectedPoId(poId);
    detail.onOpen();
  };

  const handleDone = (poId: string) => {
    // TODO(api): persist any changes made in the PO detail dialog.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('po detail done', poId);
    detail.onClose();
  };

  const handleSendDraft = (id: string) => {
    // TODO(api): send the drafted follow-up email.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('send draft', id);
  };

  const handleDismissDraft = (id: string) => {
    // TODO(api): dismiss the drafted follow-up.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('dismiss draft', id);
  };

  const openResult = (variant: ReplyResultVariant) => {
    setResultVariant(variant);
    result.onOpen();
  };

  const handleConfirmResult = (variant: ReplyResultVariant) => {
    // TODO(api): apply the confirmed/rejected classification to the reply.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('reply', variant);
    result.onClose();
  };

  const handleViewTracked = (id: string) => {
    navigate(actionQueueItemPath(id));
  };

  return (
    <AppLayout
      title={data.title}
      user={currentUser}
      navigation={navigation}
      onNewOrder={newOrder.onOpen}
    >
      <div className="flex flex-col gap-6">
        <PurchaseOrdersHeader
          title={data.title}
          subtitle={data.tabs[tab].subtitle}
          onNewPurchaseOrder={handleNewPurchaseOrder}
        />
        <PoTabs value={tab} tabs={data.tabs} onValueChange={handleTabChange} />
        {tab === 'watchlist' ? (
          <WatchlistPanel
            data={data.watchlist}
            onView={handleView}
            onSendDraft={handleSendDraft}
            onDismissDraft={handleDismissDraft}
            onConfirmReply={() => {
              openResult('confirmed');
            }}
            onRejectReply={() => {
              openResult('rejected');
            }}
          />
        ) : (
          <TrackerPanel groups={data.tracker.groups} onView={handleViewTracked} />
        )}
      </div>

      <NewOrderModal
        open={newOrder.open}
        onOpenChange={newOrder.onOpenChange}
        onCloseAutoFocus={newOrder.onCloseAutoFocus}
        onContinue={handleContinue}
      />
      <PurchaseOrderDetailModal
        open={detail.open}
        onOpenChange={detail.onOpenChange}
        onCloseAutoFocus={detail.onCloseAutoFocus}
        po={selectedPo}
        onDone={handleDone}
      />
      <ReplyResultDialog
        open={result.open}
        onOpenChange={result.onOpenChange}
        onCloseAutoFocus={result.onCloseAutoFocus}
        variant={resultVariant}
        onConfirm={handleConfirmResult}
      />
    </AppLayout>
  );
}
