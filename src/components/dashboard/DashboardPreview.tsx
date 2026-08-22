import { Sidebar, Topbar } from '@/components/layout';
import { cn } from '@/lib/cn';
import type { DashboardData, NavEntry, User } from '@/types';

import { DashboardContent } from './DashboardContent';

export interface DashboardPreviewProps {
  data: DashboardData;
  navigation: NavEntry[];
  user: User;
  className?: string;
}

const noop = () => undefined;

/**
 * Tilted, scaled dashboard used as artwork in the auth promo panel (1:2467). Figma's copy is a
 * 0.6944-scale clone with a slight skew (x-axis ≈4.5°, y-axis ≈7°); the matrix below was fitted to
 * the Figma render from six landmarks and maps the 1440px layout into panel coordinates.
 */
export function DashboardPreview({ data, navigation, user, className }: DashboardPreviewProps) {
  return (
    <div
      aria-hidden
      // `inert` keeps the cloned controls out of the tab order; React 18 only forwards it as a string.
      {...({ inert: '' } as Record<string, string>)}
      className={cn(
        'pointer-events-none absolute left-0 top-0 flex w-[1440px] origin-top-left select-none overflow-hidden rounded-[32px] bg-page [transform:matrix(0.7026,0.0548,-0.0848,0.6968,90.9,194.4)]',
        className,
      )}
    >
      <Sidebar navigation={navigation} onNewOrder={noop} className="flex" />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title="Dashboard" user={user} />
        <div className="p-6">
          <DashboardContent data={data} onOpenFilter={noop} />
        </div>
      </div>
    </div>
  );
}
