import { InputHTMLAttributes, useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  error?: string;
  className?: string;
}

const TextInput = ({ 
  label, 
  error,
  className = "",
  type,
  ...props 
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const hasError = !!error;
  const isPassword = type === "password";

  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <fieldset className={`fieldset ${className}`}>
      <legend className="fieldset-legend">{label}</legend>
      <div className="relative">
        <input
          {...props}
          type={inputType}
          className="input w-full"
          aria-invalid={hasError}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <HiEye className="w-5 h-5" />
            ) : (
              <HiEyeSlash className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {hasError && (
        <div className="fieldset-helper-text text-error">
          {error}
        </div>
      )}
    </fieldset>
  );
};

export default TextInput;