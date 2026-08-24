import { useReducer, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { NewOrderModal } from '@/components/dashboard';
import { AppLayout } from '@/components/layout';
import {
  DiscoveredPanel,
  FilterDialog,
  NewSupplierDialog,
  ReconcilePanel,
  SupplierDetailDialog,
  SuppliersEmptyState,
  SuppliersHeader,
  SuppliersTable,
  SupplierTabs,
  SuppliersToolbar,
  type NewSupplierValues,
  type SupplierFilters,
} from '@/components/suppliers';
import { Card } from '@/components/ui';
import { useDisclosure } from '@/hooks';
import { ROUTES, type RoutePath } from '@/lib/constants';
import { currentUser, navigation, suppliers } from '@/mocks';
import { SUPPLIER_STATUS, type NewOrderKind, type Supplier, type SuppliersTab } from '@/types';

import { initialSuppliersState, nextSupplierId, suppliersReducer } from './suppliersReducer';

const TAB_ROUTES: Record<SuppliersTab, RoutePath> = {
  approved: ROUTES.suppliersApproved,
  discovered: ROUTES.suppliersDiscovered,
  reconcile: ROUTES.suppliersReconcile,
};

export interface SuppliersPageProps {
  tab: SuppliersTab;
}

/**
 * Suppliers page; the active tab is part of the URL (1:21702 Approved, 1:22377 Discovered,
 * 1:22519 Reconcile). `?empty` seeds the approved list empty to show the designed
 * "No Suppliers Yet" view (1:21926).
 */
export function SuppliersPage({ tab }: SuppliersPageProps) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [state, dispatch] = useReducer(suppliersReducer, params.has('empty'), (empty: boolean) =>
    initialSuppliersState(suppliers, empty),
  );
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<SupplierFilters | null>(null);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
  const newOrder = useDisclosure();
  const newSupplier = useDisclosure();
  const filter = useDisclosure();
  const detail = useDisclosure();

  const data = suppliers;
  const selectedSupplier =
    selectedSupplierId === null
      ? null
      : (state.suppliers.find((supplier) => supplier.id === selectedSupplierId) ?? null);

  const query = search.trim().toLowerCase();
  const visibleSuppliers = state.suppliers.filter((supplier) => {
    if (query && !supplier.name.toLowerCase().includes(query)) return false;
    if (filters) {
      const statusLabel = SUPPLIER_STATUS[supplier.status].label;
      if (filters.statuses.length > 0 && !filters.statuses.includes(statusLabel)) return false;
      if (filters.tags.length > 0 && !filters.tags.some((tag) => supplier.tags.includes(tag))) {
        return false;
      }
    }
    return true;
  });

  const counts: Record<SuppliersTab, number> = {
    approved: state.suppliers.length,
    // The designed tabs read (00) on both secondary views (1:21919).
    discovered: 0,
    reconcile: 0,
  };

  const subtitle =
    tab === 'approved'
      ? `${String(state.suppliers.length)} ${data.tabs.approved.subtitle}`
      : data.tabs[tab].subtitle;

  const handleTabChange = (next: SuppliersTab) => {
    navigate(TAB_ROUTES[next]);
  };

  const handleContinue = (kind: NewOrderKind) => {
    // TODO(api): start the selected sourcing flow.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('new order', kind);
    newOrder.onClose();
  };

  const handleView = (id: string) => {
    setSelectedSupplierId(id);
    detail.onOpen();
  };

  const handleApplyFilters = (next: SupplierFilters) => {
    setFilters(next.statuses.length === 0 && next.tags.length === 0 ? null : next);
    filter.onClose();
  };

  const handleCreateSupplier = (values: NewSupplierValues) => {
    const name = values.name.trim();
    if (!name) return;
    const email = values.emails.find((item) => item.trim() !== '')?.trim() ?? '-';
    // TODO(api): the server will assign the supplier id and enrich the record.
    const supplier: Supplier = {
      id: nextSupplierId(state),
      name,
      subName: name,
      email,
      hq: 'US',
      status: values.status,
      notes: '-',
      detailNotes: '',
      domain: values.website.trim().replace(/^www\./, '') || '-',
      tags: values.tags,
      contacts: values.contactName.trim()
        ? [{ id: 'contact-1', name: values.contactName.trim(), email, primary: true }]
        : [],
      parts: [],
      activity: { messages: '-', lastSeen: '-', lastPurchase: '-', twoWayEmail: 'No' },
    };
    dispatch({ type: 'supplier/create', supplier });
    newSupplier.onClose();
  };

  const handleSaveSupplier = (supplier: Supplier) => {
    // TODO(api): persist the edited supplier record.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('save supplier', supplier.id);
    dispatch({ type: 'supplier/update', supplier });
    detail.onClose();
  };

  const handleMerge = (keepId: string, mergeId: string) => {
    // TODO(api): merge the two supplier records (the merged result is not designed).
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('merge suppliers', keepId, mergeId);
  };

  const handleSaveVendorId = (gapId: string, vendorId: string) => {
    // TODO(api): store the NetSuite vendor id against the supplier.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('save vendor id', gapId, vendorId);
    dispatch({ type: 'gap/resolve', id: gapId });
  };

  const handleRefresh = () => {
    // TODO(api): re-run supplier discovery over the connected mailbox.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('refresh discovered suppliers');
  };

  return (
    <AppLayout
      title={data.title}
      user={currentUser}
      navigation={navigation}
      onNewOrder={newOrder.onOpen}
    >
      <div className="flex flex-1 flex-col gap-6">
        <SuppliersHeader
          title={data.title}
          subtitle={subtitle}
          onNewSupplier={newSupplier.onOpen}
        />
        <SupplierTabs
          value={tab}
          tabs={data.tabs}
          counts={counts}
          onValueChange={handleTabChange}
        />
        <Card className="flex flex-1 flex-col gap-6">
          {tab === 'approved' ? (
            <>
              <SuppliersToolbar
                search={search}
                onSearchChange={setSearch}
                onOpenFilter={filter.onOpen}
              />
              <SuppliersTable
                caption="Approved suppliers"
                suppliers={visibleSuppliers}
                onView={handleView}
              />
              {state.suppliers.length === 0 ? <SuppliersEmptyState /> : null}
            </>
          ) : tab === 'discovered' ? (
            <DiscoveredPanel onRefresh={handleRefresh} />
          ) : (
            <ReconcilePanel
              suppliers={state.suppliers}
              gaps={state.gaps}
              onMerge={handleMerge}
              onSaveVendorId={handleSaveVendorId}
            />
          )}
        </Card>
      </div>

      <NewOrderModal
        open={newOrder.open}
        onOpenChange={newOrder.onOpenChange}
        onCloseAutoFocus={newOrder.onCloseAutoFocus}
        onContinue={handleContinue}
      />
      <NewSupplierDialog
        open={newSupplier.open}
        onOpenChange={newSupplier.onOpenChange}
        onCloseAutoFocus={newSupplier.onCloseAutoFocus}
        onCreate={handleCreateSupplier}
      />
      <FilterDialog
        open={filter.open}
        onOpenChange={filter.onOpenChange}
        onCloseAutoFocus={filter.onCloseAutoFocus}
        options={data.filters}
        onApply={handleApplyFilters}
      />
      <SupplierDetailDialog
        open={detail.open}
        onOpenChange={detail.onOpenChange}
        onCloseAutoFocus={detail.onCloseAutoFocus}
        supplier={selectedSupplier}
        onSave={handleSaveSupplier}
      />
    </AppLayout>
  );
}
