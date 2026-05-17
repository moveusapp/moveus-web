import { forwardRef } from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

type Props = {
  message: string;
  title?: string;
};

const FormError = forwardRef<HTMLDivElement, Props>(
  ({ message, title }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className="flex items-start gap-3 rounded-2xl border border-error/30 bg-error/10 p-4 text-sm text-error"
      >
        <HiOutlineExclamationTriangle className="mt-0.5 h-5 w-5 shrink-0" />
        {title ? (
          <div className="space-y-0.5">
            <p className="font-medium">{title}</p>
            <p className="text-error/80">{message}</p>
          </div>
        ) : (
          <p>{message}</p>
        )}
      </div>
    );
  },
);

FormError.displayName = "FormError";

export default FormError;
