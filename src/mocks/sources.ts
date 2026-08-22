import type { SourceEmail, SourcesData } from '@/types';

// Copy is verbatim from Figma frames 1:23106 and 1:23239. The list frame draws three rows under an
// "Unrouted (04)" heading and the detail frame shows the fourth (Nova), so it is appended last.
const skipReason =
  'Parsed by the agent but classified as neither a shipment event nor procurement-related (e.g. marketing, chitchat, acknowledgment).';

const skipped = (
  id: string,
  sender: SourceEmail['sender'],
  receivedAt: SourceEmail['receivedAt'],
  subject: string,
): SourceEmail => ({
  id,
  category: 'skipped',
  sender,
  receivedAt,
  subject,
  body: { paragraphs: [] },
  skipReason,
});

export const sources: SourcesData = {
  lastSync: '10:49 PM',
  items: [
    skipped(
      'src-delta',
      { name: 'Delta Circuits', initial: 'D' },
      { short: '03:59', long: '3:59 AM' },
      'PO-1042 shipped — tracking attached',
    ),
    skipped(
      'src-talon',
      { name: 'Talon Precision', address: 'sales@talonprec.com', initial: 'T' },
      { short: '09:29', long: '9:29 AM' },
      'RE: RFQ — BRK-FRAME-01 (ROBOT-100)',
    ),
    skipped(
      'src-meridian',
      { name: 'Meridian CNC', address: 'quotes@meridiancnc.com', initial: 'M' },
      { short: '09:29', long: '9:29 AM' },
      'RE: RFQ — BRK-FRAME-01 tolerance question',
    ),
    {
      ...skipped(
        'src-nova',
        { name: 'Nova Electronics', address: 'orders@novaelec.com', initial: 'N' },
        { short: '15:59', long: '3:59 PM' },
        'RE: PO-1044 — slight delay',
      ),
      body: {
        paragraphs: [
          'Hi Alex,',
          'We hit a component shortage on the sensor breakout PCB run for PO-1044. We can ship ~5 days later than promised, or split the shipment (half now, half in 2 weeks). Which do you prefer?',
        ],
        signature: { closing: 'Thanks,', name: 'Nova Electronics' },
      },
    },
  ],
};
