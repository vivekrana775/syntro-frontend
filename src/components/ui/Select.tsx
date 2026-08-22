import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '@/lib/cn';

import { Icon } from './Icon';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<
  ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
  'children'
> {
  id?: string;
  options: readonly SelectOption[];
  placeholder?: string;
  className?: string;
}

/** Input-styled select (1:2424). Pass `value=""` to show the placeholder again (e.g. on reset). */
export const Select = forwardRef<ElementRef<typeof SelectPrimitive.Trigger>, SelectProps>(
  function Select({ id, options, placeholder = 'Select', className, ...rest }, ref) {
    return (
      <SelectPrimitive.Root {...rest}>
        <SelectPrimitive.Trigger
          ref={ref}
          id={id}
          className={cn(
            'flex h-14 w-full items-center rounded-lg border border-subtle bg-transparent text-left font-sans text-lg text-graphite transition-colors',
            'disabled:opacity-40 data-[placeholder]:text-graphite/40',
            '[&>span:first-child]:min-w-0 [&>span:first-child]:flex-1 [&>span:first-child]:truncate [&>span:first-child]:px-4',
            className,
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <span className="flex size-14 shrink-0 items-center justify-center border-l border-subtle text-graphite">
              <Icon name="arrow-bottom" size={20} />
            </span>
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={8}
            className="z-modal w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-subtle bg-white p-1 shadow-card"
          >
            {/* The dropdown menu itself is not designed in Figma; it reuses the input chrome. */}
            <SelectPrimitive.Viewport>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className="flex h-12 cursor-pointer select-none items-center rounded-md px-4 font-sans text-base text-graphite outline-none data-[highlighted]:bg-paper data-[state=checked]:font-medium"
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  },
);
