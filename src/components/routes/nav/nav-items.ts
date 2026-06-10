import { IconType } from "react-icons";
import {
  HiOutlineHome,
  HiOutlineBell,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { HiOutlineChat, HiOutlineSearch } from "react-icons/hi";
import strings from "@/translations/strings";

export interface NavItem {
  label: string;
  to: string;
  icon: IconType;
  /** Unread/count pill. Empty string renders nothing; wire to real counts later. */
  badge?: string;
}

/**
 * The single source of truth for primary navigation destinations: same order,
 * same icons, everywhere nav is rendered (desktop LeftSidebar, mobile drawer,
 * and the bottom MobileNav tab bar, which selects a subset by route).
 *
 * Called inside render (never at module scope) so labels refresh on language
 * change. Mirrors the getFooterLinks() convention.
 */
export function getNavItems(): NavItem[] {
  const t = strings.nav;
  return [
    { label: t.home, to: "/home", icon: HiOutlineHome },
    { label: t.search, to: "/search", icon: HiOutlineSearch },
    { label: t.calendar, to: "/calendar", icon: HiOutlineCalendarDays },
    { label: t.notifications, to: "/notifications", icon: HiOutlineBell, badge: "" },
    { label: t.messages, to: "/chat", icon: HiOutlineChat, badge: "" },
  ];
}
