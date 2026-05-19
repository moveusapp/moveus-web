import {
  HiOutlineHome,
  HiOutlineBell,
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiPlus,
} from "react-icons/hi2";
import { HiOutlineChat, HiOutlineSearch } from "react-icons/hi";
import moveusLogo from "@/assets/logos/moveus-logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useProfile } from "@/context/profile-context";
import { displayName } from "@/utils/display-name";
import UserAvatar from "@/components/user/UserAvatar";

const navItems = [
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
    label: "Calendar",
    to: "/calendar",
    icon: HiOutlineCalendarDays,
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
];

function LeftSidebar() {
  const location = useLocation();
  const { profile } = useProfile();

  const isActive = (to: string) => location.pathname === to;

  const isProfileActive =
    location.pathname === "/profile" ||
    (!!profile?.username &&
      location.pathname === `/user/${profile.username}`);

  const navItemClass = (active: boolean) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
      active
        ? "bg-primary text-primary-content shadow-sm"
        : "text-base-content/70 hover:bg-base-100 hover:text-base-content"
    }`;

  return (
    <div className="flex flex-col h-full w-full py-6 px-4">
      {/* Brand */}
      <div className="flex items-center px-3 mb-8">
        <img src={moveusLogo} alt="MoveUs" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);
          return (
            <Link
              key={item.label}
              to={item.to}
              aria-current={active ? "page" : undefined}
              className={navItemClass(active)}
            >
              <span className="relative inline-flex">
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-error text-white text-[10px] font-bold px-1">
                    {item.badge}
                  </span>
                )}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Create Event CTA */}
        <Link
          to="/create-event"
          aria-current={isActive("/create-event") ? "page" : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 mt-4 rounded-xl text-sm font-semibold transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
            isActive("/create-event")
              ? "bg-primary text-secondary"
              : "bg-secondary text-primary hover:brightness-95 active:brightness-90"
          }`}
        >
          <HiPlus size={20} strokeWidth={2.5} />
          <span>Create Event</span>
        </Link>
      </nav>

      {/* Settings */}
      <Link
        to="/settings"
        aria-current={isActive("/settings") ? "page" : undefined}
        className={navItemClass(isActive("/settings"))}
      >
        <HiOutlineCog6Tooth
          size={20}
          strokeWidth={isActive("/settings") ? 2.5 : 2}
        />
        <span>Settings</span>
      </Link>

      {/* Divider */}
      <div className="border-t border-base-300 my-3" />

      {/* User card — links to own profile */}
      <Link
        to="/profile"
        aria-current={isProfileActive ? "page" : undefined}
        aria-label="View your profile"
        className={`group flex items-center gap-3 p-2.5 rounded-xl border transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
          isProfileActive
            ? "bg-primary/10 border-primary/30"
            : "bg-base-100 border-base-300 hover:bg-base-200 hover:border-base-300"
        }`}
      >
        <UserAvatar userId={profile?.id!} className="w-9 h-9 shrink-0" />
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm font-semibold truncate text-base-content">
            {displayName(
              profile?.username!,
              profile?.firstName!,
              profile?.lastName!,
            )}
          </span>
          <span className="text-xs text-base-content/60 truncate">
            @{profile?.username}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default LeftSidebar;
