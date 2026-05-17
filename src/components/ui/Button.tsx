import { PropsWithChildren } from "react";

function Button({ children, loading, disabled, className, onClick, onMouseEnter, onMouseLeave, type }: ButtonProps) {
  return (
    <button
      type={!type ? "button" : type as any}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled || loading}
      className={`btn rounded-2xl relative ${className} ${loading ? "btn-disabled" : ""}`}
    >
      <span
        className={`flex flex-row items-center gap-1 ${loading ? "invisible" : ""}`}
      >
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="loading loading-dots loading-xs" />
        </span>
      )}
    </button>
  );
}

interface ButtonProps extends PropsWithChildren {
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  type?: string;
}

export default Button;
