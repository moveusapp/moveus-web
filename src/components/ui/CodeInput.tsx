import { ClipboardEvent, KeyboardEvent, useRef } from "react";

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
  /** Fires once the code reaches `length` characters. */
  onComplete?: (value: string) => void;
  length?: number;
  disabled?: boolean;
  hasError?: boolean;
  autoFocus?: boolean;
  /** Accessible name for the group; each box is labelled "<ariaLabel> N". */
  ariaLabel?: string;
}

const NON_ALPHANUMERIC = /[^a-zA-Z0-9]/g;

const sanitize = (raw: string) =>
  raw.replace(NON_ALPHANUMERIC, "").toUpperCase();

const CodeInput = ({
  value,
  onChange,
  onComplete,
  length = 6,
  disabled = false,
  hasError = false,
  autoFocus = false,
  ariaLabel,
}: CodeInputProps) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const focusBox = (index: number) => {
    const clamped = Math.max(0, Math.min(length - 1, index));
    const box = inputsRef.current[clamped];
    box?.focus();
    box?.select();
  };

  const commit = (next: string) => {
    const trimmed = next.slice(0, length);
    onChange(trimmed);
    if (trimmed.length === length) onComplete?.(trimmed);
  };

  // Replaces the char at `index` (or appends if the code is shorter), keeping
  // the value gapless so each box maps to one character left to right.
  const insertAt = (index: number, chars: string) => {
    if (!chars) return;
    const next = (value.slice(0, index) + chars + value.slice(index + 1)).slice(
      0,
      length,
    );
    commit(next);
    focusBox(index + chars.length);
  };

  const handleChange = (index: number, raw: string) => {
    insertAt(index, sanitize(raw));
  };

  const handlePaste = (index: number, e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    insertAt(index, sanitize(e.clipboardData.getData("text")));
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (value[index]) {
        commit(value.slice(0, index) + value.slice(index + 1));
      } else if (index > 0) {
        commit(value.slice(0, index - 1) + value.slice(index));
        focusBox(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusBox(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusBox(index + 1);
    }
  };

  return (
    <div role="group" aria-label={ariaLabel} className="flex gap-2 sm:gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="text"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={value[index] ?? ""}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          aria-invalid={hasError}
          aria-label={ariaLabel ? `${ariaLabel} ${index + 1}` : undefined}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(index, e)}
          onFocus={(e) => e.target.select()}
          className={`input flex-1 min-w-0 h-14 sm:h-16 text-center text-2xl font-bold rounded-2xl px-0 ${
            hasError ? "input-error" : ""
          }`}
        />
      ))}
    </div>
  );
};

export default CodeInput;
