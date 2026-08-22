import type { ReactNode } from 'react';

import { AuthPromoPanel } from './AuthPromoPanel';

export interface AuthLayoutProps {
  /** Artwork for the promo panel; supplied by the page so layouts stay data-agnostic. */
  preview?: ReactNode;
  children: ReactNode;
}

/**
 * Two-panel auth shell (1:2465): paper form card + vermilion promo panel on a surface canvas.
 * Both panels fill the viewport height and share the width in Figma's 800:568 ratio, so a
 * 1440×1024 viewport reproduces the frame exactly and wider screens keep the same proportions.
 */
export function AuthLayout({ preview, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-stretch gap-6 bg-canvas p-6">
      {/* px-[150px] is a one-off from Figma (form column 500px inside an 800px card); below 1440 the padding relaxes so the 500px form keeps its width. */}
      <section className="flex min-w-0 flex-1 flex-col items-center justify-between rounded-2xl bg-paper px-6 py-10 shadow-card sm:px-12 xl:flex-[800_1_800px] 2xl:px-[150px]">
        {children}
      </section>
      <AuthPromoPanel preview={preview} className="hidden xl:flex xl:flex-[568_1_568px]" />
    </div>
  );
}
