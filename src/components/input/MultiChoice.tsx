import { useCallback } from "react";

function MultiChoice<T>({
  value,
  setValue,
  options,
  classname,
}: MultiChoiceProps<T>) {
  const handleClick = useCallback(
    (clickedValue: T) => {
      if (value.includes(clickedValue)) {
        setValue(value.filter((v) => v !== clickedValue));
        return;
      }
      setValue(value.concat(clickedValue));
    },
    [setValue, value],
  );

  return (
    <div className={"flex flex-col w-full gap-3 " + classname}>
      {options.map((option) => (
        <button
          key={option.name}
          onClick={() => handleClick(option.value)}
          className={
            "text-left px-6 " +
            (value.includes(option.value) ? "" : "text-foreground bg-block")
          }
        >
          {option.name}
        </button>
      ))}
    </div>
  );
}

export default MultiChoice;

interface MultiChoiceProps<T> {
  value: T[];
  setValue: React.Dispatch<React.SetStateAction<T[]>>;
  options: Option<T>[];
  classname?: string;
}
