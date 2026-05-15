import { enumToOptions } from "@/utils/enum-to-options";

interface Props {
  enumObj: Record<string, string>;
  value: string | null | undefined;
  onChange: (value: string) => void;
}

function SingleChoiceQuestion({ enumObj, value, onChange }: Props) {
  const options = enumToOptions(enumObj);

  return (
    <div role="radiogroup" className="flex flex-col gap-2.5">
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className={`group flex items-center justify-between gap-3 w-full min-h-14 px-5 rounded-2xl border text-left font-medium transition-colors duration-150 ${
              isSelected
                ? "bg-primary text-primary-content border-primary"
                : "bg-base-200 border-base-300 hover:border-primary/40 hover:bg-base-100"
            }`}
          >
            <span>{option.label}</span>
            <span
              className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors duration-150 ${
                isSelected
                  ? "border-primary-content"
                  : "border-base-300 group-hover:border-primary/40"
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
  );
}

export default SingleChoiceQuestion;
