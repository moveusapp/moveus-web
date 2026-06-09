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

const bubbleStyles: Record<Variant, string> = {
  info: "bg-base-200 text-base-content/40",
  error: "bg-error/10 text-error",
};

const defaultIcon: Record<Variant, ReactNode> = {
  info: <HiOutlineSparkles className="h-6 w-6" />,
  error: <HiOutlineExclamationTriangle className="h-6 w-6" />,
};

/**
 * Centered, borderless empty / error state. Matches the app's in-feed empties
 * (a soft icon circle over a short, capped-measure message) rather than sitting
 * in a boxed card, so it belongs on any surface: a feed, a tab, a modal list,
 * or a full not-found page.
 */
function EmptyState({
  variant = "info",
  icon,
  title,
  description,
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`flex flex-col items-center gap-3 px-6 py-10 text-center ${className}`}
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full ${bubbleStyles[variant]}`}
        aria-hidden
      >
        {icon ?? defaultIcon[variant]}
      </span>

      <div className="space-y-1.5">
        <p className="text-base font-semibold text-base-content text-balance">
          {title}
        </p>
        {description && (
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-base-content/60">
            {description}
          </p>
        )}
      </div>

      {children && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
