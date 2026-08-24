import { useId, useState } from 'react';

import { Button, Checkbox, Icon } from '@/components/ui';

export interface DiscoveredPanelProps {
  onRefresh: () => void;
}

const EXPLAINER =
  "These suppliers were auto-discovered from your connected email — one row per external domain you've corresponded with. They're pending confirmation and aren't on your approved vendor list yet.";

const EMPTY_DESCRIPTION =
  'Once your email is connected and ingested, supplier domains mined\nfrom your inbox and sent mail will show up here for review.';

/** Discovered tab (1:22377): explainer + refresh, view toggles and the "All caught up." state. */
export function DiscoveredPanel({ onRefresh }: DiscoveredPanelProps) {
  const checkboxId = useId();
  const [bidirectionalOnly, setBidirectionalOnly] = useState(false);
  const [includeCustomers, setIncludeCustomers] = useState(false);

  return (
    <div className="relative flex flex-1 flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-sup-explainer font-display text-lg text-graphite/60">{EXPLAINER}</p>
        <Button
          variant="surface"
          size="md"
          className="gap-2"
          leadingIcon={<Icon name="refresh-double" size={20} />}
          onClick={onRefresh}
        >
          Refresh
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <label
          htmlFor={`${checkboxId}-bidirectional`}
          className="flex cursor-pointer items-center gap-3 font-display text-lg text-graphite/60"
        >
          <Checkbox
            id={`${checkboxId}-bidirectional`}
            aria-label="Bidirectional only"
            checked={bidirectionalOnly}
            onChange={(event) => {
              setBidirectionalOnly(event.target.checked);
            }}
          />
          Bidirectional only
        </label>
        <label
          htmlFor={`${checkboxId}-customers`}
          className="flex cursor-pointer items-center gap-3 font-display text-lg text-graphite/60"
        >
          <Checkbox
            id={`${checkboxId}-customers`}
            aria-label="Include Customers"
            checked={includeCustomers}
            onChange={(event) => {
              setIncludeCustomers(event.target.checked);
            }}
          />
          Include Customers
        </label>
      </div>
      {/* The copy centres on the whole card (1:22506), not the space left under the controls. */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <h3 className="font-display text-xl font-medium text-graphite">All caught up.</h3>
        <p className="mt-2 max-w-full whitespace-pre-line font-display text-lg text-graphite/60">
          {EMPTY_DESCRIPTION}
        </p>
      </div>
    </div>
  );
}
