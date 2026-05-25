import { RefObject, useEffect, useRef } from "react";

export function useHtmlDialog(isOpen: boolean): {
  dialogRef: RefObject<HTMLDialogElement | null>;
} {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return { dialogRef };
}
