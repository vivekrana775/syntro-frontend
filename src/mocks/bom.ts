import type { BomDetail, BomsData, UploadPreview } from '@/types';

/** BOM library rows (1:18704 flat, 1:18915 grouped). Folders start empty so the flat view renders first. */
export const bomLibrary: BomsData = {
  folders: [],
  boms: [
    {
      id: 'bom-robot-100-production-v1',
      name: 'ROBOT - 100 - PRODUCTION',
      version: 'v1',
      partsLabel: '19 Parts',
      uploadedLabel: 'Jul 10, 2026',
      folderId: null,
    },
    {
      id: 'bom-robot-100-evt',
      name: 'ROBOT - 100 - EVT Build',
      version: 'v2',
      partsLabel: '8 Parts',
      uploadedLabel: 'Jul 10, 2026',
      folderId: null,
    },
    {
      id: 'bom-base-housing',
      name: 'Base Housing Subassembly',
      version: 'v1',
      partsLabel: '5 Parts',
      uploadedLabel: 'Jul 10, 2026',
      folderId: null,
    },
    {
      id: 'bom-robot-100-production-v2',
      name: 'ROBOT - 100 - PRODUCTION',
      version: 'v2',
      partsLabel: '2 Parts',
      uploadedLabel: 'Jul 10, 2026',
      folderId: null,
    },
  ],
};

const frameMountingBracket = 'Frame mounting bracket';
const robotDescription = 'ROBOT-100 autono...';

/** Parts table row (1:19722): the four trailing rows repeat the assembly exactly as designed. */
const assemblyRow = (id: string) => ({
  id,
  number: 'ROBOT - 100',
  rev: 'C',
  category: 'Assembly',
  type: '-',
  description: robotDescription,
  demand: { qty: '1', unit: 'each' },
});

/** BOM detail pages keyed by id. Only ROBOT-100 — EVT build is designed (1:19321, 1:19586). */
export const bomDetails: Record<string, BomDetail> = {
  'bom-robot-100-evt': {
    id: 'bom-robot-100-evt',
    title: 'ROBOT-100 — EVT build',
    versions: ['v1', 'v2'],
    summary: '8 lines · 9 unique parts',
    section: { title: 'Assembly', partsLabel: '9 Parts' },
    assembly: {
      id: 'part-robot-100',
      number: 'ROBOT - 100',
      rev: 'Rev C',
      name: 'ROBOT -100 Assembly',
      kindLabel: 'Assembly',
      partsLabel: '19 Parts',
      parts: [
        {
          id: 'part-brk-frame-0',
          number: 'BRK-FRAME-0',
          rev: 'Rev B',
          name: frameMountingBracket,
          description: 'Machined aluminum bracket',
        },
        {
          id: 'part-pcb-ctrl-01',
          number: 'PCB-CTRL-01',
          rev: 'Rev A',
          name: frameMountingBracket,
          description: 'Pcba',
        },
        {
          id: 'part-pcb-sense-02',
          number: 'PCB-SENSE-02',
          rev: 'Rev A',
          name: frameMountingBracket,
          description: 'Pcba',
        },
        {
          id: 'part-hsg-base-01',
          number: 'HSG-BASE-01',
          rev: 'Rev A',
          name: frameMountingBracket,
          description: 'Molded Enclosure',
        },
        {
          id: 'part-mot-drv-12',
          number: 'MOT-DRV-12',
          rev: null,
          name: frameMountingBracket,
          description: 'Electronics Module',
        },
        {
          id: 'part-enc-500',
          number: 'ENC-500',
          rev: null,
          name: frameMountingBracket,
          description: 'machined aluminum bracket',
        },
      ],
    },
    rows: [
      assemblyRow('row-robot-100'),
      {
        id: 'row-wire-22awg',
        number: 'WIRE-22AWG',
        rev: '-',
        category: 'Wire',
        type: '-',
        description: robotDescription,
        demand: { qty: '1', unit: 'ft' },
      },
      {
        id: 'row-lens-cam-02',
        number: 'LENS-CAM-02',
        rev: '-',
        category: 'Optics',
        type: '-',
        description: robotDescription,
        demand: { qty: '1', unit: 'each' },
      },
      {
        id: 'row-conn-jst-4',
        number: 'CONN-JST-4',
        rev: '-',
        category: 'Connector',
        type: '-',
        description: robotDescription,
        demand: { qty: '6', unit: 'each' },
      },
      {
        id: 'row-batt-li-18650',
        number: 'BATT-LI-18650',
        rev: 'B',
        category: 'Battery',
        type: '-',
        description: robotDescription,
        demand: { qty: '1', unit: 'ft' },
      },
      {
        id: 'row-filt-emi-01',
        number: 'FILT-EMI-01',
        rev: 'A',
        category: 'Electronics',
        type: '-',
        description: robotDescription,
        demand: { qty: '1', unit: 'each' },
      },
      assemblyRow('row-robot-100-2'),
      assemblyRow('row-robot-100-3'),
      assemblyRow('row-robot-100-4'),
      assemblyRow('row-robot-100-5'),
    ],
  },
};

/**
 * Detail for any library id: the designed record when one exists, otherwise the designed assembly
 * under the row's own name and version (no other assembly is drawn in Figma).
 */
export function getBomDetail(id: string): BomDetail | undefined {
  const designed = bomDetails[id];
  if (designed) return designed;
  const row = bomLibrary.boms.find((bom) => bom.id === id);
  const template = bomDetails['bom-robot-100-evt'];
  if (!row || !template) return undefined;
  return {
    ...template,
    id: row.id,
    title: row.name,
    versions: [row.version],
    summary: row.partsLabel,
  };
}

/** Parser proposal for the Map Columns step (1:24088). */
export const uploadPreview: UploadPreview = {
  bomName: 'Dispenser robot v1',
  columns: [
    {
      id: 'col-item-number',
      theirColumn: 'Item Number',
      firstRow: '13846',
      flagged: false,
      syntroField: 'part-number',
    },
    {
      id: 'col-item-name',
      theirColumn: 'Item Name',
      firstRow: 'CIR BRKR 12A 480VAC 125VDC',
      flagged: true,
      syntroField: '',
    },
    {
      id: 'col-category',
      theirColumn: 'Category',
      firstRow: 'ELEC - Misc.',
      flagged: true,
      syntroField: '',
    },
    { id: 'col-qty', theirColumn: 'Qty', firstRow: '1', flagged: false, syntroField: 'quantity' },
    {
      id: 'col-description',
      theirColumn: 'Description',
      firstRow: 'Circuit Breaker Thermal Magne Leve…',
      flagged: true,
      syntroField: '',
    },
  ],
};
