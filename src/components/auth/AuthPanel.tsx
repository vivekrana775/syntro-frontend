import { Logo, SegmentedControl } from '@/components/ui';
import type { AuthMode, SignInValues, SignUpValues, SocialProvider } from '@/types';

import { AuthFooter } from './AuthFooter';
import { AuthForm } from './AuthForm';
import { AuthHeading } from './AuthHeading';
import { SocialLogin } from './SocialLogin';

export interface AuthPanelProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onSubmit: (values: SignInValues | SignUpValues) => void;
  onSocial: (provider: SocialProvider) => void;
  onForgotPassword: () => void;
}

const copy: Record<AuthMode, { title: string; subtitle: string }> = {
  'sign-in': {
    title: 'Welcome Back',
    subtitle: 'Please enter your information to access your account.',
  },
  'sign-up': {
    title: 'Get Started New',
    subtitle: 'Enter your credentials to access your account.',
  },
};

const tabs = [
  { value: 'sign-in', label: 'Sign In' },
  { value: 'sign-up', label: 'Sign Up' },
] as const;

/** Contents of the paper auth card (1:2787): logo, heading, tabs, form, social row and footer. */
export function AuthPanel({
  mode,
  onModeChange,
  onSubmit,
  onSocial,
  onForgotPassword,
}: AuthPanelProps) {
  return (
    <>
      <Logo size="auth" />
      <div className="max-w-auth-form flex w-full flex-col items-center gap-7">
        <AuthHeading title={copy[mode].title} subtitle={copy[mode].subtitle} />
        <SegmentedControl
          aria-label="Sign in or sign up"
          options={tabs}
          value={mode}
          onValueChange={onModeChange}
        />
        <AuthForm mode={mode} onSubmit={onSubmit} onForgotPassword={onForgotPassword} />
        <SocialLogin onSelect={onSocial} />
      </div>
      <AuthFooter />
    </>
  );
}
