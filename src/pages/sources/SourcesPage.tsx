import { Navigate, useParams } from 'react-router-dom';

import { NewOrderModal } from '@/components/dashboard';
import { AppLayout, PageHeading } from '@/components/layout';
import { DetailToolbar } from '@/components/review';
import { SkippedAside, SourceEmailDetail, SourceList } from '@/components/sources';
import { Button, Card, Icon, SegmentedControl, type SegmentedOption } from '@/components/ui';
import { useDisclosure, useTabParam } from '@/hooks';
import { cn } from '@/lib/cn';
import { ROUTES, sourcePath, sourcesPath } from '@/lib/constants';
import { getPager, pad2 } from '@/lib/review';
import { currentUser, navigation, sources } from '@/mocks';
import { SOURCE_TABS, type NewOrderKind, type SourceTab } from '@/types';

const TAB_LABELS: Record<SourceTab, string> = {
  all: 'All',
  procurement: 'Procurement',
  skipped: 'Skipped',
  questions: 'Questions',
  extracted: 'Extracted',
};

const itemsFor = (tab: SourceTab) =>
  tab === 'all' ? sources.items : sources.items.filter((item) => item.category === tab);

// Figma shows a count on the Skipped tab only (1:23220).
const TAB_OPTIONS: readonly SegmentedOption<SourceTab>[] = SOURCE_TABS.map((value) => ({
  value,
  label:
    value === 'skipped'
      ? `${TAB_LABELS[value]} (${pad2(itemsFor(value).length)})`
      : TAB_LABELS[value],
}));

/** Sources list and opened email (1:23106, 1:23239), keyed by `:sourceId`. */
export function SourcesPage() {
  const { sourceId } = useParams<{ sourceId: string }>();
  const [tab, setTab] = useTabParam(SOURCE_TABS, 'skipped');
  const newOrder = useDisclosure();

  const email =
    sourceId === undefined ? undefined : sources.items.find((item) => item.id === sourceId);
  if (sourceId !== undefined && email === undefined) {
    return <Navigate to={sourcesPath(tab)} replace />;
  }

  const activeTab = email ? email.category : tab;
  const visible = itemsFor(activeTab);
  const pager = email ? getPager(visible, email.id) : null;
  // Only the Skipped tab's heading is designed; other tabs reuse their tab label.
  const heading = `${activeTab === 'skipped' ? 'Unrouted' : TAB_LABELS[activeTab]} (${pad2(visible.length)})`;

  const handleContinue = (kind: NewOrderKind) => {
    // TODO(api): start the selected sourcing flow.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('new order', kind);
    newOrder.onClose();
  };

  const handleSync = () => {
    // TODO(api): trigger a mailbox sync.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('sync sources');
  };

  const handleMarkRelevant = () => {
    // TODO(api): reclassify the email as relevant.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('mark relevant', sourceId);
  };

  return (
    <AppLayout
      title="Sources"
      breadcrumb={
        email ? [{ label: 'Sources', to: ROUTES.sources }, { label: email.subject }] : undefined
      }
      user={currentUser}
      navigation={navigation}
      onNewOrder={newOrder.onOpen}
    >
      <div className="flex flex-1 flex-col gap-6">
        <PageHeading title="Sources" subtitle={`last sync ${sources.lastSync}`}>
          <Button
            variant="paper"
            size="md"
            className="mt-1.5 gap-2"
            leadingIcon={<Icon name="refresh-double" size={20} />}
            onClick={handleSync}
          >
            Sync Now
          </Button>
        </PageHeading>
        <SegmentedControl
          tone="paper"
          fit="hug"
          aria-label="Source categories"
          options={TAB_OPTIONS}
          value={activeTab}
          onValueChange={setTab}
          className="max-w-full self-start overflow-x-auto"
        />
        <Card
          padding="none"
          className={cn('flex flex-1 flex-col', email !== undefined && 'xl:flex-row')}
        >
          {email && pager ? (
            <>
              <SourceEmailDetail
                email={email}
                toolbar={
                  <DetailToolbar
                    backTo={sourcesPath(activeTab)}
                    backLabel="Back to Sources"
                    index={pager.index}
                    total={pager.total}
                    prevTo={pager.prev ? sourcePath(pager.prev.id) : null}
                    nextTo={pager.next ? sourcePath(pager.next.id) : null}
                  />
                }
              />
              {email.skipReason !== undefined ? (
                <SkippedAside reason={email.skipReason} onMarkRelevant={handleMarkRelevant} />
              ) : null}
            </>
          ) : (
            <SourceList heading={heading} items={visible} />
          )}
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
