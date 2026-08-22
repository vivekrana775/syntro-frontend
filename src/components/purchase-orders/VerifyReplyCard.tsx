import { Button, Icon } from '@/components/ui';
import type { ReplyToVerify } from '@/types';

import { ViewPoButton } from './ViewPoButton';
import { WatchlistRow } from './WatchlistRow';

export interface VerifyReplyCardProps {
  reply: ReplyToVerify;
  onConfirm: (id: string) => void;
  onReject: (id: string) => void;
  onView: (poId: string) => void;
}

/** Parsed vendor reply awaiting confirmation (1:20043): amber outline, sand callout, confirm/reject. */
export function VerifyReplyCard({ reply, onConfirm, onReject, onView }: VerifyReplyCardProps) {
  return (
    <article className="flex flex-col gap-4.5 rounded-lg border border-amber p-4.25">
      <WatchlistRow
        number={reply.number}
        vendor={reply.vendor}
        meta={reply.confidenceLabel}
        trailing={<span className="truncate">{reply.stateLabel}</span>}
        action={
          <ViewPoButton
            number={reply.number}
            onClick={() => {
              onView(reply.poId);
            }}
          />
        }
      />
      <div className="flex flex-col gap-3">
        <p className="rounded-md bg-sand p-4.5 font-sans text-base text-graphite">
          We read the vendor reply as: <span className="font-medium">{reply.parsedSummary}</span>
        </p>
        <p className="font-sans text-sm leading-5 text-graphite">{reply.parserNote}</p>
      </div>
      <p className="font-sans text-base font-medium leading-5 text-graphite">{reply.question}</p>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="primary"
          size="md"
          leadingIcon={<Icon name="check" />}
          onClick={() => {
            onConfirm(reply.id);
          }}
        >
          Yes, Confirm
        </Button>
        <Button
          variant="surface"
          size="md"
          leadingIcon={<Icon name="close-bold" />}
          onClick={() => {
            onReject(reply.id);
          }}
        >
          No, Reject
        </Button>
      </div>
    </article>
  );
}
