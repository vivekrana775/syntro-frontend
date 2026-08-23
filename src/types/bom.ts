/** Bill of Materials domain (Figma section 1:26716). All display values are pre-formatted strings. */

export const BOM_DETAIL_TABS = ['tree', 'table'] as const;
export type BomDetailTab = (typeof BOM_DETAIL_TABS)[number];

/** A user-created folder that groups BOMs on the library page (1:19039). */
export interface BomFolder {
  id: string;
  name: string;
}

/** One row of the BOM library table (1:18833). */
export interface BomSummary {
  id: string;
  name: string;
  /** Version chip label ("v1"). */
  version: string;
  /** Pre-formatted part count ("19 Parts"). */
  partsLabel: string;
  /** Pre-formatted upload date ("Jul 10, 2026"). */
  uploadedLabel: string;
  /** `null` while the BOM sits in "Ungrouped". */
  folderId: string | null;
}

export interface BomsData {
  folders: BomFolder[];
  boms: BomSummary[];
}

/** A part under the assembly root in the tree view (1:19471). */
export interface BomPart {
  id: string;
  number: string;
  /** Revision chip label ("Rev B") or `null` when the part has none. */
  rev: string | null;
  name: string;
  description: string;
}

/** The assembly root row of the tree view (1:19551). Figma designs a single level of parts. */
export interface BomAssembly {
  id: string;
  number: string;
  rev: string | null;
  name: string;
  /** "Assembly" — shown before the part count with a dot separator. */
  kindLabel: string;
  partsLabel: string;
  parts: BomPart[];
}

/** One row of the parts table (1:19722). Unknown cells show "-" exactly as designed. */
export interface BomTableRow {
  id: string;
  number: string;
  rev: string;
  category: string;
  type: string;
  description: string;
  demand: {
    qty: string;
    unit: string;
  };
}

/** BOM detail page data (1:19321 tree, 1:19586 table). */
export interface BomDetail {
  id: string;
  title: string;
  /** Version chips next to the title ("v1", "v2"). */
  versions: string[];
  /** Pre-formatted subtitle ("8 lines · 9 unique parts"). */
  summary: string;
  section: {
    title: string;
    partsLabel: string;
  };
  assembly: BomAssembly;
  rows: BomTableRow[];
}

/** One spreadsheet column awaiting a Syntro field in the Map Columns step (1:24111). */
export interface ColumnMapping {
  id: string;
  theirColumn: string;
  firstRow: string;
  /** Columns Figma marks with the alert icon (1:24134). */
  flagged: boolean;
  /** `SyntroField.value`, or "" while unmapped. */
  syntroField: string;
}

/** What the parser proposes for an uploaded file (1:24088). */
export interface UploadPreview {
  bomName: string;
  columns: ColumnMapping[];
}

export interface SyntroField {
  value: string;
  label: string;
}

/** Fields offered by the Syntro Field selects. Only Part Number and Quantity are visible in Figma. */
export const SYNTRO_FIELDS: readonly SyntroField[] = [
  { value: 'part-number', label: 'Part Number' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'item-name', label: 'Item Name' },
  { value: 'category', label: 'Category' },
  { value: 'description', label: 'Description' },
];
