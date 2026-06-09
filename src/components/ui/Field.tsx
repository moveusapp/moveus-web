import { ReactNode } from "react";

interface FieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Optional label / error / helper chrome shared by the form primitives. When
 * none of label, error, or helper is supplied (e.g. inside the survey, where
 * the question title is rendered separately) the control renders bare, so the
 * same primitive serves both labelled forms and the survey flow.
 */
function Field({ label, error, helperText, className = "", children }: FieldProps) {
  if (!label && !error && !helperText) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  return (
    <fieldset className={`fieldset ${className}`}>
      {label && <legend className="fieldset-legend">{label}</legend>}
      {children}
      {error ? (
        <p className="fieldset-helper-text text-error" role="alert">
          {error}
        </p>
      ) : helperText ? (
        <p className="fieldset-helper-text">{helperText}</p>
      ) : null}
    </fieldset>
  );
}

export default Field;
