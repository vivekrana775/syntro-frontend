import type { FormEvent } from 'react';

import { Button, FormField, Input, PasswordInput } from '@/components/ui';
import type { AuthMode, SignInValues, SignUpValues } from '@/types';

export interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (values: SignInValues | SignUpValues) => void;
  onForgotPassword?: () => void;
}

const field = (data: FormData, name: string) => {
  const value = data.get(name);
  return typeof value === 'string' ? value : '';
};

/** Email/password (+ name on sign-up) form (1:2803, 1:3169). Submit text is "Login" on both screens. */
export function AuthForm({ mode, onSubmit, onForgotPassword }: AuthFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const base: SignInValues = { email: field(data, 'email'), password: field(data, 'password') };
    onSubmit(mode === 'sign-up' ? { ...base, name: field(data, 'name') } : base);
  };

  return (
    <form className="flex w-full flex-col gap-7" onSubmit={handleSubmit} noValidate>
      <div className="flex w-full flex-col gap-4">
        {mode === 'sign-up' ? (
          <FormField label="Name" htmlFor="auth-name">
            <Input id="auth-name" name="name" autoComplete="name" placeholder="Enter your name" />
          </FormField>
        ) : null}
        <FormField label="Email" htmlFor="auth-email">
          <Input
            id="auth-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
          />
        </FormField>
        <FormField
          label="Password"
          htmlFor="auth-password"
          footer={
            mode === 'sign-in' ? (
              <button
                type="button"
                className="self-start rounded-sm font-sans text-base text-slate transition-colors hover:text-graphite"
                onClick={onForgotPassword}
              >
                Forgot Password?
              </button>
            ) : null
          }
        >
          <PasswordInput
            id="auth-password"
            name="password"
            autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'}
            placeholder="Enter your password"
          />
        </FormField>
      </div>
      <Button type="submit" variant="primary" size="lg" fullWidth>
        Login
      </Button>
    </form>
  );
}
