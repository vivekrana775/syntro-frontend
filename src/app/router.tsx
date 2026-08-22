import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from '@/lib/constants';
import { DashboardPage } from '@/pages/dashboard';
import { SignInPage } from '@/pages/sign-in';
import { SignUpPage } from '@/pages/sign-up';

export const router = createBrowserRouter([
  { path: ROUTES.home, element: <Navigate to={ROUTES.signIn} replace /> },
  { path: ROUTES.signIn, element: <SignInPage /> },
  { path: ROUTES.signUp, element: <SignUpPage /> },
  { path: ROUTES.dashboard, element: <DashboardPage /> },
  { path: '*', element: <Navigate to={ROUTES.signIn} replace /> },
]);
