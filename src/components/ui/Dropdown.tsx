import { useCallback, useEffect, useRef, useState } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

function Dropdown<T>({
  value,
  setValue,
  options,
  classname,
  defaultName,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);

  const name = options.find((o) => o.value === value)?.name ?? defaultName;

  const outerDiv = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (!outerDiv.current?.contains(e.target as Node)) setOpen(false);
    },
    [setOpen],
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div
      ref={outerDiv}
      className={
        "relative font-medium text-background cursor-pointer sm:text-2xl " +
        classname
      }
    >
      <div
        className={
          "flex items-center justify-between rounded-[15px] bg-accent px-3 py-1 " +
          (open && "rounded-b-none")
        }
        onClick={() => setOpen(!open)}
      >
        <p className="pr-4">{name}</p>
        {open ? (
          <GoTriangleUp
            className="text-foreground"
            onClick={() => setOpen(false)}
          />
        ) : (
          <GoTriangleDown
            className="text-foreground"
            onClick={(e) => {
              setOpen(true);
              e.stopPropagation();
            }}
          />
        )}
      </div>
      {open && (
        <div className="absolute bg-accent rounded-b-[15px] w-full overflow-auto max-h-[30vh] z-10">
          {options.map((option) => (
            <div
              key={option.name}
              onClick={() => {
                setOpen(false);
                setValue(option.value);
              }}
              className="px-3 hover:bg-primary first:pt-1 last:pb-1"
            >
              <span>{option.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;

interface DropdownProps<T> {
  value: T;
  setValue: (x: T) => void;
  options: Option<T>[];
  defaultName?: string;
  classname?: string;
}
