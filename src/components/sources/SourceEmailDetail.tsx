import type { ReactNode } from 'react';

import { EmailBody } from '@/components/review';
import { Divider, Icon } from '@/components/ui';
import type { SourceEmail } from '@/types';

export interface SourceEmailDetailProps {
  email: SourceEmail;
  /** `DetailToolbar` rendered above the message, inside the main column. */
  toolbar: ReactNode;
}

/** Opened email (1:23334): sender block with initials avatar, subject and the message body. */
export function SourceEmailDetail({ email, toolbar }: SourceEmailDetailProps) {
  const { sender, receivedAt, subject, body } = email;

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      {toolbar}
      <div className="p-6">
        <div className="flex items-start gap-4">
          <span
            aria-hidden
            className="flex size-16 shrink-0 items-center justify-center rounded-pill bg-surface font-display text-2xl font-semibold text-graphite"
          >
            {sender.initial}
          </span>
          <div className="flex min-w-0 flex-col gap-3 pt-1">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display text-lg font-medium text-graphite">
                  {sender.name}
                </span>
                {sender.address ? (
                  <span className="font-display text-base text-graphite/60">{`<${sender.address}>`}</span>
                ) : null}
              </div>
              <span className="font-display text-base text-graphite">To Me</span>
            </div>
            <div className="flex items-center gap-1.5 text-graphite">
              <Icon name="time-circle" size={20} />
              <span className="font-display text-base">{receivedAt.long}</span>
            </div>
          </div>
        </div>
        <Divider className="mt-6" />
        <h2 className="mt-6 font-display text-xl font-semibold text-graphite">{subject}</h2>
        <EmailBody body={body} className="mt-5" />
      </div>
    </div>
  );
}
