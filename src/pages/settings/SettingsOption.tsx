import { ReactNode } from "react";

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

/** Control variants a settings option can render. Add new kinds here. */
export type SettingsControl = ToggleControl | DropdownControl;

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

function renderControl(control: SettingsControl, ariaLabel: string) {
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

  return (
    <select
      aria-label={ariaLabel}
      className="select rounded-2xl bg-base-100 w-32 shrink-0"
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

/**
 * One row in a settings list: an icon, a title, a description, and a control.
 * Presentational only; the owning page holds the state and handlers.
 */
function SettingsOption({
  icon,
  title,
  description,
  error,
  controlLabel,
  control,
}: SettingsOptionProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-3 p-4">
      <div className="flex flex-row items-center gap-3.5 min-w-0">
        <span aria-hidden className="shrink-0 text-xl text-base-content/40">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium">{title}</p>
          <p
            className={`text-xs ${error ? "text-error" : "text-base-content/70"}`}
          >
            {error ?? description}
          </p>
        </div>
      </div>

      {renderControl(control, controlLabel ?? title)}
    </div>
  );
}

export default SettingsOption;
