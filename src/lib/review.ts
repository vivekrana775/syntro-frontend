import type { ActionQueueData, ActionQueueItem, ActionQueueTab } from '@/types';

/** Two-digit counters exactly as Figma prints them ("01 of 02", "Skipped (04)"). */
export const pad2 = (value: number) => String(value).padStart(2, '0');

export interface Pager<T> {
  /** 1-based position of the current item. */
  index: number;
  total: number;
  prev: T | null;
  next: T | null;
}

/** Position of `id` inside `items` with its neighbours, or null when it is not in the list. */
export function getPager<T extends { id: string }>(
  items: readonly T[],
  id: string,
): Pager<T> | null {
  const position = items.findIndex((item) => item.id === id);
  if (position === -1) return null;
  return {
    index: position + 1,
    total: items.length,
    prev: items[position - 1] ?? null,
    next: items[position + 1] ?? null,
  };
}

export interface ActionQueueMatch {
  item: ActionQueueItem;
  /** The list the pager counts through: "Needs You", or the team group that owns the item. */
  siblings: readonly ActionQueueItem[];
}

export function findActionQueueItem(data: ActionQueueData, id: string): ActionQueueMatch | null {
  const rfq = data.needsYou.find((item) => item.id === id);
  if (rfq) return { item: rfq, siblings: data.needsYou };
  for (const group of data.team) {
    const item = group.items.find((candidate) => candidate.id === id);
    if (item) return { item, siblings: group.items };
  }
  return null;
}

export const tabForItem = (item: ActionQueueItem): ActionQueueTab =>
  item.kind === 'inbound-rfq' ? 'needs-you' : 'team';
