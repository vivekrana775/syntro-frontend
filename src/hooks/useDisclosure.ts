import { useCallback, useRef, useState } from 'react';

export interface Disclosure {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
  /** Pass to `DialogContent` so focus returns to the element that opened the dialog. */
  onCloseAutoFocus: (event: Event) => void;
}

/** Open/close state for dialogs and drawers that are opened programmatically (no Radix trigger). */
export function useDisclosure(initialOpen = false): Disclosure {
  const [open, setOpen] = useState(initialOpen);
  const opener = useRef<HTMLElement | null>(null);

  const onOpen = useCallback(() => {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
  }, []);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  const onCloseAutoFocus = useCallback((event: Event) => {
    if (opener.current) {
      event.preventDefault();
      opener.current.focus();
    }
  }, []);

  return { open, onOpen, onClose, onOpenChange: setOpen, onCloseAutoFocus };
}
