import { forwardRef, useState, type HTMLAttributes } from 'react';

import { Avatar, Divider, Icon, IconButton, ThemeToggle, type Theme } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { BreadcrumbItem, User } from '@/types';

import { Breadcrumb } from './Breadcrumb';

export interface TopbarProps extends HTMLAttributes<HTMLElement> {
  title: string;
  user: User;
  /** Replaces the plain title with a trail whose last item is the page heading (1:20591). */
  breadcrumb?: BreadcrumbItem[];
  /** Shown below the `lg` breakpoint to open the navigation drawer (not in Figma). */
  onMenuClick?: () => void;
}

/** 104px page header (1:1135): title, theme toggle, notifications and the user pill. */
export const Topbar = forwardRef<HTMLElement, TopbarProps>(function Topbar(
  { title, user, breadcrumb, onMenuClick, className, ...rest },
  ref,
) {
  // Figma designs a light theme only; the toggle is presentational state.
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <header
      ref={ref}
      className={cn(
        'flex h-26 shrink-0 items-center justify-between gap-4 border-b border-subtle px-6',
        className,
      )}
      {...rest}
    >
      <div className="flex min-w-0 items-center gap-3">
        {onMenuClick ? (
          <IconButton
            variant="paper"
            size={48}
            aria-label="Open navigation"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Icon name="menu" />
          </IconButton>
        ) : null}
        {breadcrumb ? (
          <Breadcrumb items={breadcrumb} />
        ) : (
          <h1 className="truncate font-display text-xl font-medium text-graphite">{title}</h1>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <div className="flex items-center gap-2">
          <ThemeToggle value={theme} onValueChange={setTheme} className="hidden sm:flex" />
          <IconButton variant="paper" size={56} aria-label="Notifications">
            <Icon name="notification" />
          </IconButton>
        </div>
        <Divider orientation="vertical" />
        <div className="flex items-center gap-3 rounded-pill bg-paper py-1 pl-1 pr-6">
          <Avatar src={user.avatar.src} srcSet={user.avatar.srcSet} alt={user.avatar.alt} />
          <div className="hidden flex-col gap-1 md:flex">
            <span className="whitespace-nowrap font-display text-base font-medium text-graphite">
              {user.name}
            </span>
            <span className="font-sans text-sm-tight text-graphite/40">{user.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
});
