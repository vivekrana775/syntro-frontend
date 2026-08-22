import { forwardRef, type ReactNode, type Ref } from 'react';

import { NavLink } from 'react-router-dom';

import { Icon } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { IconName } from '@/types';

export interface NavItemProps {
  label: string;
  icon: IconName;
  /** When set the item renders as a router link and derives `active` from the URL. */
  to?: string;
  active?: boolean;
  /** Figma renders collapsed groups and child items at 80% opacity. */
  dim?: boolean;
  trailing?: ReactNode;
  onClick?: () => void;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  className?: string;
}

const base =
  'flex h-12 w-full items-center gap-2.5 rounded-xl py-3 pl-4.5 text-left font-display text-nav transition-colors';
const activeClasses = 'bg-paper font-medium text-vermilion';
const inactiveClasses = 'font-normal text-graphite hover:bg-paper';

export const NavItem = forwardRef<HTMLElement, NavItemProps>(function NavItem(
  { label, icon, to, active = false, dim = false, trailing, onClick, className, ...aria },
  ref,
) {
  const content = (
    <>
      <Icon name={icon} size={18} />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {trailing}
    </>
  );
  const classes = (isActive: boolean) =>
    cn(
      base,
      trailing ? 'pr-3' : 'pr-4.5',
      isActive ? activeClasses : inactiveClasses,
      !isActive && dim && 'opacity-80',
      className,
    );

  if (to) {
    return (
      <NavLink
        // The root is polymorphic (link or button); narrow the forwarded ref to the rendered element.
        ref={ref as Ref<HTMLAnchorElement>}
        to={to}
        className={({ isActive }) => classes(isActive || active)}
        onClick={onClick}
        {...aria}
      >
        {content}
      </NavLink>
    );
  }

  return (
    <button
      // The root is polymorphic (link or button); narrow the forwarded ref to the rendered element.
      ref={ref as Ref<HTMLButtonElement>}
      type="button"
      className={classes(active)}
      onClick={onClick}
      {...aria}
    >
      {content}
    </button>
  );
});
