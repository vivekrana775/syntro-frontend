import { useCallback, useRef, useState } from 'react';

export interface Disclosure {
  open: boolean;
  /**
   * Opens the dialog. Pass the element that should regain focus afterwards when it is not the
   * active element at call time (e.g. a menu trigger whose menu item is about to unmount).
   */
  onOpen: (opener?: unknown) => void;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
  /** Pass to `DialogContent` so focus returns to the element that opened the dialog. */
  onCloseAutoFocus: (event: Event) => void;
}

/** Open/close state for dialogs and drawers that are opened programmatically (no Radix trigger). */
export function useDisclosure(initialOpen = false): Disclosure {
  const [open, setOpen] = useState(initialOpen);
  const opener = useRef<HTMLElement | null>(null);

  const onOpen = useCallback((explicitOpener?: unknown) => {
    const active = explicitOpener instanceof HTMLElement ? explicitOpener : document.activeElement;
    opener.current = active instanceof HTMLElement ? active : null;
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
