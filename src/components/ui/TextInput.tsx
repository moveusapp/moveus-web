import { InputHTMLAttributes } from "react";

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  error?: string;
  className?: string;
}

const TextInput = ({ 
  label, 
  error,
  className = "", 
  ...props 
}: TextInputProps) => {
  const hasError = !!error;

  return (
    <fieldset className={`fieldset ${className}`}>
      <legend className="fieldset-legend">{label}</legend>
      <input
        {...props}
        className="input w-full"
        aria-invalid={hasError}
      />
      {hasError && (
        <div className="fieldset-helper-text text-error">
          {error}
        </div>
      )}
    </fieldset>
  );
};

export default TextInput;