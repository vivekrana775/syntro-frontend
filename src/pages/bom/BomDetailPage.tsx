import { useId, useState } from 'react';

import { Navigate, useParams } from 'react-router-dom';

import {
  BomDetailHeader,
  BomTree,
  PartsTable,
  UploadBomDialog,
  type UploadResult,
} from '@/components/bom';
import { NewOrderModal } from '@/components/dashboard';
import { AppLayout } from '@/components/layout';
import { SectionHeader } from '@/components/purchase-orders';
import {
  Button,
  Card,
  Icon,
  SearchInput,
  SegmentedControl,
  type SegmentedOption,
} from '@/components/ui';
import { useDisclosure, useTabParam } from '@/hooks';
import { ROUTES } from '@/lib/constants';
import { currentUser, getBomDetail, navigation, uploadPreview } from '@/mocks';
import { BOM_DETAIL_TABS, SYNTRO_FIELDS, type BomDetailTab, type NewOrderKind } from '@/types';

const TAB_OPTIONS: readonly SegmentedOption<BomDetailTab>[] = [
  { value: 'tree', label: 'Tree' },
  { value: 'table', label: 'Table' },
];

/** BOM detail (1:19321 Tree, 1:19586 Table), keyed by `:bomId`; the view lives in `?tab=`. */
export function BomDetailPage() {
  const { bomId } = useParams<{ bomId: string }>();
  const [tab, setTab] = useTabParam(BOM_DETAIL_TABS, 'tree');
  const headingId = useId();
  const newOrder = useDisclosure();
  const upload = useDisclosure();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<ReadonlySet<string>>(() => new Set());

  const detail = bomId === undefined ? undefined : getBomDetail(bomId);
  if (detail === undefined) {
    return <Navigate to={ROUTES.bom} replace />;
  }

  const query = search.trim().toLowerCase();
  const matches = (...values: string[]) =>
    query === '' || values.some((value) => value.toLowerCase().includes(query));
  const assembly = {
    ...detail.assembly,
    parts: detail.assembly.parts.filter((part) => matches(part.number, part.name)),
  };
  const rows = detail.rows.filter((row) => matches(row.number, row.category));

  const toggle = (id: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? new Set(rows.map((row) => row.id)) : new Set());
  };

  const handleContinue = (kind: NewOrderKind) => {
    // TODO(api): start the selected sourcing flow.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('new order', kind);
    newOrder.onClose();
  };

  const handleUploadComplete = (result: UploadResult) => {
    // TODO(api): re-upload the spreadsheet as a new version of this BOM.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('re-upload bom', detail.id, result);
    upload.onClose();
  };

  const handleStartRfq = () => {
    // TODO(api): start an RFQ for the selected parts (flow not in Figma).
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('start rfq', [...selected]);
  };

  const handleViewPart = (id: string) => {
    // TODO(api): open the part (no part screen in Figma).
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('view part', id);
  };

  return (
    <AppLayout
      title={detail.title}
      breadcrumb={[{ label: 'BOM', to: ROUTES.bom }, { label: detail.title }]}
      user={currentUser}
      navigation={navigation}
      onNewOrder={newOrder.onOpen}
    >
      <div className="flex flex-1 flex-col gap-6">
        <BomDetailHeader title={detail.title} versions={detail.versions} summary={detail.summary}>
          <Button
            variant="paper"
            size="md"
            className="mt-1.5 gap-2"
            leadingIcon={<Icon name="upload" />}
            onClick={upload.onOpen}
          >
            Re-upload BOM
          </Button>
        </BomDetailHeader>

        <Card className="flex flex-1 flex-col gap-6">
          <section aria-labelledby={headingId} className="flex flex-1 flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SectionHeader
                id={headingId}
                as="h2"
                title={detail.section.title}
                description={detail.section.partsLabel}
              />
              <Button
                variant="surface"
                size="md"
                leadingIcon={<Icon name="plus" />}
                onClick={handleStartRfq}
              >
                Start RFQ
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SegmentedControl
                tone="surface"
                fit="hug"
                aria-label="Assembly view"
                options={TAB_OPTIONS}
                value={tab}
                onValueChange={setTab}
              />
              <SearchInput
                tone="outline"
                label="Search parts"
                placeholder="Search Parts..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                width="sm"
              />
            </div>
            {tab === 'tree' ? (
              <BomTree
                assembly={assembly}
                selected={selected}
                onToggle={toggle}
                onView={handleViewPart}
              />
            ) : (
              <PartsTable
                caption={`${detail.title} parts`}
                rows={rows}
                selected={selected}
                onToggle={toggle}
                onToggleAll={toggleAll}
                onView={handleViewPart}
              />
            )}
          </section>
        </Card>
      </div>

      <NewOrderModal
        open={newOrder.open}
        onOpenChange={newOrder.onOpenChange}
        onCloseAutoFocus={newOrder.onCloseAutoFocus}
        onContinue={handleContinue}
      />
      <UploadBomDialog
        open={upload.open}
        onOpenChange={upload.onOpenChange}
        onCloseAutoFocus={upload.onCloseAutoFocus}
        preview={uploadPreview}
        fields={SYNTRO_FIELDS}
        onComplete={handleUploadComplete}
      />
    </AppLayout>
  );
}
