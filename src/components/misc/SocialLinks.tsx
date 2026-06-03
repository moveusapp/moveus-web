import { RiTwitterXLine, RiInstagramLine } from "react-icons/ri";
import strings from "@/translations/strings";

interface SocialLinksProps {
  className?: string;
}

function SocialLinks({ className }: SocialLinksProps) {
  // Built inside the component so labels refresh on language change.
  const links = [
    {
      href: "https://x.com/themoveusapp",
      label: strings.footer.twitter,
      Icon: RiTwitterXLine,
    },
    {
      href: "https://www.instagram.com/themoveusapp",
      label: strings.footer.instagram,
      Icon: RiInstagramLine,
    },
  ];

  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="-m-1 p-1 hover:text-primary transition-colors"
        >
          <Icon className="size-4" aria-hidden />
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
