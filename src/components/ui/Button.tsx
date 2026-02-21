import { PropsWithChildren } from "react";

function Button({ children, loading, className, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
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
  className?: string;
  onClick?: () => void;
}

export default Button;
