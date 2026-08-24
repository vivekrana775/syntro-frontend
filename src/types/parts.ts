export const PURCHASE_HISTORY_FILTERS = ['any', 'yes', 'no'] as const;

export type PurchaseHistoryFilter = (typeof PURCHASE_HISTORY_FILTERS)[number];

/** Options of the "Has Purchase History" select in the Filter dialog (1:21694); only "Yes" is drawn. */
export const PURCHASE_HISTORY_LABEL: Record<PurchaseHistoryFilter, string> = {
  any: 'Any',
  yes: 'Yes',
  no: 'No',
};

/** Tooling Owner select in the incumbent form (1:21474); its options are not designed. */
export const TOOLING_OWNERS = ['customer', 'supplier', 'shared'] as const;

export type ToolingOwner = (typeof TOOLING_OWNERS)[number];

export const TOOLING_OWNER_LABEL: Record<ToolingOwner, string> = {
  customer: 'Customer',
  supplier: 'Supplier',
  shared: 'Shared',
};

/** One purchase or quote line in the part detail dialog (1:21237): supplier · price · relative time. */
export interface PartHistoryEntry {
  id: string;
  supplier: string;
  /** Pre-formatted unit price ("$4.10"). */
  priceLabel: string;
  /** Pre-formatted relative time ("2mo ago"). */
  whenLabel: string;
}

/** Saved through the "Tooled / Incumbent Supplier" form (1:21462). */
export interface PartIncumbent {
  supplierId: string;
  supplierName: string;
  toolingOwner: ToolingOwner | null;
  /** Kept as typed ("1200"); the field is not formatted in Figma. */
  sunkNre: string;
  notes: string;
}

export interface Part {
  id: string;
  number: string;
  description: string;
  lastSupplier: string;
  /** Table cell (1:20928) — Figma writes "$ 4.10" here but "$4.10" in the detail dialog. */
  lastPaidLabel: string;
  /** BOM names listed under "Appears in BOM" (1:21234). */
  boms: string[];
  /** "Has Purchase History" in the Filter dialog means at least one entry. */
  purchases: PartHistoryEntry[];
  quotes: PartHistoryEntry[];
  incumbent: PartIncumbent | null;
}

export interface PartsData {
  title: string;
  subtitle: string;
  parts: Part[];
}
