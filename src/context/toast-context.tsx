import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import ToastViewport from "@/components/ui/ToastViewport";

export type ToastVariant = "success" | "error" | "info";

export interface Toast {
  id: string;
  variant: ToastVariant;
  title?: string;
  message: string;
  duration: number;
}

export interface ToastOptions {
  variant?: ToastVariant;
  title?: string;
  message: string;
  duration?: number;
}

const DEFAULT_DURATION = 4000;
const ERROR_DURATION = 6000;
const MAX_TOASTS = 3;

type ToastContextType = {
  show: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  success: (message: string, title?: string) => string;
  error: (message: string, title?: string) => string;
  info: (message: string, title?: string) => string;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback((options: ToastOptions) => {
    const variant = options.variant ?? "info";
    const toast: Toast = {
      id: newId(),
      variant,
      title: options.title,
      message: options.message,
      duration:
        options.duration ??
        (variant === "error" ? ERROR_DURATION : DEFAULT_DURATION),
    };
    // Keep the newest toasts; drop the oldest once the cap is exceeded.
    setToasts((current) => [...current, toast].slice(-MAX_TOASTS));
    return toast.id;
  }, []);

  const success = useCallback(
    (message: string, title?: string) =>
      show({ variant: "success", message, title }),
    [show],
  );

  const error = useCallback(
    (message: string, title?: string) =>
      show({ variant: "error", message, title }),
    [show],
  );

  const info = useCallback(
    (message: string, title?: string) =>
      show({ variant: "info", message, title }),
    [show],
  );

  const value = useMemo(
    () => ({ show, dismiss, success, error, info }),
    [show, dismiss, success, error, info],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
};
