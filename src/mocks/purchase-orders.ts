import { TRACKER_STATUS, type PurchaseOrderDetail, type PurchaseOrdersData } from '@/types';

/** Purchase Orders page data (frames 1:19897 Watchlist, 1:20282 Tracker). */
export const purchaseOrders: PurchaseOrdersData = {
  title: 'Purchase Orders',
  tabs: {
    watchlist: {
      label: 'Watchlist',
      subtitle: '1 need action · 1 awaiting vendor · 0 recently confirmed',
      count: 1,
    },
    tracker: { label: 'Tracker', subtitle: '1 pending · 6 issued', count: 1 },
  },
  watchlist: {
    needsAction: {
      title: 'Needs your action',
      description: 'Follow-up emails drafted and waiting for you to send.',
      items: [
        {
          id: 'draft-po-1044',
          poId: 'po-1044',
          number: 'PO - 1044',
          vendor: 'Nova Electronics',
          kind: '48h follow up',
          draftedLabel: 'drafted 12 days ago',
          body: {
            greeting: 'Hi Nova Team,',
            paragraphs: [
              'Following up on PO-1044 (sensor breakout PCBs) sent 5 days ago — could you confirm receipt and share an expected ship date?',
            ],
            closing: 'Thanks,',
            signature: 'Alex',
          },
        },
      ],
    },
    verifyReply: {
      title: 'Verify Reply',
      description: 'Confirm our reading of each reply, or reject to re-classify.',
      items: [
        {
          id: 'reply-po-1045',
          poId: 'po-1045',
          number: 'PO - 1045',
          vendor: 'Talon Precision',
          confidenceLabel: '72% Verified',
          stateLabel: 'Replied',
          parsedSummary:
            'vendor acknowledged with changes · ship date Jul 31, 2026 · price changed',
          parserNote:
            'Parser note: Vendor proposed a $0.40/unit increase and a 3-day later ship date.',
          question: 'Does that match what the vendor actually said?',
        },
      ],
    },
    awaitingVendor: {
      title: 'Awaiting vendor',
      description:
        'PO sent, no acknowledgment yet. A follow-up will draft itself if the vendor goes silent past the business-hours threshold.',
      items: [
        {
          id: 'awaiting-po-1047',
          poId: 'po-1047',
          number: 'PO - 1047',
          vendor: 'Kingsford Components',
          statusLabel: 'No ack yet',
          sentLabel: 'sent 12 days ago',
        },
      ],
    },
  },
  tracker: {
    groups: [
      {
        id: 'pending',
        title: 'Pending',
        description: 'Drafted, awaiting approval, or approved-not-yet-sent.',
        rows: [
          {
            id: 'po-1051',
            number: 'PO - 1051',
            supplier: 'Meridian CNC',
            status: 'awaiting-approval',
            promised: '-',
            total: '$9,920',
            owner: 'unassigned',
          },
        ],
      },
      {
        id: 'issued',
        title: 'Issued',
        description: 'Sent to supplier through delivered.',
        rows: [
          {
            id: 'po-1028',
            number: 'PO - 1028',
            supplier: 'Bolt & Fastener Co',
            status: 'delivered',
            promised: '02/07/2026',
            total: '$400',
            owner: 'done',
          },
          {
            id: 'po-1039',
            number: 'PO - 1039',
            supplier: 'Meridian CNC',
            status: 'at-risk',
            promised: '02/07/2026',
            total: '$6,200',
            owner: 'carrier',
          },
          {
            id: 'po-1045',
            number: 'PO - 1045',
            supplier: 'Talon Precision',
            status: 'ack-with-changes',
            promised: '02/07/2026',
            total: '$5,400',
            owner: 'you',
          },
          {
            id: 'po-1042',
            number: 'PO - 1042',
            supplier: 'Delta Circuits',
            status: 'acknowledged',
            promised: '02/07/2026',
            total: '$560',
            owner: 'supplier',
          },
          {
            id: 'po-1044',
            number: 'PO - 1044',
            supplier: 'Nova Electronics',
            status: 'sent',
            promised: '02/07/2026',
            total: '$800',
            owner: 'supplier',
          },
        ],
      },
    ],
  },
  summaries: {
    // Designed (1:20239).
    'po-1044': {
      id: 'po-1044',
      number: 'PO - 1044',
      vendor: 'Nova Electronics',
      ackState: { label: 'Pending', tone: 'warning' },
      total: '$25,800',
      sent: '07/06/2026',
      vendorCommit: '-',
      chasers: [
        {
          id: 'chaser-po-1044-48h',
          kind: '48h follow up',
          state: { label: 'Drafted', tone: 'neutral' },
          draftedLabel: 'drafted 12 days ago',
        },
      ],
    },
    // Not designed: assembled from values visible on the watchlist/tracker; unknowns stay "-".
    'po-1045': {
      id: 'po-1045',
      number: 'PO - 1045',
      vendor: 'Talon Precision',
      ackState: { label: 'Ack W/Changes', tone: 'warning' },
      total: '$5,400',
      sent: '-',
      vendorCommit: 'Jul 31, 2026',
      chasers: [],
    },
    'po-1047': {
      id: 'po-1047',
      number: 'PO - 1047',
      vendor: 'Kingsford Components',
      ackState: { label: 'Pending', tone: 'warning' },
      total: '-',
      sent: '-',
      vendorCommit: '-',
      chasers: [],
    },
  },
};

/** PO detail pages keyed by id. Only PO - 1051 is designed (1:20501); other ids fall back to tracker data. */
export const purchaseOrderDetails: Record<string, PurchaseOrderDetail> = {
  'po-1051': {
    id: 'po-1051',
    number: 'PO - 1051',
    supplier: 'Meridian CNC',
    stateLabel: 'Awaiting Internal',
    facts: { promisedShip: '-', promisedDelivery: '-', needBy: '-', acked: '-' },
    supplierMemory: {
      observation:
        'Meridian CNC quotes ~15% under Talon on machined aluminum brackets but runs about a week longer on lead time.',
      footnote: '0 events · updated Jul 6',
      score: '92%',
    },
  },
};

/**
 * Detail for any PO id: the designed record when one exists, otherwise the tracker row with "-"
 * facts and no supplier memory. Consumed by the action-queue item page for PO items.
 */
export function getPurchaseOrderDetail(id: string): PurchaseOrderDetail | undefined {
  const designed = purchaseOrderDetails[id];
  if (designed) return designed;
  const row = purchaseOrders.tracker.groups.flatMap((group) => group.rows).find((r) => r.id === id);
  if (!row) return undefined;
  return {
    id: row.id,
    number: row.number,
    supplier: row.supplier,
    stateLabel: TRACKER_STATUS[row.status].label,
    facts: { promisedShip: '-', promisedDelivery: '-', needBy: '-', acked: '-' },
    supplierMemory: null,
  };
}
