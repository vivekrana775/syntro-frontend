import type { EmailBodyData, EmailSender } from './review';

export const ACTION_QUEUE_TABS = ['needs-you', 'team'] as const;

export type ActionQueueTab = (typeof ACTION_QUEUE_TABS)[number];

/** "Needs You" entry: an inbound RFQ reply waiting to be routed into a project (1:22719, 1:25976). */
export interface InboundRfqItem {
  kind: 'inbound-rfq';
  id: string;
  /** Row title, e.g. "Inbound RFQ Replies". */
  category: string;
  /** Row subtitle and detail headline. */
  summary: string;
  /** Pre-formatted age exactly as shown on the row, e.g. "10d". */
  age: string;
  /** Detail meta line, e.g. "Inbound RFQ reply · 10d · staged_inbound_quotes". */
  meta: string;
  email: { subject: string; from: EmailSender; body: EmailBodyData };
  /** Classifier note under "Candidate workspaces". */
  candidateNote: string;
  routing: { prompt: string; note: string; suggestedProjectName: string };
}

export type TeamItemKind = 'escalation' | 'shipment';

/** "Team" table row and its detail (1:22831, 1:22986). Display strings are pre-formatted ("-" when unknown). */
export interface TeamItem {
  kind: TeamItemKind;
  id: string;
  ref: string;
  /** Action column text. */
  summary: string;
  age: string;
  title: string;
  meta: string;
  body: string;
}

export type ActionQueueItem = InboundRfqItem | TeamItem;

export interface TeamGroup {
  id: string;
  label: string;
  items: TeamItem[];
}

export interface ActionQueueData {
  subtitle: string;
  needsYou: InboundRfqItem[];
  team: TeamGroup[];
}
