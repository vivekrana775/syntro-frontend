import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

import { Icon } from './Icon';
import { IconButton } from './IconButton';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

const dialogContentVariants = cva(
  'fixed left-1/2 top-1/2 z-modal flex max-h-[calc(100vh-48px)] w-[calc(100%-48px)] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 overflow-y-auto rounded-xl bg-white p-6 text-graphite outline-none',
  {
    variants: {
      size: {
        sm: 'max-w-modal-sm',
        md: 'max-w-modal-md',
        lg: 'max-w-modal-lg',
        xl: 'max-w-modal-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export interface DialogContentProps
  extends
    ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  /** Skip the scrim when stacking on another dialog so the backdrop is not darkened twice. */
  overlay?: boolean;
}

/** White 24px-radius panel over a 60% graphite overlay (1:1700). Focus trap, ESC and aria come from Radix. */
export const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent({ size, overlay = true, className, children, ...rest }, ref) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn('fixed inset-0 z-overlay', overlay ? 'bg-overlay' : 'bg-transparent')}
      />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(dialogContentVariants({ size }), className)}
        {...rest}
      >
        {children}
        <DialogPrimitive.Close asChild>
          <IconButton
            variant="plain"
            size={24}
            aria-label="Close"
            className="absolute right-6 top-6 rounded-sm"
          >
            <Icon name="close" />
          </IconButton>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

export type DialogHeaderProps = HTMLAttributes<HTMLDivElement>;

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(function DialogHeader(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cn('flex flex-col gap-2 pr-10', className)} {...rest} />;
});

export const DialogTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn('font-display text-xl font-semibold text-graphite', className)}
      {...rest}
    />
  );
});

export const DialogDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(function DialogDescription({ className, ...rest }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn('font-sans text-base text-graphite/60', className)}
      {...rest}
    />
  );
});

export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(function DialogFooter(
  { className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn('flex items-center justify-center gap-3', className)} {...rest} />
  );
});
