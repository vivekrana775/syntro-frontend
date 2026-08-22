export type AuthMode = 'sign-in' | 'sign-up';

export interface SignInValues {
  email: string;
  password: string;
}

export interface SignUpValues extends SignInValues {
  name: string;
}

export type SocialProvider = 'google' | 'apple' | 'facebook';

export type NewOrderKind = 'plan-build' | 'one-off-rfq';
