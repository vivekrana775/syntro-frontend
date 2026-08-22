import type { DashboardData } from '@/types';

// Bar values are derived from the bar heights in Figma (frames 1:1227 / 1:1288); the design has no labelled data.
export const dashboard: DashboardData = {
  greeting: 'Good Morning, Alex',
  subtitle: 'Here’s where procurement stands.',
  primaryStats: [
    { id: 'rfqs-sent', value: '03', label: 'RFQs sent', icon: 'git' },
    { id: 'quotes-received', value: '04', label: 'Quotes received', icon: 'sort' },
    { id: 'pos-issued', value: '06', label: 'POs issued', icon: 'arrow-swap' },
    { id: 'savings', value: '00', label: 'Savings identified', icon: 'dollar' },
  ],
  secondaryStats: [
    { id: 'arriving', value: '00', label: 'Arriving this week', icon: 'calendar' },
    { id: 'active-rfqs', value: '03', label: 'Active RFQs', icon: 'git' },
    { id: 'ready-to-compare', value: '01', label: 'Ready to Compare', icon: 'check-double' },
  ],
  charts: [
    {
      id: 'spend-managed',
      title: 'Spend Managed',
      metric: '$ 100K',
      mode: 'diverging',
      yTicks: ['20%', '10%', '0', '-10%', '-20%'],
      domain: [-20, 20],
      data: [
        { label: 'Jan', value: 6.9, secondaryValue: 9.4 },
        { label: 'Feb', value: 10.5, secondaryValue: 13.9 },
        { label: 'Mar', value: 14.5, secondaryValue: 12.2 },
        { label: 'Apr', value: 6.9, secondaryValue: 7.5 },
        { label: 'May', value: 16.3, secondaryValue: 17, emphasis: true, tooltip: '12%' },
        { label: 'Jun', value: 6.9, secondaryValue: 7.5 },
      ],
    },
    {
      id: 'on-order',
      title: 'On Order',
      metric: '$ 90K',
      mode: 'single',
      yTicks: ['400', '300', '200', '100', '0'],
      domain: [0, 400],
      data: [
        { label: 'Jan', value: 120 },
        { label: 'Feb', value: 303 },
        { label: 'Mar', value: 198 },
        { label: 'Apr', value: 285, emphasis: true, tooltip: '$90K' },
        { label: 'May', value: 122 },
        { label: 'Jun', value: 198 },
      ],
    },
  ],
  review: {
    title: 'Needs your review',
    subtitle: 'Items awaiting your attention to keep procurement moving forward.',
    queueCount: 6,
    items: [
      {
        id: 'po-1051',
        title: 'PO awaiting approval: PO-1051',
        tag: { label: 'Purchase Orders', tone: 'info' },
        description: '9,920.00 USD to Apex Robotics, Fremont CA',
      },
      {
        id: 'po-1039',
        title: 'Shipment at_risk on PO-1039',
        tag: { label: 'Shippments', tone: 'info' },
        description: 'shipped',
      },
      {
        id: 'rfq-2284',
        title: 'Beta Manufacturing raised a supplier question outside spec on RFQ-2284',
        tag: { label: 'Urgent', tone: 'urgent' },
        description:
          "Can ROHS-3 be accepted in lieu of REACH on line item 4? The spec doesn't specify which compliance is required — agent paused for your call.",
      },
    ],
  },
};
