import { useCallback, useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  HiCheckCircle,
  HiExclamationTriangle,
  HiInformationCircle,
  HiXMark,
} from "react-icons/hi2";
import type { Toast, ToastVariant } from "@/context/toast-context";

const EXIT_MS = 150;

type VariantStyle = {
  alert: string;
  Icon: IconType;
  role: "status" | "alert";
  live: "polite" | "assertive";
};

const VARIANTS: Record<ToastVariant, VariantStyle> = {
  success: {
    alert: "alert-success",
    Icon: HiCheckCircle,
    role: "status",
    live: "polite",
  },
  error: {
    alert: "alert-error",
    Icon: HiExclamationTriangle,
    role: "alert",
    live: "assertive",
  },
  info: {
    alert: "alert-info",
    Icon: HiInformationCircle,
    role: "status",
    live: "polite",
  },
};

type ToastItemProps = {
  toast: Toast;
  onDismiss: (id: string) => void;
};

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const { alert, Icon, role, live } = VARIANTS[toast.variant];
  const [leaving, setLeaving] = useState(false);

  const remainingRef = useRef(toast.duration);
  const startRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const exitingRef = useRef(false);

  const beginExit = useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    setLeaving(true);
    setTimeout(() => onDismiss(toast.id), EXIT_MS);
  }, [onDismiss, toast.id]);

  const pause = useCallback(() => {
    if (!timerRef.current) return;
    clearTimeout(timerRef.current);
    timerRef.current = undefined;
    remainingRef.current -= Date.now() - startRef.current;
  }, []);

  const resume = useCallback(() => {
    if (timerRef.current || leaving) return;
    startRef.current = Date.now();
    timerRef.current = setTimeout(beginExit, Math.max(remainingRef.current, 0));
  }, [beginExit, leaving]);

  // Start the auto-dismiss countdown on mount.
  useEffect(() => {
    startRef.current = Date.now();
    timerRef.current = setTimeout(beginExit, remainingRef.current);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [beginExit]);

  return (
    <div
      role={role}
      aria-live={live}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      className={`alert ${alert} alert-soft pointer-events-auto grid w-[min(92vw,26rem)] grid-cols-[auto_1fr_auto] items-start gap-3 rounded-2xl border-0 p-4 shadow-lg ${
        leaving
          ? "animate-toast-out sm:animate-toast-out-x"
          : "animate-toast-in sm:animate-toast-in-x"
      }`}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0 space-y-0.5">
        {toast.title && (
          <p className="text-sm font-semibold leading-snug">{toast.title}</p>
        )}
        <p className="text-sm leading-snug break-words">{toast.message}</p>
      </div>
      <button
        type="button"
        onClick={beginExit}
        aria-label="Dismiss notification"
        className="btn btn-ghost btn-xs btn-circle -mt-0.5 -mr-0.5 shrink-0"
      >
        <HiXMark className="h-4 w-4" />
      </button>
    </div>
  );
}

type ToastViewportProps = {
  toasts: Toast[];
  onDismiss: (id: string) => void;
};

function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  return (
    <div
      role="region"
      aria-label="Notifications"
      className="pointer-events-none fixed inset-x-0 top-0 z-[1000] flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:top-auto sm:right-0 sm:bottom-0 sm:items-end sm:p-6"
    >
      {/* Newest first: topmost on mobile, closest to view on desktop. */}
      {[...toasts].reverse().map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

export default ToastViewport;
