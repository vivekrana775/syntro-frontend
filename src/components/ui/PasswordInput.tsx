import { forwardRef, useState } from 'react';

import { cn } from '@/lib/cn';

import { Icon } from './Icon';
import { Input, type InputProps } from './Input';

export type PasswordInputProps = Omit<InputProps, 'type' | 'trailingAddon'>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ className, ...rest }, ref) {
    const [visible, setVisible] = useState(false);

    return (
      <Input
        ref={ref}
        type={visible ? 'text' : 'password'}
        className={cn('pr-3', className)}
        trailingAddon={
          <button
            type="button"
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
            onClick={() => {
              setVisible((v) => !v);
            }}
            className="flex size-full items-center justify-center text-graphite transition-colors hover:bg-paper"
          >
            <Icon name="eye" size={20} className={cn(visible && 'opacity-50')} />
          </button>
        }
        {...rest}
      />
    );
  },
);
