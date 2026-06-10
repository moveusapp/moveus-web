import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineCog6Tooth,
  HiXMark,
  HiChevronRight,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import moveusIcon from "@/assets/logos/moveus-icon.svg";
import { useProfile } from "@/context/profile-context";
import { displayName } from "@/utils/display-name";
import UserAvatar from "@/components/user/UserAvatar";
import UserBadge from "@/components/user/UserBadge";
import { getFooterLinks } from "@/components/misc/footer-links";
import LogoutModal from "@/pages/settings/LogoutModal";
import strings from "@/translations/strings";
import { getNavItems, NavItem } from "./nav-items";
import NavItemLink from "./NavItemLink";
import CreateEventButton from "./CreateEventButton";

interface MobileMenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

function MobileMenuDrawer({ open, onClose }: MobileMenuDrawerProps) {
  const { profile } = useProfile();
  const location = useLocation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [shown, setShown] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    setShown(false);
  }, [open]);

  // Navigating from inside the drawer should dismiss it.
  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handlePanelTransitionEnd = (
    e: React.TransitionEvent<HTMLDivElement>,
  ) => {
    if (e.propertyName !== "transform") return;
    if (!shown && dialogRef.current?.open) dialogRef.current.close();
  };

  if (profile?.id == null) return null;

  const isProfileActive =
    location.pathname === "/profile" ||
    (!!profile.username && location.pathname === `/user/${profile.username}`);

  const navItems = getNavItems();
  const settingsItem: NavItem = {
    label: strings.nav.settings,
    to: "/settings",
    icon: HiOutlineCog6Tooth,
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        aria-label={strings.nav.menuTitle}
        onCancel={(e) => {
          e.preventDefault();
          onClose();
        }}
        className="md:hidden inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 backdrop:bg-transparent overflow-hidden"
      >
        <div
          onClick={onClose}
          aria-hidden="true"
          className="absolute inset-0 bg-black/40 transition-opacity duration-300 ease-out motion-reduce:transition-none"
          style={{ opacity: shown ? 1 : 0 }}
        />

        <div
          onTransitionEnd={handlePanelTransitionEnd}
          style={{
            transform: shown ? "translateX(0)" : "translateX(-100%)",
            transitionTimingFunction: EASE,
          }}
          className="absolute inset-y-0 left-0 flex w-[20rem] max-w-[86vw] flex-col bg-base-100 shadow-2xl transition-transform duration-300 will-change-transform motion-reduce:transition-none"
        >
          <div className="relative flex items-center justify-between gap-2 px-5 pt-6 pb-2">
            <img
              src={moveusIcon}
              alt=""
              aria-hidden="true"
              className="h-9 w-auto"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label={strings.common.close}
              className="btn btn-sm btn-circle btn-ghost -mr-1.5 shrink-0"
            >
              <HiXMark className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-3 pb-2">
            <Link
              to="/profile"
              onClick={onClose}
              aria-current={isProfileActive ? "page" : undefined}
              aria-label={strings.nav.viewProfileAria}
              className={`group flex items-center gap-3 rounded-2xl border p-3 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                isProfileActive
                  ? "border-primary/30 bg-primary/10"
                  : "border-base-300 bg-base-200 hover:bg-base-300/50 active:bg-base-300/50"
              }`}
            >
              <UserAvatar
                imageUrl={profile.avatarUrl}
                className="h-12 w-12 shrink-0"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="flex items-center gap-1 text-sm font-semibold text-base-content">
                  <span className="truncate">
                    {displayName(
                      profile.username!,
                      profile.firstName!,
                      profile.lastName!,
                    )}
                  </span>
                  <UserBadge badge={profile.badge} size={16} />
                </span>
                <span className="truncate text-xs text-base-content/60">
                  @{profile.username}
                </span>
              </div>
              <HiChevronRight className="h-5 w-5 shrink-0 text-base-content/40 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>

            <nav className="mt-5 flex flex-col gap-1.5">
              {navItems.map((item) => (
                <NavItemLink key={item.to} item={item} onClick={onClose} />
              ))}

              <CreateEventButton className="mt-3" onClick={onClose} />

              <div className="mt-3">
                <NavItemLink item={settingsItem} onClick={onClose} />
              </div>
            </nav>
          </div>

          <nav className="flex flex-wrap gap-x-4 gap-y-2 border-t border-base-300 px-6 pt-4 pb-4">
            {getFooterLinks().map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                className="text-xs font-medium text-base-content/55 transition-colors duration-150 outline-none hover:text-base-content focus-visible:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mx-4 border-t border-base-300" />

          <div className="px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={() => {
                onClose();
                setLogoutOpen(true);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-error/90 transition-colors duration-150 outline-none hover:bg-error/10 active:bg-error/10 focus-visible:ring-2 focus-visible:ring-error/40"
            >
              <HiArrowRightOnRectangle size={20} strokeWidth={2} />
              <span>{strings.nav.logOut}</span>
            </button>
          </div>
        </div>
      </dialog>

      <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </>
  );
}

export default MobileMenuDrawer;
