import type { Supplier, SupplierActivity, SuppliersData } from '@/types';

const NO_ACTIVITY: SupplierActivity = {
  messages: '-',
  lastSeen: '-',
  lastPurchase: '-',
  twoWayEmail: 'No',
};

/** Shorthand for the rows Figma leaves undrawn: full record synthesised from the table cells. */
const supplier = (
  values: Pick<Supplier, 'id' | 'name' | 'subName' | 'email' | 'domain'> & Partial<Supplier>,
): Supplier => ({
  hq: 'US',
  status: 'active',
  notes: 'Type-II/III anodize and passivation',
  detailNotes: 'Type-II/III anodize and passivation',
  tags: [values.name],
  contacts: [],
  parts: [],
  activity: NO_ACTIVITY,
  ...values,
});

/**
 * Approved vendor list (1:21702). The frame draws the first seven of its "14 suppliers";
 * rows 8-14 reuse vendor names from the other sections' mocks.
 */
export const suppliers: SuppliersData = {
  title: 'Suppliers',
  tabs: {
    approved: { label: 'Approved', subtitle: 'suppliers · approved vendor list' },
    discovered: { label: 'Discovered', subtitle: '0 discovered · pending confirmation' },
    reconcile: { label: 'Reconcile', subtitle: 'Reconcile · duplicates, gaps & unlinked PO names' },
  },
  suppliers: [
    {
      id: 'sup-bolt-fastener',
      name: 'Bolt & Fastener Co',
      subName: 'Bolt & Fastener Co.',
      email: 'sales@boltfast.com',
      hq: 'US',
      status: 'active',
      notes: 'Type-II/III anodize and passivation',
      detailNotes: 'Commodity fasteners, same-week ship.',
      domain: 'boltfast.com',
      tags: ['Bolt & Fastener Co'],
      // The designed contact card (1:25660) carries this email verbatim.
      contacts: [
        { id: 'tom-bright', name: 'Tom Bright', email: 'tom@cascademold.com', primary: true },
      ],
      parts: [
        {
          id: 'fas-m4-12',
          number: 'FAS-M4-12',
          description: 'fastener · M4x12 socket-head cap screw, black oxide',
          priceLabel: '$0.08',
        },
        {
          id: 'standoff-m3',
          number: 'STANDOFF-M3',
          description: 'fastener · Hex standoff, M3 x 10mm, brass',
          priceLabel: '$0.14',
        },
      ],
      activity: { messages: '-', lastSeen: '-', lastPurchase: '12 Apr, 2025', twoWayEmail: 'No' },
    },
    supplier({
      id: 'sup-cascade-molding',
      name: 'Cascade Molding',
      subName: 'Cascade Injection Molding',
      email: 'tom@cascademold.com',
      domain: 'cascademold.com',
    }),
    supplier({
      id: 'sup-delta-circuits',
      name: 'Delta Circuits',
      subName: 'Delta Circuits Corp.',
      email: 'raj@deltacircuits.com',
      domain: 'deltacircuits.com',
    }),
    supplier({
      id: 'sup-generic-fasteners',
      name: 'Generic Fasteners',
      subName: 'Generic Fasteners Co.',
      email: '-',
      domain: 'genericfasteners.com',
    }),
    supplier({
      id: 'sup-ironwood-sheet-metal',
      name: 'Ironwood Sheet Metal',
      subName: 'Ironwood Sheet Metal',
      email: 'quotes@ironwoodsm.com',
      domain: 'ironwoodsm.com',
    }),
    supplier({
      id: 'sup-kingsford-components',
      name: 'Kingsford Components',
      subName: 'Kingsford Components Inc',
      email: 'sales@kingsfordcomp.com',
      domain: 'kingsfordcomp.com',
      status: 'do-not-use',
    }),
    supplier({
      id: 'sup-legacy-machine-works',
      name: 'Legacy Machine Works',
      // The designed row (1:21894) repeats this sub-name verbatim.
      subName: 'Bolt & Fastener Co.',
      email: 'info@legacymw.com',
      domain: 'legacymw.com',
    }),
    supplier({
      id: 'sup-meridian-cnc',
      name: 'Meridian CNC',
      subName: 'Meridian CNC Ltd.',
      email: 'quotes@meridiancnc.com',
      domain: 'meridiancnc.com',
    }),
    supplier({
      id: 'sup-nova-electronics',
      name: 'Nova Electronics',
      subName: 'Nova Electronics Inc.',
      email: 'orders@novaelec.com',
      domain: 'novaelec.com',
    }),
    supplier({
      id: 'sup-orion-coatings',
      name: 'Orion Coatings',
      subName: 'Orion Coatings LLC',
      email: 'hello@orioncoatings.com',
      domain: 'orioncoatings.com',
    }),
    supplier({
      id: 'sup-pacific-gasket',
      name: 'Pacific Gasket Supply',
      subName: 'Pacific Gasket Supply Co.',
      email: 'sales@pacificgasket.com',
      domain: 'pacificgasket.com',
    }),
    supplier({
      id: 'sup-summit-castings',
      name: 'Summit Castings',
      subName: 'Summit Castings Corp.',
      email: 'quotes@summitcast.com',
      domain: 'summitcast.com',
    }),
    supplier({
      id: 'sup-talon-precision',
      name: 'Talon Precision',
      subName: 'Talon Precision Machining',
      email: 'sales@talonprec.com',
      domain: 'talonprec.com',
    }),
    supplier({
      id: 'sup-vector-plastics',
      name: 'Vector Plastics',
      subName: 'Vector Plastics Inc.',
      email: 'info@vectorplastics.com',
      domain: 'vectorplastics.com',
    }),
  ],
  filters: {
    statuses: ['Active', 'Unverified'],
    tags: ['Fasteners', 'Machines'],
  },
  gaps: [
    { id: 'gap-apex-anodize', supplierName: 'Apex Anodize', layout: 'stacked' },
    { id: 'gap-bolt-fastener', supplierName: 'Bolt & Fastener Co', layout: 'stacked' },
    { id: 'gap-cascade-molding', supplierName: 'Cascade Molding', layout: 'stacked' },
    { id: 'gap-delta-circuits', supplierName: 'Delta Circuits', layout: 'stacked' },
    // The frame repeats Apex Anodize with the inline chip layout (1:22699).
    { id: 'gap-apex-anodize-2', supplierName: 'Apex Anodize', layout: 'inline' },
  ],
};
