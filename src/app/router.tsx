import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTE_PATTERNS, ROUTES } from '@/lib/constants';
import { ActionQueuePage } from '@/pages/action-queue';
import { AnalyticsPage } from '@/pages/analytics';
import { BomDetailPage, BomLibraryPage } from '@/pages/bom';
import { DashboardPage } from '@/pages/dashboard';
import { KnowledgePage } from '@/pages/knowledge';
import { PartsPage } from '@/pages/parts';
import { PurchaseOrdersPage } from '@/pages/purchase-orders';
import { SignInPage } from '@/pages/sign-in';
import { SignUpPage } from '@/pages/sign-up';
import { SourcesPage } from '@/pages/sources';
import { SuppliersPage } from '@/pages/suppliers';

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
  { path: ROUTES.parts, element: <PartsPage /> },
  { path: ROUTES.suppliers, element: <Navigate to={ROUTES.suppliersApproved} replace /> },
  { path: ROUTES.suppliersApproved, element: <SuppliersPage tab="approved" /> },
  { path: ROUTES.suppliersDiscovered, element: <SuppliersPage tab="discovered" /> },
  { path: ROUTES.suppliersReconcile, element: <SuppliersPage tab="reconcile" /> },
  { path: ROUTES.knowledge, element: <KnowledgePage /> },
  { path: ROUTES.insights, element: <Navigate to={ROUTES.analytics} replace /> },
  { path: ROUTES.analytics, element: <AnalyticsPage /> },
  { path: '*', element: <Navigate to={ROUTES.signIn} replace /> },
]);
