import type { ReactNode } from 'react';

import { AuthPromoPanel } from './AuthPromoPanel';

export interface AuthLayoutProps {
  /** Artwork for the promo panel; supplied by the page so layouts stay data-agnostic. */
  preview?: ReactNode;
  children: ReactNode;
}

/** Two-panel auth shell (1:2465): paper form card + vermilion promo panel on a surface canvas. */
export function AuthLayout({ preview, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-stretch justify-center gap-6 bg-canvas p-6">
      {/* px-[150px] is a one-off from Figma (form column 500px inside an 800px card). */}
      <section className="flex min-h-auth-panel w-full max-w-auth-card flex-col items-center justify-between rounded-2xl bg-paper px-6 py-10 shadow-card sm:px-12 xl:px-[150px]">
        {children}
      </section>
      <AuthPromoPanel preview={preview} className="hidden xl:flex" />
    </div>
  );
}
