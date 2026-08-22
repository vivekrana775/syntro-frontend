import { Hairline } from '@/components/review';

export interface SkippedAsideProps {
  /** Classifier explanation, e.g. why the agent skipped this email. */
  reason: string;
  onMarkRelevant: () => void;
}

/** "Skipped by agent" side panel (1:23365): explanation card with a "Mark as relevant" action. */
export function SkippedAside({ reason, onMarkRelevant }: SkippedAsideProps) {
  return (
    <aside
      aria-labelledby="skipped-heading"
      className="flex flex-col gap-6 border-t border-subtle p-6 xl:w-aside xl:shrink-0 xl:border-l xl:border-t-0"
    >
      <div className="flex flex-col gap-2">
        <h2 id="skipped-heading" className="font-display text-xl font-semibold text-graphite">
          Skipped by agent
        </h2>
        <p className="font-sans text-base text-graphite/60">
          Nothing was extracted: operator can correct the classifier.
        </p>
      </div>
      <div className="flex flex-col gap-4 rounded-lg bg-surface p-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-base font-medium text-graphite">
            Why was this skipped?
          </h3>
          <p className="font-display text-base text-graphite/60">{reason}</p>
        </div>
        <Hairline />
        <button
          type="button"
          className="self-start rounded-sm font-display text-base font-medium text-graphite transition-colors hover:text-graphite/80"
          onClick={onMarkRelevant}
        >
          Mark as relevant
        </button>
      </div>
    </aside>
  );
}
