import { useState } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { HiCheck } from "react-icons/hi";

function Dropdown<T>({
  value,
  setValue,
  options,
  defaultName,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);

  const name = options.find((o) => o.value === value)?.name ?? defaultName;

  const selectItem = (option: Option<T>) => {
    if (document.activeElement) {
      (document.activeElement as HTMLDivElement).blur();
    }
    setValue(option.value);
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        role="button"
        className="btn btn-primary m-1"
      >
        {name}
        {open ? <GoTriangleUp /> : <GoTriangleDown />}
      </div>
      <div
        tabIndex={-1}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="dropdown-content menu bg-base-100 rounded-2xl gap-1 z-1 w-52 p-2 shadow-sm"
      >
        {options.map((option) => (
          <button
            onClick={() => selectItem(option)}
            className="btn justify-between"
          >
            {option.name}
            {option.value === value && <HiCheck />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;

interface DropdownProps<T> {
  value: T;
  setValue: (x: T) => void;
  options: Option<T>[];
  defaultName?: string;
}
