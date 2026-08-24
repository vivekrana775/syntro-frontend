import { cn } from '@/lib/cn';
import { KNOWLEDGE_CATEGORY, type KnowledgeMemory } from '@/types';

export interface KnowledgeTableProps {
  /** Visually hidden table caption, e.g. "Learned memories". */
  caption: string;
  memories: readonly KnowledgeMemory[];
}

const COLUMNS = [
  { key: 'category', label: 'Category', width: 'w-col-know-category' },
  { key: 'memory', label: 'Memory', width: 'w-col-know-memory' },
  { key: 'evidence', label: 'Evidence', width: 'w-col-know-evidence' },
  { key: 'confidence', label: 'Confidence', width: 'w-col-know-confidence' },
  { key: 'lastSeen', label: 'Last Seen', width: undefined },
] as const;

// Header cells carry the bordered pill (1:23512); their text sits at x17, body text at x18.
const headerCell =
  'h-14 border-y border-subtle pl-4.25 text-left font-sans text-base font-medium text-graphite';
const bodyCell =
  'h-14 border-b border-subtle pl-4.5 font-sans text-base text-graphite/60 group-last:border-b-0';

/** Learned memories table (1:23511): bordered header row, 56px rows divided by hairlines. */
export function KnowledgeTable({ caption, memories }: KnowledgeTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-know-table table-fixed border-separate border-spacing-0">
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
          {memories.map((memory) => (
            <tr key={memory.id} className="group">
              <td className={cn(bodyCell, 'truncate')}>{KNOWLEDGE_CATEGORY[memory.category]}</td>
              <td className={cn(bodyCell, 'truncate')}>{memory.memory}</td>
              <td className={cn(bodyCell, 'truncate')}>{memory.evidenceLabel}</td>
              <td className={cn(bodyCell, 'truncate')}>{memory.confidenceLabel}</td>
              <td className={cn(bodyCell, 'truncate')}>{memory.lastSeenLabel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
