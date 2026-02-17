import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";

function TextArea({
  validate,
  value,
  setValue,
  name,
  label,
  placeholder,
  onChange,
  className,
  rows,
  cols,
}: TextAreaProps) {
  const id = `TextArea-${name}`;
  placeholder = placeholder ?? name;
  const [error, setError] = useState("");

  useEffect(() => {
    if (validate === undefined || value === "") {
      setError("");
      return;
    }
    setError(validate(value) ?? "");
  }, [setError, value, validate]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue && setValue(e.currentTarget.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <label htmlFor={id} className={className}>
      {label && <p className="my-2">{label}</p>}
      <textarea
        name={name}
        id={id}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        value={value}
        onChange={handleChange}
        className={error && "border-error! outline-error!"}
      />
      <p className="text-error my-1 mx-4 text-sm">{error}</p>
    </label>
  );
}

export default TextArea;

interface TextAreaProps {
  validate?: (value: string) => string | undefined;
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  className?: string;
  rows?: number;
  cols?: number;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}
