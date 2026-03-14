import { useCallback, useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import Button from "@/components/ui/Button";

function CommentInput({ onSubmit, loading, placeholder, replyingTo, onCancelReply }: CommentInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    onSubmit(trimmed);
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [text, loading, onSubmit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  const handleInput = useCallback(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  }, []);

  return (
    <div className="flex flex-col gap-1">
      {replyingTo && (
        <div className="flex items-center gap-2 text-xs text-base-content/60">
          <span>Replying to <b>@{replyingTo}</b></span>
          <button
            onClick={onCancelReply}
            aria-label="Cancel reply"
            className="hover:text-base-content transition-colors"
          >
            <HiXMark className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? "Write a comment..."}
          rows={1}
          className="textarea flex-1 rounded-2xl min-h-10 max-h-32 resize-none text-sm"
        />
        <Button
          onClick={handleSubmit}
          disabled={!text.trim()}
          loading={loading}
          className="btn-primary h-10"
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export default CommentInput;

interface CommentInputProps {
  onSubmit: (text: string) => void;
  loading: boolean;
  placeholder?: string;
  replyingTo?: string;
  onCancelReply?: () => void;
}
