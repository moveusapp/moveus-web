import { PropsWithChildren } from "react";

function Button({ children, loading, disabled, className, onClick, onMouseEnter, onMouseLeave, type }: ButtonProps) {
  return (
    <button
      type={!type ? "button" : type as any}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled || loading}
      className={`btn rounded-2xl ${className} ${loading ? "btn-disabled" : ""}`}
    >
      <div className="flex flex-row gap-1">
        {loading ? (
          <div className="loading loading-dots loading-xs" />
        ) : (
          <>{children}</>
        )}
      </div>
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
