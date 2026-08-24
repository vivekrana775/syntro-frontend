import { useReducer, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { NewOrderModal } from '@/components/dashboard';
import { AppLayout, PageHeading } from '@/components/layout';
import {
  PartDetailDialog,
  PartsFilterDialog,
  PartsLibraryEmptyState,
  PartsLibraryTable,
  PartsLibraryToolbar,
} from '@/components/parts';
import { Card } from '@/components/ui';
import { useDisclosure } from '@/hooks';
import { currentUser, navigation, parts, suppliers } from '@/mocks';
import type { NewOrderKind, PartIncumbent, PurchaseHistoryFilter } from '@/types';

import { initialPartsState, partsReducer } from './partsReducer';

/**
 * Parts page (1:20800). `?empty` seeds the list empty to show the designed "No Parts Yet" view
 * (1:20638); the Filter (1:21680) and part detail (1:21214) dialogs open over the table.
 */
export function PartsPage() {
  const [params] = useSearchParams();
  const [state, dispatch] = useReducer(partsReducer, params.has('empty'), (empty: boolean) =>
    initialPartsState(parts, empty),
  );
  const [search, setSearch] = useState('');
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryFilter>('any');
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const newOrder = useDisclosure();
  const filter = useDisclosure();
  const detail = useDisclosure();

  const selectedPart =
    selectedPartId === null
      ? null
      : (state.parts.find((part) => part.id === selectedPartId) ?? null);

  // The incumbent form picks from the approved vendor list, where every designed vendor exists.
  const supplierOptions = suppliers.suppliers.map((supplier) => ({
    value: supplier.id,
    label: supplier.name,
  }));

  const query = search.trim().toLowerCase();
  const visibleParts = state.parts.filter((part) => {
    if (
      query &&
      ![part.number, part.description, part.lastSupplier].some((text) =>
        text.toLowerCase().includes(query),
      )
    ) {
      return false;
    }
    const hasHistory = part.purchases.length > 0;
    if (purchaseHistory === 'yes' && !hasHistory) return false;
    if (purchaseHistory === 'no' && hasHistory) return false;
    return true;
  });

  const handleContinue = (kind: NewOrderKind) => {
    // TODO(api): start the selected sourcing flow.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('new order', kind);
    newOrder.onClose();
  };

  const handleView = (id: string) => {
    setSelectedPartId(id);
    detail.onOpen();
  };

  const handleApplyFilter = (next: PurchaseHistoryFilter) => {
    setPurchaseHistory(next);
    filter.onClose();
  };

  const handleAssignIncumbent = (partId: string, incumbent: PartIncumbent) => {
    // TODO(api): persist the incumbent supplier against the part.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('assign incumbent', partId, incumbent.supplierId);
    dispatch({ type: 'part/assignIncumbent', id: partId, incumbent });
  };

  return (
    <AppLayout
      title={parts.title}
      user={currentUser}
      navigation={navigation}
      onNewOrder={newOrder.onOpen}
    >
      <div className="flex flex-1 flex-col gap-6">
        <PageHeading title={parts.title} subtitle={parts.subtitle} />
        <Card className="flex flex-1 flex-col gap-6">
          <PartsLibraryToolbar
            search={search}
            onSearchChange={setSearch}
            onOpenFilter={filter.onOpen}
          />
          <PartsLibraryTable caption="Parts" parts={visibleParts} onView={handleView} />
          {state.parts.length === 0 ? <PartsLibraryEmptyState /> : null}
        </Card>
      </div>

      <NewOrderModal
        open={newOrder.open}
        onOpenChange={newOrder.onOpenChange}
        onCloseAutoFocus={newOrder.onCloseAutoFocus}
        onContinue={handleContinue}
      />
      <PartsFilterDialog
        open={filter.open}
        onOpenChange={filter.onOpenChange}
        onCloseAutoFocus={filter.onCloseAutoFocus}
        value={purchaseHistory}
        onApply={handleApplyFilter}
      />
      <PartDetailDialog
        open={detail.open}
        onOpenChange={detail.onOpenChange}
        onCloseAutoFocus={detail.onCloseAutoFocus}
        part={selectedPart}
        supplierOptions={supplierOptions}
        onAssignIncumbent={handleAssignIncumbent}
      />
    </AppLayout>
  );
}
