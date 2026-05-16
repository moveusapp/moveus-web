import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { HiArrowRight, HiLockClosed } from "react-icons/hi2";
import moveusLogo from "@/assets/logos/moveus-logo.svg";
import duckHappy from "@/assets/duck/duck-happy.svg";
import EventCard from "@/components/event/EventCard";
import { GetAnonymousUserEventsDocument } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import { useProfile } from "@/context/profile-context";

function LandingPage() {
  const { profile } = useProfile();

  if (profile) {
    return <Navigate to="/home" replace />;
  }

  useDocumentTitle("MoveUs - Your Workout Wingman");

  const { data: eventsData, loading: eventsLoading } = useQuery(
    GetAnonymousUserEventsDocument,
  );

  return (
    <div className="min-h-screen bg-base-100">
      {/* Closed beta strip */}
      <div className="sticky top-0 z-[60] bg-accent text-accent-content">
        <div className="mx-auto px-6 py-2 flex items-center justify-center gap-2 text-sm font-medium">
          <HiLockClosed className="w-4 h-4 shrink-0" />
          <span>
            MoveUs is in <span className="font-bold">closed beta</span>, request an invite to join early.
          </span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 -left-20 w-[28rem] h-[28rem] rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-14 lg:pt-10 lg:pb-20">
          <div className="flex items-center mb-8 lg:mb-12">
            <Link to="/" className="flex items-center">
              <img src={moveusLogo} alt="MoveUs" className="h-10" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_1fr] items-center gap-10 lg:gap-12">
            <div className="text-center lg:text-left animate-welcome-rise">
              <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl font-black mb-5 leading-[1.02] tracking-tight">
                Your Workout
                <br />
                <span className="relative inline-block">
                  <span className="text-primary">Wingman</span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 8 Q 75 2, 150 6 T 298 5"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="text-accent"
                      fill="none"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-base-content/65 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Find people who actually show up. MoveUs uses your psychological profile to match you with workout partners and local sports events that click with how you move.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="btn btn-primary btn-lg gap-2 btn-arrow"
                >
                  Request invite
                  <HiArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/login" className="btn btn-ghost btn-lg">
                  I have an account
                </Link>
              </div>
            </div>

            {/* mascot column */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-60 sm:w-72 lg:w-[380px] aspect-[351/526] animate-welcome-float">
                <div className="absolute inset-x-4 bottom-2 h-6 bg-base-content/10 blur-2xl rounded-full" />
                <img
                  src={duckHappy}
                  alt="MoveUs duck mascot, ready to move"
                  className="relative w-full h-full drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — matched by psychology */}
      <section className="py-20 lg:py-24 bg-base-200 border-t border-base-300">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-3 tracking-tight leading-[1.05]">
              Matched by <span className="text-primary">psychology</span>, not by guessing.
            </h2>
            <p className="text-lg text-base-content/60">
              From "I should work out more" to "see you tomorrow at 7" in three steps.
            </p>
          </div>

          <ol className="grid sm:grid-cols-3 gap-10 lg:gap-12">
            {[
              {
                step: "01",
                title: "Build your profile",
                body: "A short psychological assessment captures your motivation, energy, and social preferences.",
              },
              {
                step: "02",
                title: "Meet compatible movers",
                body: "Get introduced to people nearby whose profile complements yours. Fewer flaky plans, more good sessions.",
              },
              {
                step: "03",
                title: "Build the habit",
                body: "Join events around you, keep streaks going, turn workouts into something you look forward to.",
              },
            ].map((s) => (
              <li key={s.step} className="flex flex-col items-center text-center">
                <span className="text-5xl font-black text-primary/25 leading-none mb-3 tracking-tight tabular-nums">
                  {s.step}
                </span>
                <h3 className="text-xl font-bold mb-2 tracking-tight">{s.title}</h3>
                <p className="text-base text-base-content/60 leading-relaxed max-w-xs">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* NEARBY EVENTS */}
      <section className="py-20 lg:py-24 bg-base-100 border-t border-base-300">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">
                Happening near you
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05]">
                Find your next session.
              </h2>
            </div>
            <Link
              to="/search"
              className="btn btn-ghost gap-2 hidden sm:inline-flex"
            >
              See all
              <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {eventsLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsData?.anonymousUserEvents?.slice(0, 6).map((event) => (
                <EventCard key={event!.id} event={event!} />
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link
              to="/search"
              className="btn btn-primary btn-lg gap-2 btn-arrow"
            >
              See all events
              <HiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-primary py-24 lg:py-28">
        <div
          className="absolute inset-0 opacity-[0.1]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative mx-auto px-6 sm:px-10 lg:px-16 text-center text-primary-content">
          <h2 className="text-[clamp(1.625rem,7vw,4.5rem)] font-black mb-5 tracking-tight leading-[1.05] text-white whitespace-nowrap">
            The duck is waiting.
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-md mx-auto">
            Spots are limited while we're in beta. Grab an invite and stop ghosting your gym routine.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="btn btn-lg bg-base-100 text-primary hover:bg-base-200 border-0 gap-2 btn-arrow"
            >
              Request invite
              <HiArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="btn btn-ghost btn-lg text-white hover:bg-white/15 border border-white/30"
            >
              I have an account
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-base-200 border-t border-base-300">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-sm text-base-content/60">
          <img src={moveusLogo} alt="MoveUs" className="h-7" />
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </nav>
          <p>MoveUs, j.d.o.o. 2026</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
