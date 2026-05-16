import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import duckHappy from "@/assets/duck/duck-happy.svg";
import useDocumentTitle from "@/hooks/use-document-title";

function WelcomePage() {
  const navigate = useNavigate();
  useDocumentTitle("Welcome to MoveUs");

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-base-100 to-accent/10 flex items-center justify-center px-4 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="relative max-w-md w-full text-center flex flex-col items-center gap-6">
        <div
          className="animate-welcome-rise"
          style={{ animationDelay: "0ms" }}
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-primary/15 blur-2xl scale-90"
            />
            <img
              src={duckHappy}
              alt=""
              className="relative w-44 h-44 md:w-48 md:h-48 animate-welcome-float drop-shadow-xl"
              draggable={false}
            />
          </div>
        </div>

        <h1
          className="animate-welcome-rise text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-base-content whitespace-nowrap"
          style={{ animationDelay: "80ms" }}
        >
          Welcome to <span className="text-primary">MoveUs</span>
        </h1>

        <p
          className="animate-welcome-rise text-base md:text-lg text-base-content/70 max-w-sm"
          style={{ animationDelay: "160ms" }}
        >
          Tell us a bit about yourself so we can match you with events and
          people nearby. It only takes a minute.
        </p>

        <div
          className="animate-welcome-rise flex flex-col-reverse sm:flex-row gap-3 w-full pt-2"
          style={{ animationDelay: "240ms" }}
        >
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="btn btn-ghost btn-lg min-h-16 h-16 sm:min-h-14 sm:h-14 text-lg flex-1"
          >
            Skip for now
          </button>
          <button
            type="button"
            onClick={() => navigate("/survey/basic-info")}
            className="btn btn-primary btn-lg min-h-16 h-16 sm:min-h-14 sm:h-14 text-lg gap-2 flex-1 group shadow-lg shadow-primary/20"
            autoFocus
          >
            Let's go
            <HiArrowRight
              className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
