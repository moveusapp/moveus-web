import Field from "./Field";
import { chipClass, optionCardClass } from "./choice-styles";

interface SingleChoiceProps<T> {
  value: T | null | undefined;
  setValue: (value: T) => void;
  options: { label: string; value: T }[];
  /**
   * `cards` (default): full-width radio cards for spotlight, one-per-screen
   * contexts like the survey. `chips`: compact pills that sit at the same
   * density as the surrounding form controls.
   */
  variant?: "cards" | "chips";
  label?: string;
  /** Accessible name for the radio group when there's no visible label. */
  ariaLabel?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

/**
 * Single-select sharing the choice-control family with MultiChoice and the text
 * inputs. Cards for spotlight contexts, chips for dense forms.
 */
function SingleChoice<T>({
  value,
  setValue,
  options,
  variant = "cards",
  label,
  ariaLabel,
  error,
  helperText,
  className,
}: SingleChoiceProps<T>) {
  return (
    <Field
      label={label}
      error={error}
      helperText={helperText}
      className={className}
    >
      {variant === "chips" ? (
        <div
          role="radiogroup"
          aria-label={ariaLabel}
          className="flex flex-wrap gap-2"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={String(option.value)}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setValue(option.value)}
                className={chipClass(isSelected)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : (
        <div
          role="radiogroup"
          aria-label={ariaLabel}
          className="flex flex-col gap-2.5"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={String(option.value)}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setValue(option.value)}
                className={optionCardClass(isSelected)}
              >
                <span>{option.label}</span>
                <span
                  className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors duration-150 ${
                    isSelected
                      ? "border-primary-content"
                      : "border-base-content/20 group-hover:border-primary/40"
                  }`}
                  aria-hidden
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full bg-primary-content transition-opacity duration-150 ${
                      isSelected ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </span>
              </button>
            );
          })}
        </div>
      )}
    </Field>
  );
}

export default SingleChoice;
