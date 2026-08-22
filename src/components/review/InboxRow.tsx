import { Link } from 'react-router-dom';

export interface InboxRowProps {
  to: string;
  title: string;
  subtitle: string;
  /** Right-aligned age or time, pre-formatted ("10d", "03:59"). */
  meta: string;
}

/** Inbox-style list entry (1:22813, 1:23200): title + meta on one line, muted subtitle below. */
export function InboxRow({ to, title, subtitle, meta }: InboxRowProps) {
  return (
    <li>
      <Link
        to={to}
        className="flex flex-col gap-2 rounded-lg p-4 transition-colors hover:bg-surface"
      >
        <span className="flex items-center justify-between gap-4">
          <span className="min-w-0 truncate font-display text-lg font-semibold text-graphite">
            {title}
          </span>
          <span className="shrink-0 font-display text-sm text-graphite/60">{meta}</span>
        </span>
        <span className="font-display text-base text-graphite/60">{subtitle}</span>
      </Link>
    </li>
  );
}
