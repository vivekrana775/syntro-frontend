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
 * 1000px-wide (×0.6944) clone rotated ~8.5°, anchored at (225, 192) inside the panel.
 */
export function DashboardPreview({ data, navigation, user, className }: DashboardPreviewProps) {
  return (
    <div
      aria-hidden
      // `inert` keeps the cloned controls out of the tab order; React 18 only forwards it as a string.
      {...({ inert: '' } as Record<string, string>)}
      className={cn(
        'pointer-events-none absolute left-[225px] top-[192px] flex w-[1440px] origin-top-left rotate-[8.5deg] scale-[0.6944] select-none overflow-hidden rounded-[32px] bg-page',
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
