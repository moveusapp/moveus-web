import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineCog6Tooth,
  HiOutlineCalendarDays,
  HiXMark,
  HiChevronRight,
  HiArrowRightOnRectangle,
  HiBeaker,
} from "react-icons/hi2";
import moveusIcon from "@/assets/logos/moveus-icon.svg";
import { useProfile } from "@/context/profile-context";
import { displayName } from "@/utils/display-name";
import UserAvatar from "@/components/user/UserAvatar";
import UserBadge from "@/components/user/UserBadge";
import { getFooterLinks } from "@/components/misc/footer-links";
import LogoutModal from "@/pages/settings/LogoutModal";
import strings from "@/translations/strings";

interface MobileMenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

// Ease-out-expo: fast departure, long soft settle. Matches the brand's
// energetic-but-smooth motion without any bounce.
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Mobile-only account menu. The bottom tab bar (MobileNav) covers the five
 * primary destinations; this drawer surfaces everything else the desktop
 * LeftSidebar has but is otherwise unreachable on small screens: the profile,
 * Create Event, Settings, info links and Log out.
 *
 * The native <dialog> gives a focus trap, Escape handling and an inert
 * background. The slide itself is driven manually (backdrop opacity + panel
 * transform) so both the enter AND exit animate; relying on daisyUI's modal
 * animation would skip the exit, since dialog.close() flips display instantly.
 */
function MobileMenuDrawer({ open, onClose }: MobileMenuDrawerProps) {
  const { profile } = useProfile();
  const location = useLocation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [shown, setShown] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  // Open: show the dialog, then flip `shown` on the next frame so the panel
  // transitions in from off-screen. Close: flip `shown` off and let the
  // panel's transitionend close the dialog, preserving the exit animation.
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

  const isActive = (to: string) => location.pathname === to;
  const isProfileActive =
    location.pathname === "/profile" ||
    (!!profile.username && location.pathname === `/user/${profile.username}`);

  const rowClass = (active: boolean) =>
    `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
      active
        ? "bg-primary text-primary-content shadow-sm"
        : "text-base-content/70 hover:bg-base-200 active:bg-base-200"
    }`;

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
            <span className="absolute left-1/2 inline-flex -translate-x-1/2 items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-accent">
              <HiBeaker className="h-3 w-3 shrink-0" aria-hidden="true" />
              {strings.nav.openBeta}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label={strings.common.close}
              className="btn btn-sm btn-circle btn-ghost -mr-1.5 shrink-0"
            >
              <HiXMark className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 pt-3">
            <Link
              to="/profile"
              onClick={onClose}
              aria-current={isProfileActive ? "page" : undefined}
              aria-label={strings.nav.viewProfileAria}
              className={`group flex items-center gap-3 rounded-2xl border p-3 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                isProfileActive
                  ? "border-primary/30 bg-primary/10"
                  : "border-base-300 bg-base-200 hover:bg-base-300/60 active:bg-base-300/60"
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
          </div>

          <nav className="mt-5 flex flex-col gap-1.5 px-4">
            <Link
              to="/calendar"
              onClick={onClose}
              aria-current={isActive("/calendar") ? "page" : undefined}
              className={rowClass(isActive("/calendar"))}
            >
              <HiOutlineCalendarDays
                size={20}
                strokeWidth={isActive("/calendar") ? 2.5 : 2}
              />
              <span>{strings.nav.calendar}</span>
            </Link>

            <Link
              to="/settings"
              onClick={onClose}
              aria-current={isActive("/settings") ? "page" : undefined}
              className={rowClass(isActive("/settings"))}
            >
              <HiOutlineCog6Tooth
                size={20}
                strokeWidth={isActive("/settings") ? 2.5 : 2}
              />
              <span>{strings.nav.settings}</span>
            </Link>
          </nav>

          <div className="flex-1" />

          <nav className="flex flex-wrap gap-x-4 gap-y-2 px-6 pb-4">
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
