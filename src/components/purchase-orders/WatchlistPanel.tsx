import { useId } from 'react';

import { Card } from '@/components/ui';
import type { WatchlistData } from '@/types';

import { AwaitingVendorRow } from './AwaitingVendorRow';
import { DraftFollowUpCard } from './DraftFollowUpCard';
import { SectionHeader } from './SectionHeader';
import { VerifyReplyCard } from './VerifyReplyCard';

export interface WatchlistPanelProps {
  data: WatchlistData;
  onView: (poId: string) => void;
  onSendDraft: (id: string) => void;
  onDismissDraft: (id: string) => void;
  onConfirmReply: (id: string) => void;
  onRejectReply: (id: string) => void;
}

/** Watchlist tab body (1:20011): needs-action drafts, replies to verify, POs awaiting the vendor. */
export function WatchlistPanel({
  data,
  onView,
  onSendDraft,
  onDismissDraft,
  onConfirmReply,
  onRejectReply,
}: WatchlistPanelProps) {
  const id = useId();
  const sections = [
    {
      key: 'needs-action',
      header: data.needsAction,
      items: data.needsAction.items.map((draft) => (
        <DraftFollowUpCard
          key={draft.id}
          draft={draft}
          onSend={onSendDraft}
          onDismiss={onDismissDraft}
          onView={onView}
        />
      )),
    },
    {
      key: 'verify-reply',
      header: data.verifyReply,
      items: data.verifyReply.items.map((reply) => (
        <VerifyReplyCard
          key={reply.id}
          reply={reply}
          onConfirm={onConfirmReply}
          onReject={onRejectReply}
          onView={onView}
        />
      )),
    },
    {
      key: 'awaiting-vendor',
      header: data.awaitingVendor,
      items: data.awaitingVendor.items.map((item) => (
        <AwaitingVendorRow key={item.id} item={item} onView={onView} />
      )),
    },
  ];

  return (
    <Card className="flex flex-col gap-6">
      {sections.map((section) => {
        const headingId = `${id}-${section.key}`;
        return (
          <section key={section.key} aria-labelledby={headingId} className="flex flex-col gap-5">
            <SectionHeader
              id={headingId}
              title={section.header.title}
              description={section.header.description}
            />
            {/* Figma shows one item per section; the 12px stack gap is an assumption. */}
            <div className="flex flex-col gap-3">{section.items}</div>
          </section>
        );
      })}
    </Card>
  );
}
