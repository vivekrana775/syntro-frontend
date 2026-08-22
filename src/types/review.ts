/** Sender of an inbound email, shown in Action Queue and Sources details. */
export interface EmailSender {
  name: string;
  /** Omitted when Figma never shows an address for the sender. */
  address?: string;
  /** Single letter rendered in the initials avatar (1:23346). */
  initial: string;
}

/** Email text as Figma lays it out: paragraphs, then a closing line above a bold name. */
export interface EmailBodyData {
  paragraphs: string[];
  signature?: { closing: string; name: string };
}
