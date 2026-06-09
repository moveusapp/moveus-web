import { TextareaHTMLAttributes } from "react";
import Field from "./Field";

interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

const TextArea = ({
  label,
  error,
  helperText,
  className = "",
  ...props
}: TextAreaProps) => (
  <Field
    label={label}
    error={error}
    helperText={helperText}
    className={className}
  >
    <textarea
      {...props}
      className="textarea w-full rounded-2xl resize-y leading-relaxed"
      aria-invalid={!!error}
    />
  </Field>
);

export default TextArea;
