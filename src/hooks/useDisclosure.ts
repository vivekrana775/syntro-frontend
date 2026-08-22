import { useCallback, useState } from 'react';

export interface Disclosure {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
}

/** Minimal open/close state for dialogs and drawers. */
export function useDisclosure(initialOpen = false): Disclosure {
  const [open, setOpen] = useState(initialOpen);
  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  return { open, onOpen, onClose, onOpenChange: setOpen };
}
