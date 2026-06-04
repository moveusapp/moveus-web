import {
  HiOutlineHome,
  HiOutlineBell,
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiPlus,
  HiBeaker,
} from "react-icons/hi2";
import { HiOutlineChat, HiOutlineSearch } from "react-icons/hi";
import moveusLogo from "@/assets/logos/moveus-logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useProfile } from "@/context/profile-context";
import { displayName } from "@/utils/display-name";
import UserAvatar from "@/components/user/UserAvatar";
import strings from "@/translations/strings";

function LeftSidebar() {
  const location = useLocation();
  const { profile } = useProfile();

  const navItems = [
    { label: strings.nav.home, to: "/home", icon: HiOutlineHome },
    { label: strings.nav.search, to: "/search", icon: HiOutlineSearch },
    { label: strings.nav.calendar, to: "/calendar", icon: HiOutlineCalendarDays },
    { label: strings.nav.notifications, to: "/notifications", icon: HiOutlineBell, badge: "" },
    { label: strings.nav.messages, to: "/chat", icon: HiOutlineChat, badge: "" },
  ];

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
      <div className="flex flex-col gap-1.5 px-3 mb-8">
        <span className="inline-flex items-center gap-1.5 self-start text-[11px] font-bold uppercase tracking-wide text-accent">
          <HiBeaker className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          {strings.nav.openBeta}
        </span>
        <img src={moveusLogo} alt={strings.common.brand} className="self-start" />
      </div>

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
          <span>{strings.nav.createEvent}</span>
        </Link>
      </nav>

      <Link
        to="/settings"
        aria-current={isActive("/settings") ? "page" : undefined}
        className={navItemClass(isActive("/settings"))}
      >
        <HiOutlineCog6Tooth
          size={20}
          strokeWidth={isActive("/settings") ? 2.5 : 2}
        />
        <span>{strings.nav.settings}</span>
      </Link>

      <div className="border-t border-base-300 my-3" />

      <Link
        to="/profile"
        aria-current={isProfileActive ? "page" : undefined}
        aria-label={strings.nav.viewProfileAria}
        className={`group flex items-center gap-3 p-2.5 rounded-xl border transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
          isProfileActive
            ? "bg-primary/10 border-primary/30"
            : "bg-base-100 border-base-300 hover:bg-base-200 hover:border-base-300"
        }`}
      >
        <UserAvatar imageUrl={profile?.profileImageUrl} className="w-9 h-9 shrink-0" />
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
