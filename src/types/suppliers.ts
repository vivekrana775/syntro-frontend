import type { PillSpec } from './purchase-orders';

export const SUPPLIERS_TABS = ['approved', 'discovered', 'reconcile'] as const;

export type SuppliersTab = (typeof SUPPLIERS_TABS)[number];

export type SupplierStatus = 'active' | 'do-not-use' | 'unverified';

/** Status pills in the approved table (1:21826 Active, 1:21886 Do not use; Unverified assumed). */
export const SUPPLIER_STATUS: Record<SupplierStatus, PillSpec> = {
  active: { label: 'Active', tone: 'success' },
  'do-not-use': { label: 'Do not use', tone: 'urgent' },
  unverified: { label: 'Unverified', tone: 'neutral' },
};

/** A person on the supplier's contact list (1:25813). */
export interface SupplierContact {
  id: string;
  name: string;
  email: string;
  /** Job title, e.g. "Sales Manager". */
  role?: string;
  primary: boolean;
}

/** A part previously purchased from the supplier (1:26155). */
export interface SupplierPart {
  id: string;
  number: string;
  description: string;
  /** Pre-formatted unit price ("$0.08"). */
  priceLabel: string;
}

/** Pre-formatted activity facts (1:26166); "-" for unknown values. */
export interface SupplierActivity {
  messages: string;
  lastSeen: string;
  lastPurchase: string;
  twoWayEmail: string;
}

export interface Supplier {
  id: string;
  name: string;
  /** Muted second line in the table's Supplier cell ("Bolt & Fastener Co."). */
  subName: string;
  /** "-" when no email is on file (1:21861). */
  email: string;
  hq: string;
  status: SupplierStatus;
  /** Notes column in the approved table (1:21823). */
  notes: string;
  /** Notes textarea in the detail dialog (1:26211) — designed with different copy than the column. */
  detailNotes: string;
  /** Website shown under the detail dialog title ("boltfast.com"). */
  domain: string;
  tags: string[];
  contacts: SupplierContact[];
  parts: SupplierPart[];
  activity: SupplierActivity;
}

export interface SuppliersTabMeta {
  label: string;
  subtitle: string;
}

/** A supplier missing its NetSuite vendor id on the Reconcile tab (1:22658). */
export interface ReconcileGap {
  id: string;
  supplierName: string;
  /** The last designed row (1:22699) draws the chip beside the name; the others stack it below. */
  layout: 'stacked' | 'inline';
}

/** Chip options offered by the Filter dialog (1:22327). */
export interface SupplierFilterOptions {
  statuses: string[];
  tags: string[];
}

export interface SuppliersData {
  title: string;
  tabs: Record<SuppliersTab, SuppliersTabMeta>;
  suppliers: Supplier[];
  filters: SupplierFilterOptions;
  gaps: ReconcileGap[];
}
