import { useNavigate } from 'react-router-dom';

import { AuthPanel } from '@/components/auth';
import { DashboardPreview } from '@/components/dashboard';
import { AuthLayout } from '@/components/layout';
import { ROUTES } from '@/lib/constants';
import { currentUser, dashboard, navigation } from '@/mocks';
import type { AuthMode, SignInValues, SignUpValues, SocialProvider } from '@/types';

export function SignUpPage() {
  const navigate = useNavigate();

  const handleModeChange = (mode: AuthMode) => {
    navigate(mode === 'sign-in' ? ROUTES.signIn : ROUTES.signUp);
  };

  const handleSubmit = (values: SignInValues | SignUpValues) => {
    // TODO(api): create the account; navigation stays so the UI is walkable.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('sign-up', values);
    navigate(ROUTES.dashboard);
  };

  const handleSocial = (provider: SocialProvider) => {
    // TODO(api): start the OAuth flow for the provider.
    // eslint-disable-next-line no-console -- placeholder until the API is wired
    console.log('social sign-up', provider);
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
        mode="sign-up"
        onModeChange={handleModeChange}
        onSubmit={handleSubmit}
        onSocial={handleSocial}
        onForgotPassword={handleForgotPassword}
      />
    </AuthLayout>
  );
}
