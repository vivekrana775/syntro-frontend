import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTE_PATTERNS, ROUTES } from '@/lib/constants';
import { ActionQueuePage } from '@/pages/action-queue';
import { BomDetailPage, BomLibraryPage } from '@/pages/bom';
import { DashboardPage } from '@/pages/dashboard';
import { PurchaseOrdersPage } from '@/pages/purchase-orders';
import { SignInPage } from '@/pages/sign-in';
import { SignUpPage } from '@/pages/sign-up';
import { SourcesPage } from '@/pages/sources';

export const router = createBrowserRouter([
  { path: ROUTES.home, element: <Navigate to={ROUTES.signIn} replace /> },
  { path: ROUTES.signIn, element: <SignInPage /> },
  { path: ROUTES.signUp, element: <SignUpPage /> },
  { path: ROUTES.dashboard, element: <DashboardPage /> },
  {
    path: ROUTES.purchaseOrders,
    element: <Navigate to={ROUTES.purchaseOrdersWatchlist} replace />,
  },
  { path: ROUTES.purchaseOrdersWatchlist, element: <PurchaseOrdersPage tab="watchlist" /> },
  { path: ROUTES.purchaseOrdersTracker, element: <PurchaseOrdersPage tab="tracker" /> },
  { path: ROUTES.actionQueue, element: <ActionQueuePage /> },
  { path: ROUTE_PATTERNS.actionQueueItem, element: <ActionQueuePage /> },
  { path: ROUTES.sources, element: <SourcesPage /> },
  { path: ROUTE_PATTERNS.source, element: <SourcesPage /> },
  { path: ROUTES.library, element: <Navigate to={ROUTES.bom} replace /> },
  { path: ROUTES.bom, element: <BomLibraryPage /> },
  { path: ROUTE_PATTERNS.bomDetail, element: <BomDetailPage /> },
  { path: '*', element: <Navigate to={ROUTES.signIn} replace /> },
]);
