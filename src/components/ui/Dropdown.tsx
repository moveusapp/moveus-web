import Field from "./Field";
import strings from "@/translations/strings";

interface DropdownProps<T> {
  label?: string;
  value: T | null;
  setValue: (value: T) => void;
  options: { label: string; value: T }[];
  placeholder?: string;
  error?: string;
  helperText?: string;
  className?: string;
  required?: boolean;
}

function Dropdown<T = string>({
  label,
  value,
  setValue: onChange,
  options,
  placeholder = strings.ui.selectAnOption,
  error,
  helperText,
  className = "",
  required = false,
}: DropdownProps<T>) {
  return (
    <Field
      label={label}
      error={error}
      helperText={helperText}
      className={className}
    >
      <select
        required={required}
        className="select w-full min-h-12 rounded-2xl"
        value={value !== null ? String(value) : ""}
        onChange={(e) => {
          const selectedOption = options.find(
            (opt) => String(opt.value) === e.target.value,
          );
          if (selectedOption) onChange(selectedOption.value);
        }}
        aria-invalid={!!error}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export default Dropdown;
