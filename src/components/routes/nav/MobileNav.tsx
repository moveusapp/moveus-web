import { HiPlus } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import strings from "@/translations/strings";
import { getNavItems, NavItem } from "./nav-items";

function MobileNav() {
  const location = useLocation();
  const isActive = (to: string) => location.pathname === to;

  // Four destinations split around the central Create Event FAB, drawn from the
  // shared nav list. Calendar lives in the menu drawer; the old five-tab bar was
  // too cramped to read, so it is intentionally omitted here.
  const items = getNavItems();
  const pick = (to: string) => items.find((item) => item.to === to)!;
  const leftItems: NavItem[] = [pick("/home"), pick("/search")];
  const rightItems: NavItem[] = [pick("/notifications"), pick("/chat")];

  const renderTab = (item: NavItem) => {
    const Icon = item.icon;
    const active = isActive(item.to);
    return (
      <Link
        key={item.to}
        to={item.to}
        aria-label={item.label}
        aria-current={active ? "page" : undefined}
        className="relative flex flex-1 flex-col items-center justify-center gap-0.5 px-2 outline-none focus-visible:bg-base-300/50"
      >
        {active && (
          <span className="absolute top-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary" />
        )}
        <span className="relative">
          <Icon
            size={22}
            strokeWidth={active ? 2.5 : 2}
            className={active ? "text-primary" : "text-base-content/60"}
          />
          {item.badge && (
            <span className="absolute -top-1 -right-1.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-error px-0.5 text-[9px] font-bold text-white">
              {item.badge}
            </span>
          )}
        </span>
        <span
          className={`w-full truncate text-center text-[10px] font-medium ${
            active ? "text-primary" : "text-base-content/50"
          }`}
        >
          {item.label}
        </span>
      </Link>
    );
  };

  const createActive = isActive("/create-event");

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-base-200 border-t border-base-300 safe-area-pb">
      <div className="relative flex h-16 items-stretch">
        {leftItems.map(renderTab)}

        {/* Reserve the center column; the FAB floats above it on the bar edge. */}
        <div className="flex-1" aria-hidden="true" />

        {rightItems.map(renderTab)}

        <Link
          to="/create-event"
          aria-label={strings.nav.createEvent}
          aria-current={createActive ? "page" : undefined}
          className={`absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-5 items-center justify-center rounded-full ring-[6px] ring-base-200 outline-none transition-[transform,filter] duration-150 active:scale-95 focus-visible:ring-secondary/60 ${
            createActive
              ? "bg-primary text-secondary"
              : "bg-secondary text-primary hover:brightness-95"
          }`}
        >
          <HiPlus size={26} strokeWidth={2.5} />
        </Link>
      </div>
    </nav>
  );
}

export default MobileNav;
