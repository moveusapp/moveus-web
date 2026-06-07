import { Link } from "react-router-dom";
import SocialLinks from "@/components/misc/SocialLinks";
import { getFooterLinks } from "@/components/misc/footer-links";
import moveusLogo from "@/assets/logos/moveus-logo.svg";
import strings from "@/translations/strings";

interface SiteFooterProps {
  /**
   * Horizontal gutter for the inner container. Defaults to the landing-page
   * gutter; the info layout passes a narrower one so the footer logo lines up
   * with the document content and header above it.
   */
  gutterClassName?: string;
}

/**
 * The full marketing footer: logo, standardized nav, social, copyright.
 * Shared by the landing page and the info/legal page layout so the two can
 * never drift apart again. Links and order come from {@link getFooterLinks}.
 */
function SiteFooter({ gutterClassName = "px-6 sm:px-10 lg:px-16" }: SiteFooterProps) {
  const links = getFooterLinks();

  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className={`max-w-6xl mx-auto ${gutterClassName} py-10 flex flex-col items-center gap-5 text-sm text-base-content/60 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-6`}>
        <Link to="/" aria-label={strings.common.brand} className="sm:justify-self-start">
          <img src={moveusLogo} alt={strings.common.brand} className="h-7" />
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:flex-nowrap sm:justify-self-center">
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className="hover:text-primary transition-colors">
              {label}
            </Link>
          ))}
          <SocialLinks />
        </nav>
        <p className="sm:justify-self-end">{strings.footer.copy}</p>
      </div>
    </footer>
  );
}

export default SiteFooter;
