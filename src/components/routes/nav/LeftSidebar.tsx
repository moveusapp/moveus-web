import { HiOutlineCog6Tooth } from "react-icons/hi2";
import moveusLogo from "@/assets/logos/moveus-logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useProfile } from "@/context/profile-context";
import { displayName } from "@/utils/display-name";
import UserAvatar from "@/components/user/UserAvatar";
import UserBadge from "@/components/user/UserBadge";
import strings from "@/translations/strings";
import { getNavItems, NavItem } from "./nav-items";
import NavItemLink from "./NavItemLink";
import CreateEventButton from "./CreateEventButton";

function LeftSidebar() {
  const location = useLocation();
  const { profile } = useProfile();

  const navItems = getNavItems();
  const settingsItem: NavItem = {
    label: strings.nav.settings,
    to: "/settings",
    icon: HiOutlineCog6Tooth,
  };

  const isProfileActive =
    location.pathname === "/profile" ||
    (!!profile?.username &&
      location.pathname === `/user/${profile.username}`);

  return (
    <div className="flex flex-col h-full w-full py-6 px-4">
      <div className="flex flex-col gap-1.5 px-3 mb-8">
        <Link to="/home" aria-label={strings.common.brand} className="contents">
          <img
            src={moveusLogo}
            alt={strings.common.brand}
            width={277}
            height={198}
            className="w-full h-auto"
          />
        </Link>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => (
          <NavItemLink key={item.to} item={item} />
        ))}

        <CreateEventButton className="mt-4" />
      </nav>

      <NavItemLink item={settingsItem} />

      <div className="border-t border-base-300 my-3" />

      <Link
        to="/profile"
        aria-current={isProfileActive ? "page" : undefined}
        aria-label={strings.nav.viewProfileAria}
        className={`group flex items-center gap-3 p-2.5 rounded-xl transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
          isProfileActive
            ? "bg-primary/10"
            : "hover:bg-base-200"
        }`}
      >
        <UserAvatar imageUrl={profile?.avatarUrl} className="w-9 h-9 shrink-0" />
        <div className="flex flex-col min-w-0 flex-1">
          <span className="flex items-center gap-1 text-sm font-semibold text-base-content">
            <span className="truncate">
              {displayName(
                profile?.username!,
                profile?.firstName!,
                profile?.lastName!,
              )}
            </span>
            <UserBadge badge={profile?.badge} size={16} />
          </span>
          <span className="text-xs text-base-content/70 truncate">
            @{profile?.username}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default LeftSidebar;
