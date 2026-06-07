import strings from "@/translations/strings";

export interface FooterLink {
  to: string;
  label: string;
}

/**
 * The single source of truth for footer navigation: same links, same order,
 * everywhere a footer is rendered (marketing pages and the in-app feed).
 *
 * Called inside render (never at module scope) so labels refresh on language
 * change.
 */
export function getFooterLinks(): FooterLink[] {
  const t = strings.footer;
  return [
    { to: "/about", label: t.about },
    { to: "/help", label: t.help },
    { to: "/terms", label: t.terms },
    { to: "/privacy", label: t.privacy },
    { to: "/cookies", label: t.cookies },
  ];
}
