import type { ReconcileGap, Supplier, SuppliersData } from '@/types';

/** Suppliers page state: the vendor list and reconcile gaps live locally until the API is wired. */
export interface SuppliersState {
  suppliers: Supplier[];
  gaps: ReconcileGap[];
  /** Next local supplier id suffix; never reused so ids stay unique across the session. */
  seq: number;
}

export type SuppliersAction =
  | { type: 'supplier/create'; supplier: Supplier }
  | { type: 'supplier/update'; supplier: Supplier }
  | { type: 'gap/resolve'; id: string };

export const initialSuppliersState = (data: SuppliersData, empty: boolean): SuppliersState => ({
  // `empty` renders the designed "No Suppliers Yet" view (1:21926) from the same code path.
  suppliers: empty ? [] : [...data.suppliers],
  gaps: empty ? [] : [...data.gaps],
  seq: 1,
});

/** Id for the supplier that `supplier/create` will add next. */
export const nextSupplierId = (state: SuppliersState) => `sup-new-${String(state.seq)}`;

export function suppliersReducer(state: SuppliersState, action: SuppliersAction): SuppliersState {
  switch (action.type) {
    case 'supplier/create':
      return { ...state, suppliers: [...state.suppliers, action.supplier], seq: state.seq + 1 };
    case 'supplier/update':
      return {
        ...state,
        suppliers: state.suppliers.map((supplier) =>
          supplier.id === action.supplier.id ? action.supplier : supplier,
        ),
      };
    case 'gap/resolve':
      return { ...state, gaps: state.gaps.filter((gap) => gap.id !== action.id) };
  }
}
