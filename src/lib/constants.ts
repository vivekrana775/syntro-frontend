export const ROUTES = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  dashboard: '/dashboard',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
