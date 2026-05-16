import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import {
  HiArrowRight,
  HiSparkles,
  HiBolt,
  HiHeart,
  HiLockClosed,
  HiPuzzlePiece,
  HiAdjustmentsHorizontal,
  HiUserGroup,
  HiArrowTrendingUp,
} from "react-icons/hi2";
import moveusLogo from "@/assets/logos/moveus-logo.svg";
import duckHappy from "@/assets/duck/duck-happy.svg";
import duckDefault from "@/assets/duck/duck-default.svg";
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
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium">
          <HiLockClosed className="w-4 h-4 shrink-0" />
          <span>
            MoveUs is in <span className="font-bold">closed beta</span> - request an invite to join early.
          </span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 -left-20 w-96 h-96 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute top-40 right-0 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-4 pb-10 lg:pt-6 lg:pb-12">
          <div className="flex items-center mb-6 lg:mb-8">
            <Link to="/" className="flex items-center">
              <img src={moveusLogo} alt="MoveUs" className="h-10" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 items-center gap-8 lg:gap-12">
            <div className="text-center lg:text-left animate-welcome-rise">
              <h1 className="text-5xl md:text-6xl font-black mb-4 leading-[1.05] tracking-tight">
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

              <p className="text-lg md:text-xl text-base-content/70 mb-7 max-w-xl mx-auto lg:mx-0">
                Find people who actually show up. MoveUs uses your
                psychological profile to match you with workout partners and
                local sports events that click with how you move.
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
              <div className="relative">
                <div className="absolute -top-2 -left-6 lg:-left-10 z-10 animate-welcome-float">
                  <div className="bg-base-200 rounded-2xl rounded-br-sm px-4 py-3 shadow-xl border border-base-300">
                    <div className="text-sm font-semibold flex items-center gap-2">
                      <HiBolt className="w-4 h-4 text-accent" />
                      Ready to move?
                    </div>
                  </div>
                </div>

                <div
                  className="absolute top-1/3 -right-4 lg:right-0 z-10 animate-welcome-float"
                  style={{ animationDelay: "1.2s" }}
                >
                  <div className="bg-base-100 rounded-2xl px-4 py-3 shadow-xl border border-base-300 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center">
                      <HiPuzzlePiece className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-base-content/60 leading-none mb-0.5">
                        Profile
                      </div>
                      <div className="text-sm font-bold leading-none">
                        Matched
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute bottom-12 -left-2 lg:-left-6 z-10 animate-welcome-float"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="bg-base-100 rounded-2xl px-4 py-3 shadow-xl border border-base-300 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center">
                      <HiHeart className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="text-xs text-base-content/60 leading-none mb-0.5">
                        Vibe
                      </div>
                      <div className="text-sm font-bold leading-none">
                        Aligned
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative w-56 sm:w-72 lg:w-[360px] aspect-[351/526] animate-welcome-float">
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
        </div>
      </section>

      {/* HOW IT WORKS — matched by psychology */}
      <section className="py-14 lg:py-18 bg-base-200 border-t border-base-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <div className="badge badge-lg bg-primary/10 text-primary border-0 gap-2 mb-3 font-semibold">
              <HiPuzzlePiece className="w-4 h-4" />
              How it works
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
              Matched by <span className="text-primary">psychology</span>,
              not by guessing.
            </h2>
            <p className="text-lg text-base-content/70">
              From "I should work out more" to "see you tomorrow at 7" — in
              three steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              {
                step: "01",
                icon: <HiAdjustmentsHorizontal className="w-6 h-6" />,
                tint: "bg-primary/10 text-primary",
                title: "Build your profile",
                body: "A short psychological assessment captures your motivation style, energy, and social preferences.",
              },
              {
                step: "02",
                icon: <HiUserGroup className="w-6 h-6" />,
                tint: "bg-accent/10 text-accent",
                title: "Meet compatible movers",
                body: "Get introduced to people nearby whose profile complements yours — fewer flaky plans, more good sessions.",
              },
              {
                step: "03",
                icon: <HiArrowTrendingUp className="w-6 h-6" />,
                tint: "bg-success/10 text-success",
                title: "Build the habit",
                body: "Join sports events around you, keep streaks going, and turn workouts into something you look forward to.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="card bg-base-100 border border-base-300 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                <div className="card-body p-6 relative">
                  <span className="absolute top-4 right-5 text-xs font-bold text-base-content/30 tracking-widest">
                    {s.step}
                  </span>
                  <div
                    className={`w-12 h-12 rounded-2xl ${s.tint} flex items-center justify-center mb-3`}
                  >
                    {s.icon}
                  </div>
                  <h3 className="card-title text-lg">{s.title}</h3>
                  <p className="text-sm text-base-content/60">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEARBY EVENTS */}
      <section className="py-14 lg:py-18 bg-base-100 border-t border-base-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="badge badge-lg bg-accent/15 text-accent border-0 gap-2 mb-3 font-semibold">
                <HiBolt className="w-4 h-4" />
                Happening near you
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Find your next session
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
      <section className="relative py-16 lg:py-20 overflow-hidden bg-primary">
        {/* subtle dot pattern for depth */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_auto] items-center gap-8">
            <div className="text-center lg:text-left text-primary-content">
              <div className="badge badge-lg bg-accent text-accent-content border-0 gap-2 mb-4 font-semibold shadow-lg">
                <HiLockClosed className="w-4 h-4" />
                Closed beta
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight text-white drop-shadow-sm">
                The duck is waiting.
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl mx-auto lg:mx-0">
                Spots are limited while we're in beta. Drop your details,
                grab an invite, and stop ghosting your gym routine.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
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

            <div className="hidden lg:block w-64">
              <img
                src={duckDefault}
                alt=""
                aria-hidden="true"
                className="w-full drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-base-200 border-t border-base-300">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <img src={moveusLogo} alt="MoveUs" className="h-10 mb-3" />
              <p className="text-sm text-base-content/70">
                Your workout wingman. Connect, compete, and conquer your
                fitness goals together.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="text-base-content/70 hover:text-primary transition-colors"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-base-content/70 hover:text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/privacy"
                    className="text-base-content/70 hover:text-primary transition-colors"
                  >
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-base-content/70 hover:text-primary transition-colors"
                  >
                    Terms of service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="text-base-content/70 hover:text-primary transition-colors"
                  >
                    Cookie policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-base-300 mt-8 pt-6 text-center text-sm text-base-content/60">
            <p>MoveUs, j.d.o.o. 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
