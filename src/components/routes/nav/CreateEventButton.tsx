import { Link, useLocation } from "react-router-dom";
import { HiPlus } from "react-icons/hi2";
import strings from "@/translations/strings";

interface CreateEventButtonProps {
  onClick?: () => void;
  className?: string;
}

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
