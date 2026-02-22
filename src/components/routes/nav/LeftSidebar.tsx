import {
  HiOutlineHome,
  HiOutlineBell,
  HiOutlineUserCircle,
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

function LeftSidebar() {
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
    <div className="flex flex-col h-full w-full py-6 px-4">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-6 mb-6">
        <img src={moveusLogo} alt="MoveUs" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isNavItemActive(item.to);
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-primary text-primary-content shadow-sm"
                    : "text-base-content/70 hover:bg-base-100 hover:text-base-content"
                }`}
            >
              <span className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
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
        <button className="flex items-center gap-3 px-3 py-2.5 mt-4 rounded-xl bg-secondary text-primary text-sm font-semibold hover:brightness-95 transition-all">
          <HiPlus size={20} />
          <span>Create Event</span>
        </button>
      </nav>

      {/* Divider */}
      <div className="border-t border-base-300 my-4" />

      {/* Settings */}
      <Link
        to="/settings"
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
          ${
            isNavItemActive("/settings")
            ? "bg-primary text-primary-content shadow-sm"
            : "text-base-content/70 hover:bg-base-100 hover:text-base-content"
          }`}
      >
        <HiOutlineCog6Tooth
          size={20}
          strokeWidth={isNavItemActive("/settings") ? 2.5 : 2}
        />
        <span>Settings</span>
      </Link>

      <div className="my-1" />
      
      {/* User card */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-base-100 border border-base-300">
        <UserAvatar
          userId={profile?.id!}
          className="w-9 h-9"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold truncate text-base-content">
            {displayName(
              profile?.username!,
              profile?.firstName!,
              profile?.lastName!,
            )}
          </span>
          <span className="text-xs text-neutral truncate">
            @{profile?.username}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
