import { DetailHeading, EmailBody, Hairline } from '@/components/review';
import { Button, Icon } from '@/components/ui';
import type { InboundRfqItem, Project } from '@/types';

import { RoutingForm } from './RoutingForm';

export interface InboundRfqDetailProps {
  item: InboundRfqItem;
  projects: Project[];
  onRoute: (projectId: string) => void;
  onCreate: (projectName: string) => void;
  onDismiss: () => void;
}

/** Inbound RFQ reply detail (1:26067): headline, the email, classifier notes and the routing form. */
export function InboundRfqDetail({
  item,
  projects,
  onRoute,
  onCreate,
  onDismiss,
}: InboundRfqDetailProps) {
  const { subject, from, body } = item.email;
  const hasBody = body.paragraphs.length > 0 || body.signature !== undefined;

  return (
    <div className="flex flex-col gap-5 p-6">
      <DetailHeading title={item.summary} meta={item.meta} />
      <Hairline />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-display text-lg font-medium text-graphite">{subject}</h3>
          <p className="font-display text-base text-graphite/60">
            From {from.name}
            {from.address ? ` <${from.address}>` : null}
          </p>
        </div>
        {hasBody ? <EmailBody body={body} className="rounded-md border border-subtle p-5" /> : null}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-display text-base font-medium text-graphite">Candidate workspaces</h3>
        <p className="font-display text-base text-graphite/60">{item.candidateNote}</p>
      </div>

      <Hairline />

      <RoutingForm
        prompt={item.routing.prompt}
        note={item.routing.note}
        projects={projects}
        suggestedProjectName={item.routing.suggestedProjectName}
        onRoute={onRoute}
        onCreate={onCreate}
      />

      <div className="pt-1">
        <Button variant="surface" size="md" leadingIcon={<Icon name="close" />} onClick={onDismiss}>
          Not an RFQ
        </Button>
      </div>
    </div>
  );
}
