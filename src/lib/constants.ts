import type { ActionQueueTab, SourceTab } from '@/types';

export const ROUTES = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  dashboard: '/dashboard',
  purchaseOrders: '/purchase-orders',
  purchaseOrdersWatchlist: '/purchase-orders/watchlist',
  purchaseOrdersTracker: '/purchase-orders/tracker',
  actionQueue: '/review/action-queue',
  sources: '/review/sources',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

/** Parameterised patterns registered with the router; build concrete hrefs with the helpers below. */
export const ROUTE_PATTERNS = {
  actionQueueItem: `${ROUTES.actionQueue}/:itemId`,
  source: `${ROUTES.sources}/:sourceId`,
} as const;

/** Query parameter that carries the active pill tab on list screens. */
export const TAB_PARAM = 'tab';

const withTab = (path: string, tab?: string) => (tab ? `${path}?${TAB_PARAM}=${tab}` : path);

export const actionQueuePath = (tab?: ActionQueueTab) => withTab(ROUTES.actionQueue, tab);

export const actionQueueItemPath = (id: string) =>
  `${ROUTES.actionQueue}/${encodeURIComponent(id)}`;

export const sourcesPath = (tab?: SourceTab) => withTab(ROUTES.sources, tab);

export const sourcePath = (id: string) => `${ROUTES.sources}/${encodeURIComponent(id)}`;
