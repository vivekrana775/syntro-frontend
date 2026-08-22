import errorReduction from '@/assets/images/error-reduction.svg';
import multiAccess from '@/assets/images/multi-access.svg';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';

export type ReplyResultVariant = 'confirmed' | 'rejected';

export interface ReplyResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Restores focus to the opener when the dialog closes (see `useDisclosure`). */
  onCloseAutoFocus?: (event: Event) => void;
  variant: ReplyResultVariant;
  onConfirm: (variant: ReplyResultVariant) => void;
}

const copy: Record<
  ReplyResultVariant,
  { illustration: string; title: string; description: string }
> = {
  confirmed: {
    illustration: multiAccess,
    title: 'Reply Confirmed',
    description:
      'The vendor reply has been confirmed and the purchase order has been updated successfully.',
  },
  rejected: {
    illustration: errorReduction,
    title: 'Reply Rejected',
    description: 'The parsed response has been rejected and sent back for reclassification.',
  },
};

/** Result dialog after confirming (1:26422) or rejecting (1:26659) a parsed reply. */
export function ReplyResultDialog({
  open,
  onOpenChange,
  onCloseAutoFocus,
  variant,
  onConfirm,
}: ReplyResultDialogProps) {
  const content = copy[variant];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm" onCloseAutoFocus={onCloseAutoFocus}>
        {/* The title carries the meaning; the artwork is decorative. */}
        <img
          src={content.illustration}
          width={200}
          height={200}
          alt=""
          className="mx-auto size-50"
        />
        <DialogHeader className="items-center pr-0 text-center">
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription>{content.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="neutral"
            size="lg"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary-deep"
            size="lg"
            onClick={() => {
              onConfirm(variant);
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
