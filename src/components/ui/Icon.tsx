import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type FunctionComponent,
  type SVGProps,
} from 'react';

import AddFolder from '@/assets/icons/add-folder.svg?react';
import AlertCircle from '@/assets/icons/alert-circle.svg?react';
import ArrowBottom from '@/assets/icons/arrow-bottom.svg?react';
import ArrowLeft from '@/assets/icons/arrow-left.svg?react';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';
import ArrowSwap from '@/assets/icons/arrow-swap.svg?react';
import ArrowTopRight from '@/assets/icons/arrow-top-right.svg?react';
import ArrowTop from '@/assets/icons/arrow-top.svg?react';
import Calendar from '@/assets/icons/calendar.svg?react';
import Chart from '@/assets/icons/chart.svg?react';
import CheckDouble from '@/assets/icons/check-double.svg?react';
import Check from '@/assets/icons/check.svg?react';
import ChevronLeft from '@/assets/icons/chevron-left.svg?react';
import ChevronRight from '@/assets/icons/chevron-right.svg?react';
import CloseBold from '@/assets/icons/close-bold.svg?react';
import Close from '@/assets/icons/close.svg?react';
import Document from '@/assets/icons/document.svg?react';
import Dollar from '@/assets/icons/dollar.svg?react';
import EditSquare from '@/assets/icons/edit-square.svg?react';
import Edit from '@/assets/icons/edit.svg?react';
import Eye from '@/assets/icons/eye.svg?react';
import Filter from '@/assets/icons/filter.svg?react';
import Folder from '@/assets/icons/folder.svg?react';
import Git from '@/assets/icons/git.svg?react';
import Menu from '@/assets/icons/menu.svg?react';
import Moon from '@/assets/icons/moon.svg?react';
import MoreVertical from '@/assets/icons/more-vertical.svg?react';
import Note from '@/assets/icons/note.svg?react';
import Notification from '@/assets/icons/notification.svg?react';
import Plus from '@/assets/icons/plus.svg?react';
import RefreshDouble from '@/assets/icons/refresh-double.svg?react';
import RotateRight from '@/assets/icons/rotate-right.svg?react';
import Search from '@/assets/icons/search.svg?react';
import Sort from '@/assets/icons/sort.svg?react';
import Status from '@/assets/icons/status.svg?react';
import Sun from '@/assets/icons/sun.svg?react';
import TimeCircle from '@/assets/icons/time-circle.svg?react';
import Trash from '@/assets/icons/trash.svg?react';
import Upload from '@/assets/icons/upload.svg?react';
import Work from '@/assets/icons/work.svg?react';
import { cn } from '@/lib/cn';
import type { IconName } from '@/types';

type SvgComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

const registry: Record<IconName, SvgComponent> = {
  plus: Plus,
  menu: Menu,
  work: Work,
  sort: Sort,
  note: Note,
  edit: Edit,
  document: Document,
  status: Status,
  'arrow-top': ArrowTop,
  'arrow-bottom': ArrowBottom,
  'arrow-right': ArrowRight,
  'arrow-top-right': ArrowTopRight,
  'arrow-swap': ArrowSwap,
  moon: Moon,
  sun: Sun,
  notification: Notification,
  eye: Eye,
  search: Search,
  close: Close,
  'rotate-right': RotateRight,
  filter: Filter,
  calendar: Calendar,
  dollar: Dollar,
  'check-double': CheckDouble,
  check: Check,
  'close-bold': CloseBold,
  'chevron-right': ChevronRight,
  'arrow-left': ArrowLeft,
  'chevron-left': ChevronLeft,
  'refresh-double': RefreshDouble,
  'time-circle': TimeCircle,
  git: Git,
  folder: Folder,
  'add-folder': AddFolder,
  upload: Upload,
  trash: Trash,
  'more-vertical': MoreVertical,
  'edit-square': EditSquare,
  'alert-circle': AlertCircle,
  chart: Chart,
};

/** Icon sizes used in Figma: 16 (table actions), 18 (nav, search, button trailing), 20 (input addons, row actions), 24 (default). */
export type IconSize = 16 | 18 | 20 | 24;

const sizeClass: Record<IconSize, string> = {
  16: 'size-4',
  18: 'size-[18px]',
  20: 'size-5',
  24: 'size-6',
};

export interface IconProps extends Omit<ComponentPropsWithoutRef<'svg'>, 'name'> {
  name: IconName;
  size?: IconSize;
}

/** Renders a Figma line icon at a fixed size; colour follows `currentColor`. Decorative by default. */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = 24, className, ...rest },
  ref,
) {
  const Svg = registry[name];
  return (
    <Svg
      ref={ref}
      aria-hidden={rest['aria-label'] ? undefined : true}
      focusable="false"
      className={cn('shrink-0', sizeClass[size], className)}
      {...rest}
    />
  );
});
