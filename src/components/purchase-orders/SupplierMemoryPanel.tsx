import type { SupplierMemory } from '@/types';

import { SectionHeader } from './SectionHeader';
import { SupplierMemoryCard } from './SupplierMemoryCard';

export interface SupplierMemoryPanelProps {
  memory: SupplierMemory | null;
}

/** Right column of the PO detail card (1:20603). Figma pads 24 inside a 1px left border → 23 + 24. */
export function SupplierMemoryPanel({ memory }: SupplierMemoryPanelProps) {
  return (
    <aside className="flex flex-col gap-6 border-subtle py-6 pl-5.75 pr-6 lg:w-po-memory lg:border-l">
      <SectionHeader
        title="Supplier Memory"
        description="What the system has learned about this supplier from your prior POs. Internal — never sent to the supplier."
      />
      {memory ? <SupplierMemoryCard memory={memory} /> : null}
    </aside>
  );
}
