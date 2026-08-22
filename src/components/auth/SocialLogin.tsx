import AppleIcon from '@/assets/icons/brand/apple.svg?react';
import FacebookIcon from '@/assets/icons/brand/facebook.svg?react';
import GoogleIcon from '@/assets/icons/brand/google.svg?react';
import { Divider, IconButton } from '@/components/ui';
import type { SocialProvider } from '@/types';

export interface SocialLoginProps {
  onSelect: (provider: SocialProvider) => void;
}

/** "Or Continue With" divider + the three 56px provider buttons (1:2822, 1:2826). */
export function SocialLogin({ onSelect }: SocialLoginProps) {
  return (
    <>
      <div className="flex w-full items-center gap-6">
        <Divider className="flex-1" />
        <span className="whitespace-nowrap font-sans text-base text-graphite/60">
          Or Continue With
        </span>
        <Divider className="flex-1" />
      </div>
      <div className="flex items-center gap-4">
        <IconButton
          variant="outline"
          size={56}
          aria-label="Continue with Google"
          onClick={() => {
            onSelect('google');
          }}
        >
          <GoogleIcon aria-hidden focusable="false" className="h-6 w-[23.45px]" />
        </IconButton>
        <IconButton
          variant="graphite"
          size={56}
          aria-label="Continue with Apple"
          onClick={() => {
            onSelect('apple');
          }}
        >
          <AppleIcon aria-hidden focusable="false" className="size-6" />
        </IconButton>
        <IconButton
          variant="facebook"
          size={56}
          aria-label="Continue with Facebook"
          onClick={() => {
            onSelect('facebook');
          }}
        >
          <FacebookIcon aria-hidden focusable="false" className="size-6" />
        </IconButton>
      </div>
    </>
  );
}
