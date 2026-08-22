import { useNavigate } from 'react-router-dom';

import { Icon, IconButton } from '@/components/ui';
import { cn } from '@/lib/cn';
import { pad2 } from '@/lib/review';

export interface DetailToolbarProps {
  backTo: string;
  /** Accessible name of the back arrow, e.g. "Back to Needs You". */
  backLabel: string;
  /** 1-based position within the sibling list. */
  index: number;
  total: number;
  prevTo: string | null;
  nextTo: string | null;
  className?: string;
}

// Figma draws 20px glyphs with 24px padding; the 24px hit areas keep the glyphs on the same pixels.
const controlClasses = 'hover:bg-surface';

/** Detail card header (1:26068): back arrow and a "01 of 04" pager through the sibling items. */
export function DetailToolbar({
  backTo,
  backLabel,
  index,
  total,
  prevTo,
  nextTo,
  className,
}: DetailToolbarProps) {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-subtle px-5.5 pb-5.25 pt-5.5',
        className,
      )}
    >
      <IconButton
        variant="plain"
        size={24}
        aria-label={backLabel}
        className={controlClasses}
        onClick={() => {
          navigate(backTo);
        }}
      >
        <Icon name="arrow-left" size={20} />
      </IconButton>
      <div className="flex items-center gap-5.5">
        <IconButton
          variant="plain"
          size={24}
          aria-label="Previous item"
          className={controlClasses}
          disabled={prevTo === null}
          onClick={() => {
            if (prevTo !== null) navigate(prevTo);
          }}
        >
          <Icon name="chevron-left" size={20} />
        </IconButton>
        <span className="font-sans text-base text-graphite">
          {pad2(index)} of {pad2(total)}
        </span>
        <IconButton
          variant="plain"
          size={24}
          aria-label="Next item"
          className={controlClasses}
          disabled={nextTo === null}
          onClick={() => {
            if (nextTo !== null) navigate(nextTo);
          }}
        >
          <Icon name="chevron-right" size={20} />
        </IconButton>
      </div>
    </div>
  );
}
