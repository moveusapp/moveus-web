import {
  HiOutlineHome,
  HiOutlineBell,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { HiOutlineChat, HiOutlineSearch } from "react-icons/hi";
import { useProfile } from "@/context/profile-context";
import { Link, useLocation } from "react-router-dom";

const items = [
  {
    label: "Home",
    to: "/home",
    icon: HiOutlineHome,
  },
  {
    label: "Search",
    to: "/search",
    icon: HiOutlineSearch,
  },
  {
    label: "Notifications",
    to: "/notifications",
    icon: HiOutlineBell,
    badge: "",
  },
  {
    label: "Messages",
    to: "/chat",
    icon: HiOutlineChat,
    badge: "",
  },
  {
    label: "Profile",
    to: "/profile",
    icon: HiOutlineUserCircle,
  },
];

function MobileNav() {
  const location = useLocation();
  const { profile } = useProfile();

  const isNavItemActive = (to: string) => {
    if (location.pathname === to) {
      return true;
    }
    if (to === "/profile" && location.pathname === `/user/${profile?.username}`) {
      return true;
    }

    return false;
  };

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-base-200 border-t border-base-300 safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = isNavItemActive(item.to);
          return (
            <Link
              key={item.label}
              to={item.to}
              className="flex flex-col items-center gap-0.5 py-1 px-3 relative"
              aria-label={item.label}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary" />
              )}
              <span className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={isActive ? "text-primary" : "text-base-content/60"}
                />
                {item.badge && (
                  <span className="absolute -top-1 -right-1.5 min-w-[16px] h-[16px] flex items-center justify-center rounded-full bg-error text-white text-[9px] font-bold px-0.5">
                    {item.badge}
                  </span>
                )}
              </span>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-primary" : "text-base-content/50"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileNav;
