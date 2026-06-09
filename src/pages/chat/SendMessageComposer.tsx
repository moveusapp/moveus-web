import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import { HiPaperAirplane, HiPhoto, HiXMark } from "react-icons/hi2";
import strings from "@/translations/strings";
import { prepareImageForUpload } from "@/utils/image";
import type { SendInput, SendOutcome } from "./use-chat-messages";

interface SendMessageComposerProps {
  onSend: (input: SendInput) => Promise<SendOutcome>;
}

function SendMessageComposer({ onSend }: SendMessageComposerProps) {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const onImageChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const picked = e.currentTarget.files?.[0] ?? null;
    const file = picked ? await prepareImageForUpload(picked) : null;
    setImage(file);
    setImagePreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return file ? URL.createObjectURL(file) : null;
    });
  }, []);

  const clearImage = useCallback(() => {
    if (imageInputRef.current) imageInputRef.current.value = "";
    setImage(null);
    setImagePreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (submitting) return;
      if (!text.trim() && !image) return;

      const snapshotText = text;
      const snapshotImage = image;

      setText("");
      clearImage();
      setSubmitting(true);

      const outcome = await onSend({ text: snapshotText, image: snapshotImage });

      if (outcome !== "ok") {
        setText(snapshotText);
        if (snapshotImage) {
          setImage(snapshotImage);
          setImagePreview(URL.createObjectURL(snapshotImage));
        }
      }
      setSubmitting(false);
    },
    [text, image, submitting, onSend, clearImage],
  );

  return (
    <div className="flex flex-col gap-2">
      {imagePreview && (
        <div className="relative inline-block w-16 h-16 ml-2">
          <img
            src={imagePreview}
            alt={strings.chat.selectedAttachmentAlt}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <button
            type="button"
            className="btn btn-circle btn-xs absolute -top-1.5 -right-1.5 btn-neutral"
            onClick={clearImage}
            aria-label={strings.common.cancel}
          >
            <HiXMark className="text-xs" />
          </button>
        </div>
      )}
      <form
        className="bg-base-200 rounded-2xl p-2 flex items-center gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          name="attachment-image"
          ref={imageInputRef}
          className="hidden"
          onChange={onImageChange}
          accept="image/*"
        />
        <button
          type="button"
          className="btn btn-ghost btn-sm btn-circle"
          onClick={() => imageInputRef.current?.click()}
          aria-label={strings.chat.selectedAttachmentAlt}
        >
          <HiPhoto className="text-lg text-base-content/50" />
        </button>
        <input
          type="text"
          name="message"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          className="input input-ghost border-0 flex-1 focus:outline-none"
          placeholder={strings.chat.typeAMessage}
          autoComplete="off"
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm btn-circle"
          disabled={submitting || (!text.trim() && !image)}
        >
          <HiPaperAirplane className="text-base" />
        </button>
      </form>
    </div>
  );
}

export default SendMessageComposer;
