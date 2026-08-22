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
      { id: 'purchase-orders', label: 'Purchase Orders', icon: 'arrow-swap' },
      { id: 'build-plan', label: 'Build Plan', icon: 'note' },
    ],
  },
  { id: 'review', label: 'Review', icon: 'edit', children: [] },
  { id: 'library', label: 'Library', icon: 'document', children: [] },
  { id: 'insights', label: 'Insights', icon: 'status', children: [] },
];
