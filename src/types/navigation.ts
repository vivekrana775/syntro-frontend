import type { RoutePath } from '@/lib/constants';

import type { IconName } from './icon';

export interface NavLeaf {
  id: string;
  label: string;
  icon: IconName;
  /** Route the item links to. Items without a route are visual-only for now. */
  to?: RoutePath;
}

export interface NavGroup {
  id: string;
  label: string;
  icon: IconName;
  children: NavLeaf[];
  defaultOpen?: boolean;
}

export type NavEntry = NavLeaf | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return 'children' in entry;
}
