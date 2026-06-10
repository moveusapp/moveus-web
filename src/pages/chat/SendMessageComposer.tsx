import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from "react";
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Grow the field to fit its content, capped by max-height (then it scrolls).
  const resize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, []);

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

  const submit = useCallback(async () => {
    if (submitting) return;
    if (!text.trim() && !image) return;

    const snapshotText = text;
    const snapshotImage = image;

    setText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    clearImage();
    setSubmitting(true);

    const outcome = await onSend({ text: snapshotText, image: snapshotImage });

    if (outcome !== "ok") {
      setText(snapshotText);
      if (snapshotImage) {
        setImage(snapshotImage);
        setImagePreview(URL.createObjectURL(snapshotImage));
      }
      requestAnimationFrame(resize);
    }
    setSubmitting(false);
  }, [text, image, submitting, onSend, clearImage, resize]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      void submit();
    },
    [submit],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        void submit();
      }
    },
    [submit],
  );

  const iconBtn = "h-10 min-h-10 w-10";

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
        className="bg-base-200 border border-base-300 rounded-2xl p-2 flex items-end gap-2"
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
          className={`btn btn-ghost btn-circle shrink-0 ${iconBtn}`}
          onClick={() => imageInputRef.current?.click()}
          aria-label={strings.chat.selectedAttachmentAlt}
        >
          <HiPhoto className="h-5 w-5 text-base-content/50" />
        </button>
        <textarea
          ref={textareaRef}
          name="message"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          onInput={resize}
          onKeyDown={handleKeyDown}
          rows={1}
          className="textarea flex-1 min-w-0 resize-none min-h-10 max-h-32 py-2 leading-snug"
          placeholder={strings.chat.typeAMessage}
          autoComplete="off"
        />
        <button
          type="submit"
          className={`btn btn-primary btn-circle shrink-0 ${iconBtn}`}
          disabled={submitting || (!text.trim() && !image)}
          aria-label={strings.common.send}
        >
          {submitting ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            <HiPaperAirplane className="h-5 w-5" />
          )}
        </button>
      </form>
    </div>
  );
}

export default SendMessageComposer;
