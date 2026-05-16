import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import duckHappy from "@/assets/duck/duck-happy.svg";
import useDocumentTitle from "@/hooks/use-document-title";

function WelcomePage() {
  const navigate = useNavigate();
  useDocumentTitle("Welcome to MoveUs");

  return (
    <div className="relative min-h-screen overflow-hidden bg-base-100 flex items-center justify-center px-4 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(from var(--color-primary) l c h / 0.18) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      <div className="relative max-w-md w-full text-center flex flex-col items-center gap-6">
        <div
          className="animate-welcome-rise"
          style={{ animationDelay: "0ms" }}
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-primary/10 blur-2xl scale-90"
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
          className="animate-welcome-rise text-4xl sm:text-5xl font-black tracking-tight leading-[1.05] text-base-content"
          style={{ animationDelay: "80ms" }}
        >
          Welcome to{" "}
          <span className="relative inline-block">
            <span className="text-primary">MoveUs</span>
            <svg
              className="absolute -bottom-1.5 left-0 w-full"
              viewBox="0 0 200 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 7 Q 50 2, 100 5 T 198 4"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-accent"
                fill="none"
              />
            </svg>
          </span>
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
            className="btn btn-ghost btn-lg flex-1 h-14 min-h-14"
          >
            Skip for now
          </button>
          <button
            type="button"
            onClick={() => navigate("/survey/basic-info")}
            className="btn btn-primary btn-lg flex-1 h-14 min-h-14 gap-2 btn-arrow"
            autoFocus
          >
            Let's go
            <HiArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
