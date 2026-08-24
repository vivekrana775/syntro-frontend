import { Icon, IconButton } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { Part } from '@/types';

export interface PartsLibraryTableProps {
  /** Visually hidden table caption, e.g. "Parts". */
  caption: string;
  parts: readonly Part[];
  onView: (id: string) => void;
}

const COLUMNS = [
  { key: 'number', label: 'Part', width: 'w-col-part-number' },
  { key: 'description', label: 'Description', width: 'w-col-part-description' },
  { key: 'supplier', label: 'Last Supplier', width: 'w-col-part-supplier' },
  { key: 'paid', label: 'Last Paid', width: 'w-col-part-paid' },
  { key: 'actions', label: 'Actions', width: undefined },
] as const;

// Header cells carry the bordered pill (1:20920); this frame draws header and body text on the same x18.
const headerCell =
  'h-14 border-y border-subtle pl-4.5 text-left font-sans text-base font-medium text-graphite';
const bodyCell =
  'h-14 border-b border-subtle pl-4.5 font-sans text-base text-graphite/60 group-last:border-b-0';

/** Parts library table (1:20919): bordered header row, 56px rows divided by hairlines, eye actions. */
export function PartsLibraryTable({ caption, parts, onView }: PartsLibraryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-part-table table-fixed border-separate border-spacing-0">
        <caption className="sr-only">{caption}</caption>
        <colgroup>
          {COLUMNS.map((column) => (
            <col key={column.key} className={column.width} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {COLUMNS.map((column, index) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  headerCell,
                  index === 0 && 'rounded-l-lg border-l pl-4.25',
                  index === COLUMNS.length - 1 && 'rounded-r-lg border-r',
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.id} className="group">
              <td className={cn(bodyCell, 'truncate')}>{part.number}</td>
              <td className={cn(bodyCell, 'truncate')}>{part.description}</td>
              <td className={cn(bodyCell, 'truncate')}>{part.lastSupplier}</td>
              <td className={cn(bodyCell, 'truncate')}>{part.lastPaidLabel}</td>
              <td className={bodyCell}>
                <IconButton
                  variant="surface"
                  size={32}
                  aria-label={`View ${part.number}`}
                  onClick={() => {
                    onView(part.id);
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
