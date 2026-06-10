import { Link, useLocation } from "react-router-dom";
import { HiPlus } from "react-icons/hi2";
import strings from "@/translations/strings";

interface CreateEventButtonProps {
  /** Dismiss the drawer on navigate; unused in the always-visible sidebar. */
  onClick?: () => void;
  /** Spacing from the preceding nav, supplied by the caller. */
  className?: string;
}

/**
 * Full-width secondary-accent action shared by the desktop LeftSidebar and the
 * mobile drawer. The bottom MobileNav renders Create Event as a FAB instead, so
 * it does not use this.
 */
function CreateEventButton({ onClick, className }: CreateEventButtonProps) {
  const active = useLocation().pathname === "/create-event";

  return (
    <Link
      to="/create-event"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
        active
          ? "bg-primary text-secondary"
          : "bg-secondary text-primary hover:brightness-95 active:brightness-90"
      } ${className ?? ""}`}
    >
      <HiPlus size={20} strokeWidth={2.5} />
      <span>{strings.nav.createEvent}</span>
    </Link>
  );
}

export default CreateEventButton;
