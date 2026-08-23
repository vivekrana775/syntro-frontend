import { Checkbox, Icon, IconButton } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { BomTableRow } from '@/types';

export interface PartsTableProps {
  /** Visually hidden table caption, e.g. "ROBOT-100 — EVT build parts". */
  caption: string;
  rows: readonly BomTableRow[];
  selected: ReadonlySet<string>;
  onToggle: (id: string) => void;
  onToggleAll: (checked: boolean) => void;
  onView: (id: string) => void;
}

const COLUMNS = [
  { key: 'select', label: null, width: 'w-col-parts-select' },
  { key: 'part', label: 'Part', width: 'w-col-parts-part' },
  { key: 'rev', label: 'Rev', width: 'w-col-parts-rev' },
  { key: 'category', label: 'Category', width: 'w-col-parts-category' },
  { key: 'type', label: 'Type', width: 'w-col-parts-type' },
  { key: 'description', label: 'Description', width: 'w-col-parts-description' },
  { key: 'demand', label: 'Demand', width: 'w-col-parts-demand' },
  { key: 'actions', label: 'Actions', width: undefined },
] as const;

// The box draws its 1px stroke inside (1:19709); cells pad 17px so content lands on Figma's x18 / x52.
const headerCell =
  'h-14 border-b border-subtle pl-4.25 text-left font-sans text-base font-medium text-graphite';
const bodyCell =
  'h-14 border-b border-subtle pl-4.25 font-sans text-base text-graphite/60 group-last:border-b-0';

/** Parts table (1:19709) inside the 582px scroll box: selectable 56px rows divided by hairlines. */
export function PartsTable({
  caption,
  rows,
  selected,
  onToggle,
  onToggleAll,
  onView,
}: PartsTableProps) {
  const allSelected = rows.length > 0 && rows.every((row) => selected.has(row.id));

  return (
    <div className="scrollbar-slate h-bom-tree overflow-auto rounded-lg border border-subtle">
      <table className="w-full min-w-bom-table table-fixed border-separate border-spacing-0">
        <caption className="sr-only">{caption}</caption>
        <colgroup>
          {COLUMNS.map((column) => (
            <col key={column.key} className={column.width} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th key={column.key} scope="col" className={headerCell}>
                {column.label ?? (
                  <Checkbox
                    aria-label="Select all parts"
                    checked={allSelected}
                    onChange={(event) => {
                      onToggleAll(event.target.checked);
                    }}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="group">
              <td className={bodyCell}>
                <Checkbox
                  aria-label={`Select ${row.number}`}
                  checked={selected.has(row.id)}
                  onChange={() => {
                    onToggle(row.id);
                  }}
                />
              </td>
              <td className={cn(bodyCell, 'truncate')}>{row.number}</td>
              <td className={cn(bodyCell, 'truncate')}>{row.rev}</td>
              <td className={cn(bodyCell, 'truncate')}>{row.category}</td>
              <td className={cn(bodyCell, 'truncate')}>{row.type}</td>
              <td className={cn(bodyCell, 'truncate')}>{row.description}</td>
              <td className={bodyCell}>
                <span className="flex items-center gap-1.25">
                  <span className="font-medium text-graphite">{row.demand.qty}</span>
                  <span>{row.demand.unit}</span>
                </span>
              </td>
              <td className={bodyCell}>
                <IconButton
                  variant="surface"
                  size={32}
                  aria-label={`View ${row.number}`}
                  onClick={() => {
                    onView(row.id);
                  }}
                >
                  <Icon name="eye" size={16} />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
