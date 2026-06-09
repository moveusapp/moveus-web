import { HiCheck, HiPlus } from "react-icons/hi";
import Field from "./Field";
import { chipClass } from "./choice-styles";

interface MultiChoiceProps<T> {
  value: T[];
  setValue: (value: T[]) => void;
  options: { label: string; value: T }[];
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

/**
 * Multi-select as a wrap of pill chips with a +/✓ affordance. Shares the
 * choice-control family (see choice-styles) with SingleChoice and the inputs.
 */
function MultiChoice<T>({
  value,
  setValue,
  options,
  label,
  error,
  helperText,
  className,
}: MultiChoiceProps<T>) {
  const toggle = (v: T) => {
    if (value.includes(v)) {
      setValue(value.filter((x) => x !== v));
    } else {
      setValue([...value, v]);
    }
  };

  return (
    <Field
      label={label}
      error={error}
      helperText={helperText}
      className={className}
    >
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value.includes(option.value);
          return (
            <button
              key={String(option.value)}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggle(option.value)}
              className={chipClass(isSelected)}
            >
              {isSelected ? (
                <HiCheck className="text-base shrink-0" />
              ) : (
                <HiPlus className="text-base shrink-0 opacity-60" />
              )}
              {option.label}
            </button>
          );
        })}
      </div>
    </Field>
  );
}

export default MultiChoice;
