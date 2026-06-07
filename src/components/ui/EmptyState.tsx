import { ReactNode } from "react";
import {
  HiOutlineExclamationTriangle,
  HiOutlineSparkles,
} from "react-icons/hi2";

type Variant = "info" | "error";

type Props = {
  variant?: Variant;
  icon?: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

const variantStyles: Record<Variant, { bubble: string; icon: string }> = {
  info: {
    bubble: "bg-base-300",
    icon: "text-base-content/60",
  },
  error: {
    bubble: "bg-error/10",
    icon: "text-error",
  },
};

const defaultIcon: Record<Variant, ReactNode> = {
  info: <HiOutlineSparkles className="h-5 w-5" />,
  error: <HiOutlineExclamationTriangle className="h-5 w-5" />,
};

function EmptyState({
  variant = "info",
  icon,
  title,
  description,
  children,
  className = "",
}: Props) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`flex items-start gap-5 rounded-2xl border border-base-300 bg-base-200 px-6 py-8 ${className}`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${styles.bubble} ${styles.icon}`}
        aria-hidden
      >
        {icon ?? defaultIcon[variant]}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-base font-medium text-base-content">{title}</p>
        {description && (
          <p className="mt-1.5 text-sm text-base-content/60">{description}</p>
        )}
        {children && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
