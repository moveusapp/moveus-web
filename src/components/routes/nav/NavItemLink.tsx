import { Link, useLocation } from "react-router-dom";
import { NavItem } from "./nav-items";

interface NavItemLinkProps {
  item: NavItem;
  onClick?: () => void;
}
function NavItemLink({ item, onClick }: NavItemLinkProps) {
  const location = useLocation();
  const active = location.pathname === item.to;
  const Icon = item.icon;

  return (
    <Link
      to={item.to}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
        active
          ? "bg-primary text-primary-content font-semibold"
          : "text-base-content/70 hover:bg-base-200 hover:text-base-content active:bg-base-200"
      }`}
    >
      <span className="relative inline-flex shrink-0">
        <Icon size={20} strokeWidth={active ? 2.5 : 2} />
        {item.badge && (
          <span className="absolute -top-1.5 -right-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold text-white">
            {item.badge}
          </span>
        )}
      </span>
      <span>{item.label}</span>
    </Link>
  );
}

export default NavItemLink;
