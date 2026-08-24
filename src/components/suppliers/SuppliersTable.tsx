import { Badge, Icon, IconButton } from '@/components/ui';
import { cn } from '@/lib/cn';
import { SUPPLIER_STATUS, type Supplier } from '@/types';

export interface SuppliersTableProps {
  /** Visually hidden table caption, e.g. "Approved suppliers". */
  caption: string;
  suppliers: readonly Supplier[];
  onView: (id: string) => void;
}

const COLUMNS = [
  { key: 'supplier', label: 'Supplier', width: 'w-col-sup-name' },
  { key: 'email', label: 'Primary Email', width: 'w-col-sup-email' },
  { key: 'hq', label: 'HQ', width: 'w-col-sup-hq' },
  { key: 'status', label: 'Status', width: 'w-col-sup-status' },
  { key: 'notes', label: 'Notes', width: 'w-col-sup-notes' },
  { key: 'actions', label: 'Actions', width: undefined },
] as const;

// Header cells carry the bordered pill (1:21812); their text sits at x17, body text at x18.
const headerCell =
  'h-14 border-y border-subtle pl-4.25 text-left font-sans text-base font-medium text-graphite';
const bodyCell =
  'h-21 border-b border-subtle pl-4.5 font-sans text-base text-graphite/60 group-last:border-b-0';

/** Approved table (1:21811): bordered header row, 84px rows divided by hairlines. */
export function SuppliersTable({ caption, suppliers, onView }: SuppliersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-sup-table table-fixed border-separate border-spacing-0">
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
                  index === COLUMNS.length - 1 && 'rounded-r-lg border-r',
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="group">
              <td className={cn(bodyCell, 'pr-4')}>
                <div className="flex flex-col gap-1.5">
                  <span className="truncate font-display font-medium text-umber">
                    {supplier.name}
                  </span>
                  <span className="truncate font-sans text-sm text-graphite/40">
                    {supplier.subName}
                  </span>
                </div>
              </td>
              <td className={cn(bodyCell, 'truncate')}>{supplier.email}</td>
              <td className={cn(bodyCell, 'truncate')}>{supplier.hq}</td>
              <td className={bodyCell}>
                <Badge tone={SUPPLIER_STATUS[supplier.status].tone} dot={false}>
                  {SUPPLIER_STATUS[supplier.status].label}
                </Badge>
              </td>
              <td className={cn(bodyCell, 'truncate')}>{supplier.notes}</td>
              <td className={bodyCell}>
                <IconButton
                  variant="surface"
                  size={32}
                  aria-label={`View ${supplier.name}`}
                  onClick={() => {
                    onView(supplier.id);
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
