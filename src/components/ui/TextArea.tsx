import {  TextareaHTMLAttributes } from "react";

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label: string;
  error?: string;
  className?: string;
}

const TextArea = ({ 
  label, 
  error,
  className = "", 
  ...props 
}: TextAreaProps) => {
  const hasError = !!error;

  return (
    <fieldset className={`fieldset ${className}`}>
      <legend className="fieldset-legend">{label}</legend>
      <textarea
        {...props}
        className="textarea rounded-2xl h-24 w-full"
      />
      {hasError && (
        <div className="fieldset-helper-text text-error">
          {error}
        </div>
      )}
    </fieldset>
  );
};

export default TextArea;