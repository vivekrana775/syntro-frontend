import { Icon, IconButton } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { TrackerRow } from '@/types';

import { OwnerPill } from './OwnerPill';
import { StatusPill } from './StatusPill';

export interface TrackerTableProps {
  /** Visually hidden table caption, e.g. "Pending purchase orders". */
  caption: string;
  rows: TrackerRow[];
  onView: (id: string) => void;
}

const COLUMNS = [
  { key: 'number', label: 'PO #', width: 'w-col-po' },
  { key: 'supplier', label: 'Supplier', width: 'w-col-supplier' },
  { key: 'status', label: 'Status', width: 'w-col-status' },
  { key: 'promised', label: 'Promised', width: 'w-col-promised' },
  { key: 'total', label: 'Total', width: 'w-col-total' },
  { key: 'owner', label: 'Owner', width: 'w-col-owner' },
  { key: 'actions', label: 'Actions', width: undefined },
] as const;

// Header cells carry the bordered pill (1:20402); their text sits at x17, body text at x18.
const headerCell =
  'h-14 border-y border-subtle pl-4.25 text-left font-sans text-base font-medium text-graphite';
const bodyCell =
  'h-14 border-b border-subtle pl-4.5 font-sans text-base text-graphite/60 group-last:border-b-0';

/** Tracker table (1:20401): bordered header row, 56px rows divided by hairlines. */
export function TrackerTable({ caption, rows, onView }: TrackerTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-po-table table-fixed border-separate border-spacing-0">
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
                  index === 0 && 'rounded-l-lg border-l pl-4',
                  index === COLUMNS.length - 1 && 'rounded-r-lg border-r pl-0 pr-4 text-right',
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="group">
              <td className={cn(bodyCell, 'truncate')}>{row.number}</td>
              <td className={cn(bodyCell, 'truncate')}>{row.supplier}</td>
              <td className={bodyCell}>
                <StatusPill status={row.status} />
              </td>
              <td className={cn(bodyCell, 'truncate')}>{row.promised}</td>
              <td className={cn(bodyCell, 'truncate')}>{row.total}</td>
              <td className={bodyCell}>
                <OwnerPill owner={row.owner} />
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
