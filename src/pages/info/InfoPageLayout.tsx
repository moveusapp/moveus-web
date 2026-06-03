import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";
import moveusLogo from "@/assets/logos/moveus-logo.svg";
import strings from "@/translations/strings";
import "./info.css";

function InfoPageLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // New document, new scroll position.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <header className="sticky top-0 z-40 border-b border-base-content/8 bg-base-100/85 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
          <button
            type="button"
            onClick={goBack}
            className="btn btn-ghost btn-sm gap-1.5 -ml-2 text-base-content/70 hover:text-base-content"
          >
            <HiArrowLeft className="w-4 h-4" />
            <span>{strings.info.back}</span>
          </button>

          <Link
            to="/"
            aria-label={strings.common.brand}
            className="mx-auto rounded-xl transition-transform hover:-rotate-2 hover:scale-[1.03]"
          >
            <img src={moveusLogo} alt={strings.common.brand} className="h-6 sm:h-7" />
          </Link>

          <span className="btn btn-ghost btn-sm invisible -mr-2" aria-hidden="true">
            {strings.info.back}
          </span>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-base-200 border-t border-base-300">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-8 flex flex-col items-center gap-5 text-sm text-base-content/60 sm:grid sm:grid-cols-3 sm:gap-4">
          <Link to="/" className="sm:justify-self-start">
            <img src={moveusLogo} alt={strings.common.brand} className="h-7" />
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-self-center">
            <Link to="/about" className="hover:text-primary transition-colors">{strings.footer.about}</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">{strings.footer.terms}</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">{strings.footer.privacy}</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">{strings.footer.cookies}</Link>
          </nav>
          <p className="sm:justify-self-end">{strings.footer.copy}</p>
        </div>
      </footer>
    </div>
  );
}

export default InfoPageLayout;
