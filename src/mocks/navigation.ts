import { ROUTES } from '@/lib/constants';
import type { NavEntry } from '@/types';

export const navigation: NavEntry[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'menu', to: ROUTES.dashboard },
  {
    id: 'workflow',
    label: 'Workflow',
    icon: 'work',
    defaultOpen: true,
    children: [
      { id: 'quotes', label: 'Quotes', icon: 'sort' },
      {
        id: 'purchase-orders',
        label: 'Purchase Orders',
        icon: 'arrow-swap',
        to: ROUTES.purchaseOrders,
      },
      { id: 'build-plan', label: 'Build Plan', icon: 'note' },
    ],
  },
  {
    id: 'review',
    label: 'Review',
    icon: 'edit',
    children: [
      { id: 'action-queue', label: 'Action Queue', icon: 'note', to: ROUTES.actionQueue },
      { id: 'sources', label: 'Sources', icon: 'arrow-swap', to: ROUTES.sources },
    ],
  },
  {
    id: 'library',
    label: 'Library',
    icon: 'document',
    children: [
      { id: 'bom', label: 'BOM', icon: 'sort', to: ROUTES.bom },
      { id: 'parts', label: 'Parts', icon: 'arrow-swap' },
      { id: 'suppliers', label: 'Suppliers', icon: 'note' },
      { id: 'knowledge', label: 'Knowledge', icon: 'rotate-right' },
    ],
  },
  { id: 'insights', label: 'Insights', icon: 'status', children: [] },
];
