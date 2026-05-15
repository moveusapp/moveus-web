import { HiCheck, HiPlus } from "react-icons/hi";
import { enumToOptions } from "@/utils/enum-to-options";

interface Props {
  enumObj: Record<string, string>;
  value: string[];
  onChange: (value: string[]) => void;
}

function MultiChoiceQuestion({ enumObj, value, onChange }: Props) {
  const options = enumToOptions(enumObj);

  const toggle = (v: string) => {
    if (value.includes(v)) {
      onChange(value.filter((x) => x !== v));
    } else {
      onChange([...value, v]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = value.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => toggle(option.value)}
            className={`inline-flex items-center gap-1.5 min-h-11 px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-150 ${
              isSelected
                ? "bg-primary text-primary-content border-primary"
                : "bg-base-200 text-base-content border-base-300 hover:border-primary/40 hover:bg-base-100"
            }`}
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
  );
}

export default MultiChoiceQuestion;
