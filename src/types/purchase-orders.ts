import type { BadgeTone } from './badge';

export type PurchaseOrdersTab = 'watchlist' | 'tracker';

/** Label + colour for a status or owner pill. */
export interface PillSpec {
  label: string;
  tone: BadgeTone;
}

export type TrackerStatus =
  'awaiting-approval' | 'sent' | 'acknowledged' | 'ack-with-changes' | 'at-risk' | 'delivered';

/** Tracker status pills (1:20412, 1:20438 …): labels and tones exactly as designed. */
export const TRACKER_STATUS: Record<TrackerStatus, PillSpec> = {
  'awaiting-approval': { label: 'Awaiting Approval', tone: 'success' },
  sent: { label: 'Sent', tone: 'info' },
  acknowledged: { label: 'Acknowledged', tone: 'info' },
  'ack-with-changes': { label: 'Ack W/Changes', tone: 'warning' },
  'at-risk': { label: 'At Risk', tone: 'warning' },
  delivered: { label: 'Delivered', tone: 'success' },
};

export type TrackerOwner = 'unassigned' | 'you' | 'supplier' | 'carrier' | 'done';

/** Tracker owner tags (1:20421, 1:20447, 1:20460, 1:20473). */
export const TRACKER_OWNER: Record<TrackerOwner, PillSpec> = {
  unassigned: { label: 'Unassigned', tone: 'outline' },
  you: { label: 'You', tone: 'danger' },
  supplier: { label: 'Supplier', tone: 'neutral' },
  carrier: { label: 'Carrier', tone: 'neutral' },
  done: { label: 'Done', tone: 'success' },
};

export interface TrackerRow {
  id: string;
  /** Display number exactly as shown ("PO - 1051"). */
  number: string;
  supplier: string;
  status: TrackerStatus;
  /** Pre-formatted date ("02/07/2026") or "-". */
  promised: string;
  /** Pre-formatted amount ("$9,920"). */
  total: string;
  owner: TrackerOwner;
}

export interface TrackerGroup {
  id: 'pending' | 'issued';
  title: string;
  description: string;
  rows: TrackerRow[];
}

export interface TrackerData {
  groups: TrackerGroup[];
}

/** A follow-up email the system drafted and is waiting for the user to send (1:20016). */
export interface DraftFollowUp {
  id: string;
  poId: string;
  number: string;
  vendor: string;
  /** Chaser kind, e.g. "48h follow up". */
  kind: string;
  draftedLabel: string;
  body: {
    greeting: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };
}

/** A vendor reply whose parsed reading needs confirming (1:20043). */
export interface ReplyToVerify {
  id: string;
  poId: string;
  number: string;
  vendor: string;
  confidenceLabel: string;
  stateLabel: string;
  parsedSummary: string;
  parserNote: string;
  question: string;
}

/** A sent PO with no acknowledgment yet (1:20070). */
export interface AwaitingVendor {
  id: string;
  poId: string;
  number: string;
  vendor: string;
  statusLabel: string;
  sentLabel: string;
}

export interface WatchlistSection<T> {
  title: string;
  description: string;
  items: T[];
}

export interface WatchlistData {
  needsAction: WatchlistSection<DraftFollowUp>;
  verifyReply: WatchlistSection<ReplyToVerify>;
  awaitingVendor: WatchlistSection<AwaitingVendor>;
}

export interface ChaserEntry {
  id: string;
  kind: string;
  state: PillSpec;
  draftedLabel: string;
}

/** Data behind the PO detail modal (1:20239). */
export interface PurchaseOrderSummary {
  id: string;
  number: string;
  vendor: string;
  ackState: PillSpec;
  total: string;
  sent: string;
  vendorCommit: string;
  chasers: ChaserEntry[];
}

export const PURCHASE_ORDER_FACT_KEYS = [
  'promisedShip',
  'promisedDelivery',
  'needBy',
  'acked',
] as const;
export type PurchaseOrderFactKey = (typeof PURCHASE_ORDER_FACT_KEYS)[number];

/** Row labels of the PO detail facts list (1:20625), in display order. */
export const PURCHASE_ORDER_FACT_LABELS: Record<PurchaseOrderFactKey, string> = {
  promisedShip: 'Promised Ship',
  promisedDelivery: 'Promised Delivery',
  needBy: 'Need by',
  acked: 'Acked',
};

/** What the system has learned about a supplier (1:20607). */
export interface SupplierMemory {
  observation: string;
  /** e.g. "0 events · updated Jul 6" */
  footnote: string;
  /** Confidence, pre-formatted ("92%"). */
  score: string;
}

/** Data behind the PO detail page (1:20501). */
export interface PurchaseOrderDetail {
  id: string;
  number: string;
  supplier: string;
  stateLabel: string;
  facts: Record<PurchaseOrderFactKey, string>;
  supplierMemory: SupplierMemory | null;
}

export interface PurchaseOrdersTabMeta {
  label: string;
  subtitle: string;
  count: number;
}

export interface PurchaseOrdersData {
  title: string;
  tabs: Record<PurchaseOrdersTab, PurchaseOrdersTabMeta>;
  watchlist: WatchlistData;
  tracker: TrackerData;
  /** Modal data keyed by PO id. */
  summaries: Record<string, PurchaseOrderSummary>;
}
