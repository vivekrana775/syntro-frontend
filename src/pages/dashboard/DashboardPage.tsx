import { DashboardContent, FilterModal, NewOrderModal } from '@/components/dashboard';
import { AppLayout } from '@/components/layout';
import { useDisclosure } from '@/hooks';
import { currentUser, dashboard, navigation, projects } from '@/mocks';
import type { NewOrderKind } from '@/types';

export function DashboardPage() {
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
    // TODO(api): navigate to the action queue (screen not in Figma).
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('open action queue');
  };

  const handleSelectReviewItem = (id: string) => {
    // TODO(api): open the review item (screen not in Figma).
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('review item', id);
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
