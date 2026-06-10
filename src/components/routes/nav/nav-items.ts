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
  badge?: string;
}

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
