import type { AwaitingVendor } from '@/types';

import { ViewPoButton } from './ViewPoButton';
import { WatchlistRow } from './WatchlistRow';

export interface AwaitingVendorRowProps {
  item: AwaitingVendor;
  onView: (poId: string) => void;
}

/** Sent PO with no acknowledgment yet (1:20070). */
export function AwaitingVendorRow({ item, onView }: AwaitingVendorRowProps) {
  return (
    <div className="flex h-14 items-center rounded-lg border border-subtle px-4">
      <WatchlistRow
        className="flex-1"
        number={item.number}
        vendor={item.vendor}
        meta={item.statusLabel}
        trailing={<span className="truncate">{item.sentLabel}</span>}
        action={
          <ViewPoButton
            number={item.number}
            onClick={() => {
              onView(item.poId);
            }}
          />
        }
      />
    </div>
  );
}
