import { Fragment, type HTMLAttributes } from 'react';

import { Link } from 'react-router-dom';

import { Icon } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { BreadcrumbItem } from '@/types';

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

const crumbClasses = 'block truncate font-display text-xl';

function Crumb({ item, current }: { item: BreadcrumbItem; current: boolean }) {
  if (current) {
    return (
      <h1 aria-current="page" className={cn(crumbClasses, 'font-medium text-graphite')}>
        {item.label}
      </h1>
    );
  }
  if (item.to) {
    return (
      <Link
        to={item.to}
        className={cn(
          crumbClasses,
          'font-normal text-graphite/80 transition-colors hover:text-graphite',
        )}
      >
        {item.label}
      </Link>
    );
  }
  return <span className={cn(crumbClasses, 'font-normal text-graphite/80')}>{item.label}</span>;
}

/** Topbar trail (1:20591): ancestors at 80%, chevron separators, the current page as the h1. */
export function Breadcrumb({ items, className, ...rest }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('min-w-0', className)} {...rest}>
      <ol className="flex min-w-0 items-center gap-4">
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 ? (
              <li aria-hidden className="shrink-0 text-graphite">
                <Icon name="chevron-right" />
              </li>
            ) : null}
            <li className="min-w-0">
              <Crumb item={item} current={index === items.length - 1} />
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
