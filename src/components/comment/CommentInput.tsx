import { useCallback, useEffect, useId, useRef, useState } from "react";
import { HiPaperAirplane, HiXMark } from "react-icons/hi2";
import UserAvatar from "@/components/user/UserAvatar";
import strings from "@/translations/strings";

export const MAX_COMMENT_LENGTH = 512;
const COUNTER_SHOW_AT = 50;

function CommentInput({
  onSubmit,
  loading,
  placeholder,
  avatarUrl,
  variant = "comment",
  autoFocus = false,
  initialText = "",
  onCancel,
}: CommentInputProps) {
  const [text, setText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const counterId = useId();

  const isReply = variant === "reply";
  const remaining = MAX_COMMENT_LENGTH - text.length;
  const showCounter = remaining <= COUNTER_SHOW_AT;
  const canSubmit = !!text.trim() && !loading;

  const resize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, []);

  useEffect(() => {
    if (!autoFocus) return;
    const el = textareaRef.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
    resize();
  }, [autoFocus, resize]);

  const handleSubmit = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    onSubmit(trimmed);
    setText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }, [text, loading, onSubmit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      } else if (e.key === "Escape" && onCancel) {
        e.preventDefault();
        onCancel();
      }
    },
    [handleSubmit, onCancel],
  );

  const iconBtn = isReply ? "h-9 min-h-9 w-9" : "h-10 min-h-10 w-10";

  return (
    <div className="flex flex-col gap-1">
      <div className={`flex items-end ${isReply ? "gap-2" : "gap-2.5"}`}>
        <UserAvatar
          imageUrl={avatarUrl}
          className={`mt-0.5 shrink-0 self-start ${isReply ? "h-7 w-7" : "h-9 w-9"}`}
        />
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onInput={resize}
          onKeyDown={handleKeyDown}
          placeholder={
            placeholder ??
            (isReply ? strings.comment.writeAReply : strings.comment.writeAComment)
          }
          rows={1}
          maxLength={MAX_COMMENT_LENGTH}
          aria-describedby={showCounter ? counterId : undefined}
          className={`textarea min-w-0 flex-1 resize-none rounded-2xl text-sm leading-relaxed ${
            isReply ? "max-h-28 min-h-9" : "max-h-40 min-h-10"
          }`}
        />
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            aria-label={strings.common.cancel}
            className={`btn btn-ghost btn-circle shrink-0 ${iconBtn}`}
          >
            <HiXMark className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          aria-label={strings.comment.post}
          className={`btn btn-primary btn-circle shrink-0 ${iconBtn}`}
        >
          {loading ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            <HiPaperAirplane className={isReply ? "h-4 w-4" : "h-5 w-5"} />
          )}
        </button>
      </div>
      {showCounter && (
        <span
          id={counterId}
          className={`self-end text-xs tabular-nums ${
            remaining <= 0 ? "text-error" : "text-warning"
          }`}
        >
          {text.length}/{MAX_COMMENT_LENGTH}
        </span>
      )}
    </div>
  );
}

export default CommentInput;

interface CommentInputProps {
  onSubmit: (text: string) => void;
  loading: boolean;
  placeholder?: string;
  avatarUrl?: string | null;
  variant?: "comment" | "reply";
  autoFocus?: boolean;
  initialText?: string;
  onCancel?: () => void;
}
