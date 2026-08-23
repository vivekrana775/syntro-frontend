import { Badge, Icon, IconButton } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { BomSummary } from '@/types';

import { BomRowMenu } from './BomRowMenu';

export interface BomTableProps {
  /** Visually hidden table caption, e.g. "Ungrouped BOMs". */
  caption: string;
  boms: readonly BomSummary[];
  /** Centred line shown when `boms` is empty (1:19056). Omit to render the header row alone. */
  emptyMessage?: string;
  onView: (id: string) => void;
  onRename: (id: string, opener: HTMLElement | null) => void;
  onMove: (id: string, opener: HTMLElement | null) => void;
  onDelete: (id: string, opener: HTMLElement | null) => void;
}

const COLUMNS = [
  { key: 'name', label: 'Name', width: 'w-col-bom-name' },
  { key: 'parts', label: 'Parts', width: 'w-col-bom-parts' },
  { key: 'uploaded', label: 'Uploaded', width: 'w-col-bom-uploaded' },
  { key: 'actions', label: 'Actions', width: undefined },
] as const;

// The box draws its 1px stroke inside (1:18826); cells pad 17px so text lands on Figma's x18.
const headerCell =
  'h-14 border-b border-subtle pl-4.25 text-left font-sans text-base font-medium text-graphite';
const bodyCell =
  'h-14 border-b border-subtle pl-4.25 font-sans text-base text-graphite/60 group-last:border-b-0';

/** Library table (1:18826): bordered 16px box, 56px header and rows divided by hairlines. */
export function BomTable({
  caption,
  boms,
  emptyMessage,
  onView,
  onRename,
  onMove,
  onDelete,
}: BomTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-subtle">
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
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {boms.length === 0 && emptyMessage !== undefined ? (
            <tr>
              <td
                colSpan={COLUMNS.length}
                className="h-56 text-center font-sans text-sm text-graphite/60"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : null}
          {boms.map((bom) => (
            <tr key={bom.id} className="group">
              <td className={cn(bodyCell, 'pr-4')}>
                <div className="flex items-center gap-4">
                  <span className="truncate">{bom.name}</span>
                  <Badge tone="outline" size="lg" dot={false}>
                    {bom.version}
                  </Badge>
                </div>
              </td>
              <td className={cn(bodyCell, 'truncate')}>{bom.partsLabel}</td>
              <td className={cn(bodyCell, 'truncate')}>{bom.uploadedLabel}</td>
              <td className={bodyCell}>
                <div className="flex items-center gap-2">
                  <IconButton
                    variant="surface"
                    size={32}
                    aria-label={`View ${bom.name} ${bom.version}`}
                    onClick={() => {
                      onView(bom.id);
                    }}
                  >
                    <Icon name="eye" size={16} />
                  </IconButton>
                  <BomRowMenu
                    bomName={`${bom.name} ${bom.version}`}
                    onRename={(opener) => {
                      onRename(bom.id, opener);
                    }}
                    onMove={(opener) => {
                      onMove(bom.id, opener);
                    }}
                    onDelete={(opener) => {
                      onDelete(bom.id, opener);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
