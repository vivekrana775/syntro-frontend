import { forwardRef, type HTMLAttributes } from 'react';

import { matchPath, useLocation } from 'react-router-dom';

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
  const { pathname } = useLocation();

  // Figma opens the group that owns the current route (Workflow on the PO pages, Review on the
  // action-queue detail) and collapses the others; with no match each group's `defaultOpen` applies.
  const activeGroupId = navigation.find(
    (entry) =>
      isNavGroup(entry) &&
      entry.children.some(
        (child) =>
          child.to !== undefined && matchPath({ path: child.to, end: false }, pathname) !== null,
      ),
  )?.id;

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
            <NavGroup
              key={entry.id}
              group={entry}
              initialOpen={
                activeGroupId === undefined
                  ? (entry.defaultOpen ?? false)
                  : entry.id === activeGroupId
              }
            />
          ) : (
            <NavItem key={entry.id} label={entry.label} icon={entry.icon} to={entry.to} />
          ),
        )}
      </nav>
    </aside>
  );
});
