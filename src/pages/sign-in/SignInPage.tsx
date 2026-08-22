import { useNavigate } from 'react-router-dom';

import { AuthPanel } from '@/components/auth';
import { DashboardPreview } from '@/components/dashboard';
import { AuthLayout } from '@/components/layout';
import { ROUTES } from '@/lib/constants';
import { currentUser, dashboard, navigation } from '@/mocks';
import type { AuthMode, SignInValues, SignUpValues, SocialProvider } from '@/types';

export function SignInPage() {
  const navigate = useNavigate();

  const handleModeChange = (mode: AuthMode) => {
    navigate(mode === 'sign-up' ? ROUTES.signUp : ROUTES.signIn);
  };

  const handleSubmit = (values: SignInValues | SignUpValues) => {
    // TODO(api): authenticate against the real endpoint; navigation stays so the UI is walkable.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('sign-in', values);
    navigate(ROUTES.dashboard);
  };

  const handleSocial = (provider: SocialProvider) => {
    // TODO(api): start the OAuth flow for the provider.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('social sign-in', provider);
  };

  const handleForgotPassword = () => {
    // TODO(api): route to the password-reset flow (not designed in Figma).
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('forgot password');
  };

  return (
    <AuthLayout
      preview={<DashboardPreview data={dashboard} navigation={navigation} user={currentUser} />}
    >
      <AuthPanel
        mode="sign-in"
        onModeChange={handleModeChange}
        onSubmit={handleSubmit}
        onSocial={handleSocial}
        onForgotPassword={handleForgotPassword}
      />
    </AuthLayout>
  );
}
