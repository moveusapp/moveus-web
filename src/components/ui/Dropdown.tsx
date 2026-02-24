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
  placeholder = "Select an option",
  error,
  helperText,
  className = "",
  required = false
}: DropdownProps<T>) {
  const hasError = !!error;

  return (
    <fieldset className={`fieldset ${className}`}>
      {label && <legend className="fieldset-legend">{label}</legend>}
      <select
        required={required}
        className="rounded-2xl w-full select"
        value={value !== null ? String(value) : ""}
        onChange={(e) => {
          const selectedOption = options.find(
            (opt) => String(opt.value) === e.target.value
          );
          if (selectedOption) {
            onChange(selectedOption.value);
          }
        }}
        aria-invalid={hasError}
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
      {helperText && !hasError && (
        <span className="fieldset-helper-text">{helperText}</span>
      )}
      {hasError && (
        <span className="fieldset-helper-text text-error">{error}</span>
      )}
    </fieldset>
  );
}

export default Dropdown;