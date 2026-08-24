import { useState, type KeyboardEvent } from 'react';

import { Chip } from '@/components/ui';
import { cn } from '@/lib/cn';

export interface TagInputProps {
  id?: string;
  /** Accessible name for the text entry, e.g. "Add a tag". */
  label: string;
  placeholder?: string;
  value: readonly string[];
  onValueChange: (value: string[]) => void;
}

/**
 * Input-chromed tag field (1:25658 empty, 1:26160 with a chip and typed text):
 * committed tags render as removable chips; Enter commits the typed text, Backspace
 * on an empty entry removes the last chip.
 */
export function TagInput({ id, label, placeholder, value, onValueChange }: TagInputProps) {
  const [draft, setDraft] = useState('');

  const commit = () => {
    const tag = draft.trim();
    if (!tag) return;
    if (!value.includes(tag)) onValueChange([...value, tag]);
    setDraft('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      commit();
    }
    if (event.key === 'Backspace' && draft === '' && value.length > 0) {
      onValueChange(value.slice(0, -1));
    }
  };

  return (
    <div
      className={cn(
        'flex h-14 w-full items-center rounded-lg border border-subtle bg-transparent transition-colors',
        'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-vermilion has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-page',
        value.length > 0 && 'pl-2',
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto">
        {value.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onRemove={() => {
              onValueChange(value.filter((item) => item !== tag));
            }}
          />
        ))}
        <input
          id={id}
          aria-label={label}
          placeholder={value.length === 0 ? placeholder : undefined}
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
          }}
          onKeyDown={handleKeyDown}
          onBlur={commit}
          className={cn(
            'h-full min-w-0 flex-1 bg-transparent font-sans text-lg text-graphite outline-none placeholder:text-graphite/40 focus-visible:ring-0',
            value.length === 0 ? 'px-4' : 'pr-4',
          )}
        />
      </div>
    </div>
  );
}
