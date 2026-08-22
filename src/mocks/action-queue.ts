import type { ActionQueueData, InboundRfqItem, TeamItem } from '@/types';

// Copy is verbatim from Figma frames 1:22719, 1:25976, 1:22831 and 1:22986. Items the file gives no
// detail for reuse their own row text (see docs/deviation-report.md).
const classifierNote =
  "Classifier found no candidate workspace. Dismiss this email if it's not an RFQ reply, or open the source supplier's workspace manually.";
const routingPrompt = 'No suggested project. Route this quote into one:';

const meridianQuestion =
  'Meridian CNC flagged a tolerance question on BRK-FRAME-01 — does the ±0.05mm flatness callout apply to the mounting face? Need your call before re-quoting.';

const talonRfq: InboundRfqItem = {
  kind: 'inbound-rfq',
  id: 'rfq-talon',
  category: 'Inbound RFQ Replies',
  summary: 'Inbound quote: RE: RFQ — BRK-FRAME-01 (ROBOT-100) — sales@talonprec.com',
  age: '10d',
  meta: 'Inbound RFQ reply · 10d · staged_inbound_quotes',
  email: {
    subject: 'RE: RFQ — BRK-FRAME-01 (ROBOT-100)',
    from: { name: 'Talon Precision', address: 'sales@talonprec.com', initial: 'T' },
    body: { paragraphs: [] },
  },
  candidateNote: classifierNote,
  routing: {
    prompt: routingPrompt,
    note: classifierNote,
    suggestedProjectName: 'RFQ — BRK-FRAME-01 (ROBOT-100)',
  },
};

const escalation = (id: string, summary: string): TeamItem => ({
  kind: 'escalation',
  id,
  ref: '-',
  summary,
  age: '-',
  title: summary,
  meta: 'Escalation · - · escalation',
  body: summary,
});

export const actionQueue: ActionQueueData = {
  subtitle: '6 open · 4 escalations · sorted by urgency',
  needsYou: [
    {
      kind: 'inbound-rfq',
      id: 'rfq-meridian',
      category: 'Inbound RFQ Replies',
      summary: 'Inbound quote: RE: RFQ — BRK-FRAME-01 tolerance question — quotes@meridiancnc.com',
      age: '10d',
      meta: 'Inbound RFQ reply · 10d · staged_inbound_quotes',
      email: {
        subject: 'RE: RFQ — BRK-FRAME-01 tolerance question',
        from: { name: 'Meridian CNC', address: 'quotes@meridiancnc.com', initial: 'M' },
        body: {
          paragraphs: [
            'Hi Alex,',
            'Before we quote BRK-FRAME-01 — does the ±0.05mm flatness callout apply to the mounting face, or the whole part? It changes the fixturing.',
          ],
          signature: { closing: 'Dana', name: 'Meridian CNC' },
        },
      },
      candidateNote: classifierNote,
      routing: {
        prompt: routingPrompt,
        note: classifierNote,
        suggestedProjectName: 'RFQ — BRK-FRAME-01 tolerance question',
      },
    },
    talonRfq,
  ],
  team: [
    {
      id: 'escalations',
      label: 'Escalations',
      items: [
        {
          ...escalation(
            'esc-meridian-tolerance',
            'Meridian CNC flagged a tolerance question on BRK-FRAME-01...',
          ),
          title: meridianQuestion,
          meta: 'Escalation · 12d · escalation',
          body: meridianQuestion,
        },
        escalation('esc-wire-22awg', 'No qualified supplier yet for WIRE-22AWG (mil-spec M22759).'),
        escalation(
          'esc-talon-quote',
          'New quote reply from Talon Precision parsed for BRK-FRAME-01...',
        ),
        escalation('esc-pcb-ctrl-01', 'PCB-CTRL-01 shipment from Delta Circuits is tracking...'),
      ],
    },
    {
      id: 'shipments',
      label: 'Shipments',
      items: [
        {
          kind: 'shipment',
          // Same id as the dashboard review item so its row deep-links here.
          id: 'po-1039',
          ref: 'PO - 10443',
          summary: 'Shipment at_risk on PO PO-1039',
          age: '-',
          title: 'Shipment at_risk on PO PO-1039',
          meta: 'Shipment · - · shipment',
          body: 'Shipment at_risk on PO PO-1039',
        },
      ],
    },
  ],
};
