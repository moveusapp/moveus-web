import { ChangeEvent, useCallback, useRef, useState } from "react";
import { prepareImageForUpload } from "@/utils/image";

export function useImageSelect() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onSelect = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (!picked) return;
    // Downscale/re-encode up front so the ticket is signed for, and the uplink
    // pushes, the normalised bytes. Preview reads the prepared (in-memory) blob,
    // which also avoids a second iCloud round-trip on the original.
    const prepared = await prepareImageForUpload(picked);
    setFile(prepared);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(prepared);
  }, []);

  const clear = useCallback(() => {
    setFile(null);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  return { inputRef, file, previewUrl, onSelect, clear };
}
