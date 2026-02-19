import { useCallback, useState } from "react";

function Toggle({ defaultValue, onToggleChanged, className }: ToggleProps) {  
  const [value, setValue] = useState(defaultValue);

  const handleClick = useCallback(() => {
    setValue((p) => {
      onToggleChanged(!p);
      return !p;
    });
  }, [setValue, onToggleChanged]);

  return (
    <div
      className={"h-9 rounded-[15px] py-2 bg-block w-16 " + className}
      onClick={handleClick}
    >
      <div
        className={
          "w-5 rounded-full bg-accent transition-all mx-auto h-5 " +
          (value ? "translate-x-3" : "-translate-x-3")
        }
      />
    </div>
  );
}

export default Toggle;

interface ToggleProps {
  defaultValue: boolean;
  onToggleChanged: (value: boolean) => void;
  className?: string;
}
