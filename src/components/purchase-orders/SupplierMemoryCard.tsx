import { Divider } from '@/components/ui';
import type { SupplierMemory } from '@/types';

export interface SupplierMemoryCardProps {
  memory: SupplierMemory;
}

/** Observation card inside the supplier memory panel (1:20607). */
export function SupplierMemoryCard({ memory }: SupplierMemoryCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-surface p-4 font-display text-base text-graphite">
      <div className="flex flex-col gap-1">
        <p className="font-medium">Observation</p>
        <p className="text-graphite/60">{memory.observation}</p>
      </div>
      <Divider />
      <div className="flex items-center justify-between gap-4">
        <span className="truncate">{memory.footnote}</span>
        <span className="shrink-0 font-medium">{memory.score}</span>
      </div>
    </div>
  );
}
