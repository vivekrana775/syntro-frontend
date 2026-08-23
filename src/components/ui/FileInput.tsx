import { forwardRef, type ChangeEvent, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

import { Icon } from './Icon';

export interface FileInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'onChange'
> {
  id: string;
  /** Shown while no file is chosen ("Choose CSV or XLSX..."). */
  placeholder: string;
  /** Name of the chosen file, or `null` to show the placeholder. */
  fileName: string | null;
  onFileChange: (file: File | null) => void;
  /** Classes for the outer field box; `className` targets the hidden native input. */
  fieldClassName?: string;
}

/**
 * File picker drawn as an `Input` with an upload addon (1:23867). The native input is visually
 * hidden but stays focusable, so Enter/Space open the picker and the ring shows on the box.
 */
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
  { id, placeholder, fileName, onFileChange, fieldClassName, className, ...rest },
  ref,
) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onFileChange(event.target.files?.[0] ?? null);
  };

  return (
    <label
      htmlFor={id}
      className={cn(
        'flex h-14 w-full cursor-pointer items-center rounded-lg border border-subtle bg-transparent transition-colors',
        'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-vermilion has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-page',
        'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-40',
        fieldClassName,
      )}
    >
      <input
        ref={ref}
        id={id}
        type="file"
        className={cn('sr-only', className)}
        onChange={handleChange}
        {...rest}
      />
      <span
        className={cn(
          'min-w-0 flex-1 truncate px-4 font-sans text-lg',
          fileName === null ? 'text-graphite/40' : 'text-graphite',
        )}
      >
        {fileName ?? placeholder}
      </span>
      <span className="flex size-14 shrink-0 items-center justify-center border-l border-subtle text-graphite">
        <Icon name="upload" size={20} />
      </span>
    </label>
  );
});
