import { ReactNode, useState } from "react";
import UserAvatar from "@/components/user/UserAvatar";
import { useProfile } from "@/context/profile-context";
import MobileMenuDrawer from "@/components/routes/nav/MobileMenuDrawer";
import strings from "@/translations/strings";

type PageHeaderProps = {
  title?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function HeaderAvatar() {
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

function PageHeader({ title, actions, children, className }: PageHeaderProps) {
  const hasTitleRow = Boolean(title || actions);

  return (
    <header
      className={`sticky top-0 z-20 bg-base-100/85 backdrop-blur-md border-b border-base-content/8 ${
        className ?? ""
      }`}
    >
      {hasTitleRow && (
        <div className="flex items-center flex-wrap gap-x-3 gap-y-2 px-4 sm:px-6 pt-4 sm:pt-5 pb-3">
          <HeaderAvatar />

          {title && (
            <h1 className="text-2xl font-bold leading-tight truncate min-w-0">
              {title}
            </h1>
          )}

          {actions && (
            <div className="ml-auto flex items-center gap-2 shrink-0 min-w-0">
              {actions}
            </div>
          )}
        </div>
      )}

      {children && (
        <div
          className={`px-4 sm:px-6 ${hasTitleRow ? "" : "pt-4 sm:pt-5"}`}
        >
          {children}
        </div>
      )}
    </header>
  );
}

export default PageHeader;
