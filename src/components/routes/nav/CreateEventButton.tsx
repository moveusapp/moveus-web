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
      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold outline-none transition-[filter,background-color] duration-150 ease-out hover:brightness-95 active:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        active
          ? "bg-primary text-primary-content"
          : "bg-secondary text-primary"
      } ${className ?? ""}`}
    >
      <HiPlus size={20} strokeWidth={2.5} />
      <span>{strings.nav.createEvent}</span>
    </Link>
  );
}

export default CreateEventButton;
