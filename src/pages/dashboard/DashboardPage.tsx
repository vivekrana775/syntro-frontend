import { useNavigate } from 'react-router-dom';

import { DashboardContent, FilterModal, NewOrderModal } from '@/components/dashboard';
import { AppLayout } from '@/components/layout';
import { useDisclosure } from '@/hooks';
import { actionQueueItemPath, ROUTES } from '@/lib/constants';
import { currentUser, dashboard, navigation, projects } from '@/mocks';
import type { NewOrderKind } from '@/types';

export function DashboardPage() {
  const navigate = useNavigate();
  const newOrder = useDisclosure();
  const filter = useDisclosure();

  const handleContinue = (kind: NewOrderKind) => {
    // TODO(api): start the selected sourcing flow.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('new order', kind);
    newOrder.onClose();
  };

  const handleApplyFilter = (projectId: string | null) => {
    // TODO(api): refetch dashboard metrics for the selected project.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('filter', projectId);
    filter.onClose();
  };

  const handleOpenQueue = () => {
    navigate(ROUTES.actionQueue);
  };

  const handleSelectReviewItem = (id: string) => {
    // Unknown ids fall back to the queue list (see ActionQueuePage).
    navigate(actionQueueItemPath(id));
  };

  return (
    <AppLayout
      title="Dashboard"
      user={currentUser}
      navigation={navigation}
      onNewOrder={newOrder.onOpen}
    >
      <DashboardContent
        data={dashboard}
        onOpenFilter={filter.onOpen}
        onOpenQueue={handleOpenQueue}
        onSelectReviewItem={handleSelectReviewItem}
      />
      <NewOrderModal
        open={newOrder.open}
        onOpenChange={newOrder.onOpenChange}
        onCloseAutoFocus={newOrder.onCloseAutoFocus}
        onContinue={handleContinue}
      />
      <FilterModal
        open={filter.open}
        onOpenChange={filter.onOpenChange}
        onCloseAutoFocus={filter.onCloseAutoFocus}
        projects={projects}
        onApply={handleApplyFilter}
      />
    </AppLayout>
  );
}
