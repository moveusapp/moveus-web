import { InputHTMLAttributes, useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import Field from "./Field";
import strings from "@/translations/strings";

interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

const TextInput = ({
  label,
  error,
  helperText,
  className = "",
  type,
  ...props
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <Field
      label={label}
      error={error}
      helperText={helperText}
      className={className}
    >
      <div className="relative">
        <input
          {...props}
          type={inputType}
          className="input w-full min-h-12"
          aria-invalid={!!error}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
            aria-label={
              showPassword ? strings.ui.hidePassword : strings.ui.showPassword
            }
          >
            {showPassword ? (
              <HiEye className="w-5 h-5" />
            ) : (
              <HiEyeSlash className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </Field>
  );
};

export default TextInput;
