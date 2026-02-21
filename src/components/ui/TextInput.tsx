import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  useEffect,
  useState,
} from "react";

function TextInput({
  validate,
  value,
  setValue,
  name,
  label,
  placeholder,
  onBlur,
  onChange,
  className,
  type = "text",
}: TextInputProps) {
  const id = `textinput-${name}`;
  placeholder = placeholder ?? name;
  const [error, setError] = useState("");

  useEffect(() => {
    if (validate === undefined || value === "") {
      setError("");
      return;
    }
    setError(validate(value) ?? "");
  }, [setError, value, validate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(e.currentTarget.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <label htmlFor={id} className={className}>
      {label && <p className="my-2">{label}</p>}
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        onBlur={onBlur}
        value={value}
        onChange={handleChange}
        className={error && "border-error! outline-error!"}
      />
      <p className="text-error my-1 mx-4 text-sm">{error}</p>
    </label>
  );
}

export default TextInput;

interface TextInputProps {
  validate?: (value: string) => string | undefined;
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  className?: string;
  type?: "text" | "password" | "email" | "number";
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
