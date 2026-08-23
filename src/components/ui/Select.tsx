import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';

import * as SelectPrimitive from '@radix-ui/react-select';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

import { Icon } from './Icon';

export interface SelectOption {
  value: string;
  label: string;
}

const triggerVariants = cva(
  'flex w-full items-center rounded-lg border border-subtle bg-transparent text-left font-sans text-graphite transition-colors disabled:opacity-40 [&>span:first-child]:min-w-0 [&>span:first-child]:flex-1 [&>span:first-child]:truncate [&>span:first-child]:px-4',
  {
    variants: {
      size: {
        // Map Columns field selects (1:24117): 48px, Inter 16, placeholder at 60%
        md: 'h-12 text-base data-[placeholder]:text-graphite/60',
        lg: 'h-14 text-lg data-[placeholder]:text-graphite/40',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
);

const addonVariants = cva(
  'flex shrink-0 items-center justify-center border-l border-subtle text-graphite',
  {
    variants: {
      size: {
        md: 'size-12',
        lg: 'size-14',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
);

export interface SelectProps
  extends
    Omit<ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, 'children'>,
    VariantProps<typeof triggerVariants> {
  id?: string;
  options: readonly SelectOption[];
  placeholder?: string;
  className?: string;
}

/** Input-styled select (1:2424). Pass `value=""` to show the placeholder again (e.g. on reset). */
export const Select = forwardRef<ElementRef<typeof SelectPrimitive.Trigger>, SelectProps>(
  function Select({ id, options, placeholder = 'Select', size, className, ...rest }, ref) {
    return (
      <SelectPrimitive.Root {...rest}>
        <SelectPrimitive.Trigger
          ref={ref}
          id={id}
          className={cn(triggerVariants({ size }), className)}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <span className={addonVariants({ size })}>
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
