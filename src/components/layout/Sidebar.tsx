import { forwardRef, type HTMLAttributes } from 'react';

import { Button, Icon, Logo } from '@/components/ui';
import { cn } from '@/lib/cn';
import { isNavGroup, type NavEntry } from '@/types';

import { NavGroup } from './NavGroup';
import { NavItem } from './NavItem';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  navigation: NavEntry[];
  onNewOrder: () => void;
}

/** 280px navigation rail (1:1058): logo block, "New Order" CTA and the nav tree. */
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { navigation, onNewOrder, className, ...rest },
  ref,
) {
  return (
    <aside
      ref={ref}
      className={cn('flex w-70 shrink-0 flex-col border-r border-subtle bg-page', className)}
      {...rest}
    >
      <div className="flex h-26 shrink-0 items-center p-6">
        <Logo size="sidebar" className="px-4.5 py-2.5" />
      </div>
      <nav aria-label="Main" className="flex flex-col gap-3 px-6 pt-6">
        <Button
          variant="primary"
          size="md"
          fullWidth
          className="justify-start gap-2.5 px-4.5"
          leadingIcon={<Icon name="plus" />}
          onClick={onNewOrder}
        >
          New Order
        </Button>
        {navigation.map((entry) =>
          isNavGroup(entry) ? (
            <NavGroup key={entry.id} group={entry} />
          ) : (
            <NavItem key={entry.id} label={entry.label} icon={entry.icon} to={entry.to} />
          ),
        )}
      </nav>
    </aside>
  );
});
