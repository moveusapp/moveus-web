import { useCallback, useState } from "react";

export default function useSessionDismissed(
  key: string,
): [boolean, () => void] {
  const storageKey = `moveus-dismissed:${key}`;

  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(storageKey) === "1";
    } catch {
      return false;
    }
  });

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      // sessionStorage can throw in private modes; dismiss in-memory anyway.
    }
    setDismissed(true);
  }, [storageKey]);

  return [dismissed, dismiss];
}
