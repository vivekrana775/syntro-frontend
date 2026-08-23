import { Icon, Select } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { ColumnMapping, SyntroField } from '@/types';

export interface MapColumnsTableProps {
  rows: readonly ColumnMapping[];
  /** Current field per row id; falls back to the row's proposed `syntroField`. */
  values: Readonly<Record<string, string>>;
  fields: readonly SyntroField[];
  onChange: (rowId: string, field: string) => void;
}

const COLUMNS = [
  { key: 'theirs', label: 'Their Column', width: 'w-col-map-theirs' },
  { key: 'sample', label: 'Their First Row', width: 'w-col-map-sample' },
  { key: 'field', label: 'Syntro Field', width: undefined },
] as const;

// Figma also draws an "Actions" column with eye buttons at x960, clipped outside the 952px box; it is not rendered.
const headerCell =
  'h-14 border-b border-subtle pl-4.25 text-left font-sans text-base font-medium text-graphite';
const bodyCell = 'h-18 pl-4.25 font-sans text-base';

/** Column mapping table (1:24104): 72px rows, flagged columns carry the alert glyph. */
export function MapColumnsTable({ rows, values, fields, onChange }: MapColumnsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-subtle">
      <table className="w-full min-w-map-table table-fixed border-separate border-spacing-0">
        <caption className="sr-only">Spreadsheet columns mapped to Syntro fields</caption>
        <colgroup>
          {COLUMNS.map((column) => (
            <col key={column.key} className={column.width} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th key={column.key} scope="col" className={headerCell}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className={cn(bodyCell, 'text-graphite')}>
                <div className="flex items-center gap-2">
                  <span className="truncate">{row.theirColumn}</span>
                  {row.flagged ? (
                    <Icon
                      name="alert-circle"
                      size={20}
                      aria-label="Needs a Syntro field"
                      className="text-vermilion"
                    />
                  ) : null}
                </div>
              </td>
              <td className={cn(bodyCell, 'truncate text-graphite/60')}>{row.firstRow}</td>
              <td className={cn(bodyCell, 'pr-4.25')}>
                <Select
                  aria-label={`Syntro field for ${row.theirColumn}`}
                  size="md"
                  options={fields}
                  placeholder="Select Field"
                  value={values[row.id] ?? row.syntroField}
                  onValueChange={(field) => {
                    onChange(row.id, field);
                  }}
                  className="w-map-select max-w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
