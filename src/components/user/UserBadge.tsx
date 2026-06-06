import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiCheckBadge, HiShieldCheck } from "react-icons/hi2";
import { UserBadge as UserBadgeType } from "@/graphql/graphql-types";
import strings from "@/translations/strings";

interface UserBadgeProps {
  badge?: UserBadgeType | null;
  size?: number;
  className?: string;
}

function UserBadge({ badge, size = 16, className = "" }: UserBadgeProps) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null,
  );

  // Render the label in a body-level portal on hover/focus so it escapes any
  // ancestor mask, overflow:hidden, or filter that would otherwise clip it.
  const show = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCoords({ top: rect.top, left: rect.left + rect.width / 2 });
  }, []);

  const hide = useCallback(() => setCoords(null), []);

  if (badge !== UserBadgeType.Verified && badge !== UserBadgeType.Employee) {
    return null;
  }

  const isEmployee = badge === UserBadgeType.Employee;
  const Icon = isEmployee ? HiShieldCheck : HiCheckBadge;
  const label = isEmployee
    ? strings.ui.badgeEmployee
    : strings.ui.badgeVerified;
  const color = isEmployee ? "text-accent" : "text-primary";

  return (
    <span
      ref={anchorRef}
      className={`inline-flex shrink-0 align-middle ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <Icon size={size} className={color} role="img" aria-label={label} />
      {coords &&
        createPortal(
          <span
            role="tooltip"
            style={{ top: coords.top, left: coords.left }}
            className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-[calc(100%+0.5rem)] whitespace-nowrap rounded-field bg-neutral px-2 py-1 text-xs text-neutral-content shadow-md"
          >
            {label}
          </span>,
          document.body,
        )}
    </span>
  );
}

export default UserBadge;
