import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import UserAvatar from "@/components/user/UserAvatar";
import { useProfile } from "@/context/profile-context";
import strings from "@/translations/strings";

type PageHeaderProps = {
  title?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function HeaderAvatar() {
  const { profile } = useProfile();
  const { pathname } = useLocation();

  if (profile?.id == null) return null;

  const isOnOwnProfile =
    pathname === "/profile" ||
    (profile.username != null && pathname === `/user/${profile.username}`);

  return (
    <Link
      to="/profile"
      aria-label={strings.nav.yourProfileAria}
      className={`md:hidden shrink-0 rounded-full ${
        isOnOwnProfile
          ? "ring-2 ring-primary ring-offset-2 ring-offset-base-100"
          : ""
      }`}
    >
      <UserAvatar userId={profile.id} className="w-9 h-9" />
    </Link>
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
