import { ReactNode, useState } from "react";
import UserAvatar from "@/components/user/UserAvatar";
import { useProfile } from "@/context/profile-context";
import MobileMenuDrawer from "@/components/routes/nav/MobileMenuDrawer";
import strings from "@/translations/strings";

type PageHeaderProps = {
  title?: ReactNode;
  actions?: ReactNode;
  center?: ReactNode;
  children?: ReactNode;
  className?: string;
};

function HeaderAvatar() {
  const { profile } = useProfile();
  const [menuOpen, setMenuOpen] = useState(false);

  if (profile?.id == null) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label={strings.nav.openMenu}
        aria-haspopup="dialog"
        aria-expanded={menuOpen}
        className="md:hidden shrink-0 rounded-full outline-none transition-transform duration-150 focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-95"
      >
        <UserAvatar imageUrl={profile.avatarUrl} className="w-9 h-9" />
      </button>
      <MobileMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function PageHeader({
  title,
  actions,
  center,
  children,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={`sticky top-0 z-20 bg-base-100/85 backdrop-blur-md border-b border-base-content/8 ${
        className ?? ""
      }`}
    >
      {/* Fixed-height row: the avatar's vertical center stays identical on every
          route, independent of whether the row holds a title, a search box, or
          actions of differing heights. */}
      <div className="relative flex items-center gap-x-3 px-4 sm:px-6 h-16">
        <HeaderAvatar />

        {center && (
          <div className="md:hidden absolute left-1/2 -translate-x-1/2">
            {center}
          </div>
        )}

        {typeof title === "string" ? (
          <h1 className="text-2xl font-bold leading-tight truncate min-w-0">
            {title}
          </h1>
        ) : (
          title && <div className="grow min-w-0">{title}</div>
        )}

        {actions && (
          <div className="ml-auto flex items-center gap-2 shrink-0 min-w-0">
            {actions}
          </div>
        )}
      </div>

      {children && <div className="px-4 sm:px-6">{children}</div>}
    </header>
  );
}

export default PageHeader;
