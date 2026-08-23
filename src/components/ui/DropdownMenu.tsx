import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '@/lib/cn';
import type { IconName } from '@/types';

import { Icon } from './Icon';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export type DropdownMenuContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>;

/** Paper menu panel (1:18889): 264 wide, 24px radius, 16px padding, soft 12px shadow. Roving focus, typeahead and dismissal come from Radix. */
export const DropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(function DropdownMenuContent(
  { align = 'end', sideOffset = 8, collisionPadding = 24, className, ...rest },
  ref,
) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          'z-modal flex w-menu flex-col rounded-xl bg-paper p-4 shadow-menu outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
          className,
        )}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  );
});

export interface DropdownMenuItemProps extends ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> {
  /** 20px leading glyph (1:18891). */
  icon?: IconName;
}

/** 56px menu row (1:18890): Manrope 18, highlighted rows fill with surface. */
export const DropdownMenuItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(function DropdownMenuItem({ icon, className, children, ...rest }, ref) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        'flex h-14 w-full cursor-pointer select-none items-center gap-3 rounded-lg p-4 font-display text-lg text-graphite outline-none transition-colors data-[highlighted]:bg-surface',
        className,
      )}
      {...rest}
    >
      {icon ? <Icon name={icon} size={20} /> : null}
      {children}
    </DropdownMenuPrimitive.Item>
  );
});
