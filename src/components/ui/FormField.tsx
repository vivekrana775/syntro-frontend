import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/lib/cn';

import { Label } from './Label';

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  /** id of the control inside the field. */
  htmlFor: string;
  /** Optional row rendered 8px below the control (e.g. "Forgot Password?"). */
  footer?: ReactNode;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  { label, htmlFor, footer, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn('flex w-full flex-col gap-2', className)} {...rest}>
      <div className="flex w-full flex-col gap-3">
        <Label htmlFor={htmlFor}>{label}</Label>
        {children}
      </div>
      {footer}
    </div>
  );
});
