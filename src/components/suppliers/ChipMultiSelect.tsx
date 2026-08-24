import {
  Chip,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
} from '@/components/ui';

export interface ChipMultiSelectProps {
  /** id for the option-menu trigger so a `Label` can point at the field. */
  id?: string;
  /** Accessible name for the option menu, e.g. "Status options". */
  label: string;
  options: readonly string[];
  value: readonly string[];
  onValueChange: (value: string[]) => void;
}

/**
 * Input-chromed multi-select (1:22341): selected values as removable chips, with a bordered
 * 56px chevron addon that opens the option menu (the menu itself is not designed in Figma).
 */
export function ChipMultiSelect({
  id,
  label,
  options,
  value,
  onValueChange,
}: ChipMultiSelectProps) {
  const toggle = (option: string) => {
    onValueChange(
      value.includes(option) ? value.filter((item) => item !== option) : [...value, option],
    );
  };

  return (
    <div className="flex h-14 w-full items-center rounded-lg border border-subtle bg-transparent">
      <div className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto pl-2 pr-4">
        {value.map((item) => (
          <Chip
            key={item}
            label={item}
            onRemove={() => {
              toggle(item);
            }}
          />
        ))}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          id={id}
          aria-label={label}
          className="flex size-14 shrink-0 items-center justify-center border-l border-subtle text-graphite outline-none focus-visible:ring-2 focus-visible:ring-vermilion"
        >
          <Icon name="arrow-bottom" size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options.map((option) => (
            <DropdownMenuItem
              key={option}
              icon={value.includes(option) ? 'check' : undefined}
              onSelect={(event) => {
                // Keep the menu open so several options can be toggled in one visit.
                event.preventDefault();
                toggle(option);
              }}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
