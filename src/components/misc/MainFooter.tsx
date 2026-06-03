import { Link } from "react-router-dom";
import strings from "@/translations/strings";

function MainFooter() {
  return (
    <footer className="px-2 pb-4">
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-neutral/50">
        <Link to="/about" className="hover:underline">
          {strings.footer.about}
        </Link>
        <Link to="/terms" className="hover:underline">
          {strings.footer.terms}
        </Link>
        <Link to="/privacy" className="hover:underline">
          {strings.footer.privacy}
        </Link>
        <Link to="/cookies" className="hover:underline">
          {strings.footer.cookies}
        </Link>
      </div>
      <p className="text-[11px] text-neutral/40 mt-1.5">
        {strings.footer.copy}
      </p>
    </footer>
  );
}

export default MainFooter;
