import { ReactNode } from "react";
import { HiChevronRight } from "react-icons/hi2";

type ToggleControl = {
  kind: "toggle";
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

type DropdownControl = {
  kind: "dropdown";
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  disabled?: boolean;
};

type ActionControl = {
  kind: "action";
  onClick: () => void;
  tone?: "default" | "danger";
};

/** Control variants a settings option can render. Add new kinds here. */
export type SettingsControl = ToggleControl | DropdownControl | ActionControl;

interface SettingsOptionProps {
  icon: ReactNode;
  title: string;
  description: string;
  /** When set, replaces the description and renders in the error color. */
  error?: string;
  /** Accessible name for the control. Falls back to `title`. */
  controlLabel?: string;
  control: SettingsControl;
}

function renderInput(control: SettingsControl, ariaLabel: string) {
  if (control.kind === "toggle") {
    return (
      <input
        type="checkbox"
        role="switch"
        aria-label={ariaLabel}
        className="toggle toggle-primary shrink-0"
        checked={control.checked}
        disabled={control.disabled}
        onChange={(e) => control.onChange(e.target.checked)}
      />
    );
  }

  if (control.kind === "dropdown") {
    return (
      <select
        aria-label={ariaLabel}
        className="select rounded-2xl bg-base-100 min-h-12 w-36 sm:w-44 shrink-0"
        value={control.value}
        disabled={control.disabled}
        onChange={(e) => control.onChange(e.target.value)}
      >
        {control.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <HiChevronRight
      aria-hidden
      className="shrink-0 text-base-content/30 transition-transform group-hover:translate-x-0.5"
    />
  );
}

/**
 * One row in a settings list: an icon, a title, a description, and a control.
 * The control is a toggle, a dropdown, or an action (the whole row becomes a
 * button). Presentational only; the owning page holds the state and handlers.
 */
function SettingsOption({
  icon,
  title,
  description,
  error,
  controlLabel,
  control,
}: SettingsOptionProps) {
  const danger = control.kind === "action" && control.tone === "danger";

  const body = (
    <>
      <span className="flex items-center gap-3.5 min-w-0">
        <span
          aria-hidden
          className={`shrink-0 text-xl ${danger ? "text-error" : "text-base-content/40"}`}
        >
          {icon}
        </span>
        <span className="min-w-0">
          <span
            className={`block text-sm font-medium ${danger ? "text-error" : ""}`}
          >
            {title}
          </span>
          <span
            className={`block text-xs ${error ? "text-error" : "text-base-content/70"}`}
          >
            {error ?? description}
          </span>
        </span>
      </span>

      {renderInput(control, controlLabel ?? title)}
    </>
  );

  if (control.kind === "action") {
    return (
      <button
        type="button"
        onClick={control.onClick}
        className={`group flex w-full items-center justify-between gap-3 p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset ${
          danger
            ? "hover:bg-error/10 focus-visible:ring-error/50"
            : "hover:bg-base-300/50 focus-visible:ring-primary/50"
        }`}
      >
        {body}
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 p-4">{body}</div>
  );
}

export default SettingsOption;
