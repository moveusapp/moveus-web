import { Link } from "react-router-dom";
import strings from "@/translations/strings";
import SocialLinks from "@/components/misc/SocialLinks";
import { getFooterLinks } from "@/components/misc/footer-links";

function MainFooter() {
  const links = getFooterLinks();

  return (
    <footer className="px-2 pb-4">
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-neutral/50">
        {links.map(({ to, label }) => (
          <Link key={to} to={to} className="hover:underline">
            {label}
          </Link>
        ))}
      </div>
      <SocialLinks className="mt-2 text-neutral/50" />
      <p className="text-[11px] text-neutral/40 mt-1.5">
        {strings.footer.copy}
      </p>
    </footer>
  );
}

export default MainFooter;
