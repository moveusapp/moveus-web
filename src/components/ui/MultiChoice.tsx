import { useCallback } from "react";
import { HiCheck } from "react-icons/hi";

function MultiChoice<T>({
  label,
  value,
  setValue,
  options,
  className,
}: MultiChoiceProps<T>) {
  const handleClick = useCallback(
    (e: React.MouseEvent, clickedValue: T) => {
      e.preventDefault(); // Prevent form submission
      
      if (value.includes(clickedValue)) {
        setValue(value.filter((v) => v !== clickedValue));
      } else {
        setValue([...value, clickedValue]);
      }
    },
    [setValue, value],
  );

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-2">{label}</label>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = value.includes(option.value);
          
          return (
            <button
              key={option.label}
              type="button"
              onClick={(e) => handleClick(e, option.value)}
              className={`
                flex flex-row items-center gap-1 px-4 py-2 rounded-2xl text-sm font-medium transition-all
                ${
                  isSelected
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 text-base-content hover:bg-base-300"
                }
              `}
            >
              {isSelected && <HiCheck />}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MultiChoice;

interface MultiChoiceProps<T> {
  label?: string;
  value: T[];
  setValue: React.Dispatch<React.SetStateAction<T[]>>;
  options: { label: string; value: T }[];
  className?: string;
}