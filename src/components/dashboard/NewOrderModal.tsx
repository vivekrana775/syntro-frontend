import { useState, type KeyboardEvent } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  OptionCard,
} from '@/components/ui';
import type { IconName, NewOrderKind } from '@/types';

export interface NewOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: (kind: NewOrderKind) => void;
}

const options: { kind: NewOrderKind; icon: IconName; title: string; description: string }[] = [
  {
    kind: 'plan-build',
    icon: 'rotate-right',
    title: 'Plan a Build',
    description: 'Calculate required quantities from your build plan and inventory.',
  },
  {
    kind: 'one-off-rfq',
    icon: 'arrow-swap',
    title: 'One-off RFQ',
    description: 'Create a request for quote by entering requirements manually.',
  },
];

/** "What do you need to source?" dialog (Add Order v1, 1:1701). */
export function NewOrderModal({ open, onOpenChange, onContinue }: NewOrderModalProps) {
  const [kind, setKind] = useState<NewOrderKind>('plan-build');

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = options.findIndex((option) => option.kind === kind);
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown')
      next = (index + 1) % options.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = (index - 1 + options.length) % options.length;
    }
    const option = options[next];
    if (next !== index && option) {
      event.preventDefault();
      setKind(option.kind);
      (event.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>What do you need to source?</DialogTitle>
          <DialogDescription>
            Items awaiting your attention to keep procurement moving forward.
          </DialogDescription>
        </DialogHeader>

        <div role="radiogroup" aria-label="Order type" className="flex flex-col gap-4 sm:flex-row">
          {options.map((option) => (
            <OptionCard
              key={option.kind}
              icon={option.icon}
              title={option.title}
              description={option.description}
              selected={option.kind === kind}
              tabIndex={option.kind === kind ? 0 : -1}
              onClick={() => {
                setKind(option.kind);
              }}
              onKeyDown={onKeyDown}
              className="sm:w-option-card sm:flex-1"
            />
          ))}
        </div>

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
            variant="primary"
            size="lg"
            onClick={() => {
              onContinue(kind);
            }}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
