import type { Part, PartsData } from '@/types';

/**
 * Row shorthand: the table cells (1:20919) plus the single purchase line the detail dialog draws
 * for BATT-LI-18650 (1:21237). Only that row's "2mo ago" is designed; the others are synthesised.
 */
const part = (
  id: string,
  number: string,
  description: string,
  supplier: string,
  price: string,
  whenLabel: string,
): Part => ({
  id,
  number,
  description,
  lastSupplier: supplier,
  // The table writes "$ 4.10" (1:20928) while the dialog writes "$4.10" (1:21239).
  lastPaidLabel: `$ ${price}`,
  boms: ['ROBOT - 100 PRODUCTION'],
  purchases: [{ id: `${id}-purchase-1`, supplier, priceLabel: `$${price}`, whenLabel }],
  quotes: [],
  incumbent: null,
});

/** Parts library (1:20800): the ten drawn rows in order — part numbers repeat as in the frame. */
export const parts: PartsData = {
  title: 'Parts',
  subtitle: 'List of all your parts.',
  parts: [
    part(
      'part-01',
      'BATT-LI-18650',
      'Li-ion cell 18650, 3400mAh, protected',
      'Kingsford Components',
      '4.10',
      '2mo ago',
    ),
    part('part-02', 'BEAR-608', 'Ball bearing 608-2RS', 'Meridian CNC', '0.50', '1mo ago'),
    part(
      'part-03',
      'BATT-LI-18650',
      'Li-ion 18650 cell',
      'Kingsford Components',
      '4.10',
      '2mo ago',
    ),
    part('part-04', 'CONN-JST-4', 'JST-XH 4-pin', 'Cascade Molding', '44.10', '3mo ago'),
    part('part-05', 'BEAR-608', 'Ball bearing 608-2RS', 'Meridian CNC', '0.50', '1mo ago'),
    part('part-06', 'BEAR-608', 'Ball bearing 608-2RS', 'Meridian CNC', '0.50', '1mo ago'),
    part(
      'part-07',
      'BRK-FRAME-01',
      'Frame mounting bracket',
      'Nova Electronics',
      '14.34',
      '4mo ago',
    ),
    part('part-08', 'BEAR-608', 'Ball bearing 608-2RS', 'Meridian CNC', '0.50', '1mo ago'),
    part(
      'part-09',
      'BRK-FRAME-01',
      'Frame mounting bracket',
      'Nova Electronics',
      '14.34',
      '4mo ago',
    ),
    part('part-10', 'CONN-JST-4', 'JST-XH 4-pin', 'Cascade Molding', '44.10', '3mo ago'),
  ],
};
