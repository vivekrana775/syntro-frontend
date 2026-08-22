import type { EmailBodyData, EmailSender } from './review';

export const SOURCE_TABS = ['all', 'procurement', 'skipped', 'questions', 'extracted'] as const;

export type SourceTab = (typeof SOURCE_TABS)[number];

export type SourceCategory = Exclude<SourceTab, 'all'>;

/** Inbound email synced from a supplier mailbox (1:23106, 1:23239). */
export interface SourceEmail {
  id: string;
  category: SourceCategory;
  sender: EmailSender;
  /** Pre-formatted times: `short` on the list row ("03:59"), `long` in the detail ("3:59 PM"). */
  receivedAt: { short: string; long: string };
  subject: string;
  body: EmailBodyData;
  /** Classifier explanation shown in the "Skipped by agent" panel. */
  skipReason?: string;
}

export interface SourcesData {
  /** Pre-formatted, e.g. "10:49 PM". */
  lastSync: string;
  items: SourceEmail[];
}
