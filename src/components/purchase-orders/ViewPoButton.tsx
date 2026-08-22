import { Icon, IconButton } from '@/components/ui';

export interface ViewPoButtonProps {
  /** Display number used for the accessible name ("View PO - 1044"). */
  number: string;
  onClick: () => void;
}

/** The 20px eye on watchlist rows (1:20021). A 24px hit target is pulled in with negative margins so the row keeps its 20px height. */
export function ViewPoButton({ number, onClick }: ViewPoButtonProps) {
  return (
    <IconButton
      variant="plain"
      size={24}
      aria-label={`View ${number}`}
      className="-m-0.5 rounded-sm hover:bg-surface"
      onClick={onClick}
    >
      <Icon name="eye" size={20} />
    </IconButton>
  );
}
