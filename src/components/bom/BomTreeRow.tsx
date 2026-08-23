import { Badge, Checkbox, Icon, IconButton } from '@/components/ui';
import type { BomPart } from '@/types';

export interface BomTreeRowProps {
  part: BomPart;
  selected: boolean;
  onToggle: (id: string) => void;
  onView: (id: string) => void;
}

/** Child part row in the assembly tree (1:19471): surface card with number, revision, name and description. */
export function BomTreeRow({ part, selected, onToggle, onView }: BomTreeRowProps) {
  return (
    <div className="grid h-tree-row grid-cols-bom-child items-center rounded-md bg-surface pl-4 pr-6.75">
      <div className="flex min-w-0 items-center gap-4">
        <Checkbox
          aria-label={`Select ${part.number}`}
          checked={selected}
          onChange={() => {
            onToggle(part.id);
          }}
        />
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="truncate font-sans text-base text-graphite">{part.number}</span>
            {part.rev !== null ? (
              <Badge tone="outline-strong" size="md" dot={false}>
                {part.rev}
              </Badge>
            ) : null}
          </div>
          <span className="truncate font-display text-base text-graphite/60">{part.name}</span>
        </div>
      </div>
      <span className="truncate pr-4 font-sans text-base text-graphite/60">{part.description}</span>
      <IconButton
        variant="paper"
        size={32}
        aria-label={`View ${part.number}`}
        onClick={() => {
          onView(part.id);
        }}
      >
        <Icon name="eye" size={16} />
      </IconButton>
    </div>
  );
}
