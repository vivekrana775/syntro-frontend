import { useId, useState } from 'react';

import { Button, Divider, Icon, IconButton } from '@/components/ui';
import type { DraftFollowUp } from '@/types';

import { ViewPoButton } from './ViewPoButton';
import { WatchlistRow } from './WatchlistRow';

export interface DraftFollowUpCardProps {
  draft: DraftFollowUp;
  onSend: (id: string) => void;
  onDismiss: (id: string) => void;
  onView: (poId: string) => void;
}

/** Drafted follow-up email, expanded (1:20016) or collapsed to a row (1:20196). */
export function DraftFollowUpCard({ draft, onSend, onDismiss, onView }: DraftFollowUpCardProps) {
  const [expanded, setExpanded] = useState(true);
  const bodyId = useId();

  const row = (
    <WatchlistRow
      number={draft.number}
      vendor={draft.vendor}
      meta={draft.kind}
      trailing={
        <>
          {expanded ? <span className="truncate">{draft.draftedLabel}</span> : null}
          <IconButton
            variant="plain"
            size={24}
            aria-label={expanded ? 'Collapse draft' : 'Expand draft'}
            aria-expanded={expanded}
            aria-controls={bodyId}
            className="-m-0.5 rounded-sm text-graphite hover:bg-surface"
            onClick={() => {
              setExpanded((value) => !value);
            }}
          >
            <Icon name={expanded ? 'arrow-top' : 'arrow-bottom'} size={20} />
          </IconButton>
        </>
      }
      action={
        <ViewPoButton
          number={draft.number}
          onClick={() => {
            onView(draft.poId);
          }}
        />
      }
    />
  );

  if (!expanded) {
    return (
      <article className="flex h-14 items-center rounded-lg border border-subtle px-4">
        {row}
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-4.5 rounded-lg border border-subtle p-4.25">
      {row}
      <Divider />
      <div id={bodyId} className="flex flex-col gap-3">
        <p className="font-sans text-base leading-5 text-graphite/60">Draft Body</p>
        <div className="flex flex-col gap-3 rounded-md bg-surface p-4 font-display text-lg font-medium text-graphite">
          <p>{draft.body.greeting}</p>
          {draft.body.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            {draft.body.closing}
            <br />
            <span className="font-semibold">{draft.body.signature}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={() => {
            onSend(draft.id);
          }}
        >
          Send
        </Button>
        <Button
          variant="surface"
          size="md"
          onClick={() => {
            onDismiss(draft.id);
          }}
        >
          Dismiss
        </Button>
      </div>
    </article>
  );
}
