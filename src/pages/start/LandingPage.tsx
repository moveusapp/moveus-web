import { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { HiArrowRight, HiLockClosed } from "react-icons/hi2";
import moveusLogo from "@/assets/logos/moveus-logo.svg";
import EventCard from "@/components/event/EventCard";
import { GetAnonymousUserEventsDocument } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import { useProfile } from "@/context/profile-context";

const VERBS = [
  "RUN.", "LIFT.", "CLIMB.", "ROW.", "CYCLE.", "STRETCH.",
  "JUMP.", "SWIM.", "SPRINT.", "PRESS.", "PADDLE.", "SPIN.",
  "REACH.", "FLOW.", "PUSH.", "BREATHE.",
];

type VerbSize = "sm" | "md" | "lg";

const VERB_SIZE_CLASS: Record<VerbSize, string> = {
  sm: "text-[clamp(1.5rem,5vw,3.25rem)]",
  md: "text-[clamp(2rem,7.5vw,5.5rem)]",
  lg: "text-[clamp(3rem,10.5vw,8.5rem)]",
};

function VerbSlot({
  offset,
  size,
  color,
  rotate,
  positionClass,
}: {
  offset: number;
  size: VerbSize;
  color: "primary" | "accent";
  rotate: number;
  positionClass: string;
}) {
  const [idx, setIdx] = useState(offset % VERBS.length);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const period = 2800 + (offset % 4) * 450;
    const id = window.setInterval(() => {
      setFade(true);
      window.setTimeout(() => {
        setIdx((i) => (i + 7) % VERBS.length);
        setFade(false);
      }, 360);
    }, period);
    return () => window.clearInterval(id);
  }, [offset]);

  const colorClass = color === "primary" ? "text-primary/45" : "text-accent/50";
  const fadeTransform = fade ? "scale(0.94) translateY(14px)" : "scale(1) translateY(0)";

  return (
    <span
      aria-hidden="true"
      className={`absolute font-black tracking-[-0.04em] leading-none select-none whitespace-nowrap ${colorClass} ${VERB_SIZE_CLASS[size]} ${positionClass}`}
      style={{
        transform: `rotate(${rotate}deg) ${fadeTransform}`,
        opacity: fade ? 0 : 1,
        filter: fade ? "blur(5px)" : "blur(0px)",
        transition:
          "opacity 360ms cubic-bezier(0.16, 1, 0.3, 1), transform 360ms cubic-bezier(0.16, 1, 0.3, 1), filter 360ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform, opacity, filter",
      }}
    >
      {VERBS[idx]}
    </span>
  );
}

function LandingPage() {
  const { profile } = useProfile();
  const heroRef = useRef<HTMLElement>(null);
  const logoTiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const tilt = logoTiltRef.current;
    if (!hero || !tilt) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;

    const onMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      tx = (e.clientX - rect.left) / rect.width - 0.5;
      ty = (e.clientY - rect.top) / rect.height - 0.5;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      tilt.style.setProperty("--tx", `${cx * 9}deg`);
      tilt.style.setProperty("--ty", `${cy * -9}deg`);
      tilt.style.setProperty("--shx", `${cx * -22}px`);
      tilt.style.setProperty("--shy", `${cy * -22 + 30}px`);
      // Normalized cursor offset for activity tiles to read with their own depth multiplier.
      hero.style.setProperty("--cx", `${cx}`);
      hero.style.setProperty("--cy", `${cy}`);
      raf = requestAnimationFrame(loop);
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

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

      {/* HERO — verbs cycle behind the logo */}
      <section
        ref={heroRef}
        className="hero-stage relative overflow-hidden bg-base-100"
      >
        {/* ambient glows */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-[1400px] px-4 sm:px-10 lg:px-16 pt-8 pb-14 sm:pt-10 lg:pt-8 lg:pb-12 flex flex-col items-center">
          {/* Kicker */}
          <div className="hero-kicker flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-base-content/55 mb-8 sm:mb-10 lg:mb-6 px-2 text-center">
            <span className="inline-block w-6 sm:w-8 h-px bg-base-content/30" />
            <span>Your workout wingman · Invite-only beta</span>
            <span className="inline-block w-6 sm:w-8 h-px bg-base-content/30" />
          </div>

          {/* Stage: verb field + logo overlay */}
          <div className="hero-verb-stage relative w-full max-w-[1200px] min-h-[420px] sm:min-h-[480px] lg:min-h-[460px] flex items-center justify-center">
            {/* Verb field — masked so verbs fade to nothing before reaching the logo */}
            <div className="hero-verb-mask absolute inset-0 pointer-events-none">
              <VerbSlot offset={0}  size="lg" color="primary" rotate={-2} positionClass="top-[1%] left-[0%]" />
              <VerbSlot offset={3}  size="md" color="accent"  rotate={2}  positionClass="top-[6%] right-[1%]" />
              <VerbSlot offset={6}  size="sm" color="primary" rotate={-1} positionClass="top-[46%] left-[0%]" />
              <VerbSlot offset={9}  size="sm" color="primary" rotate={1}  positionClass="top-[50%] right-[0%]" />
              <VerbSlot offset={12} size="md" color="accent"  rotate={-2} positionClass="bottom-[8%] left-[1%]" />
              <VerbSlot offset={1}  size="lg" color="primary" rotate={2}  positionClass="bottom-[1%] right-[1%]" />
            </div>

            {/* Logo overlay */}
            <div
              ref={logoTiltRef}
              className="hero-logo-tilt relative z-10"
              style={{
                width: "min(60vmin, 28rem)",
                aspectRatio: "277.28/198.49",
              }}
            >
              <div
                className="hero-logo-shadow absolute inset-0 -z-10 pointer-events-none"
                aria-hidden="true"
              />
              {/* Soft plate behind logo so verbs don't read through it */}
              <div
                className="absolute -inset-x-12 -inset-y-8 -z-10 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(65% 60% at 50% 50%, oklch(0.99 0.005 232) 0%, oklch(0.99 0.005 232 / 0.96) 45%, oklch(0.99 0.005 232 / 0) 78%)",
                }}
                aria-hidden="true"
              />
              <div className="hero-logo-breathe w-full h-full">
                <div className="hero-logo-enter w-full h-full">
                  <h1 className="w-full h-full m-0">
                    <img
                      src={moveusLogo}
                      alt="MoveUs"
                      className="w-full h-full select-none"
                      draggable={false}
                    />
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Tagline + CTAs */}
          <p className="hero-tagline mt-6 sm:mt-4 lg:mt-2 text-base sm:text-xl text-base-content/65 leading-relaxed max-w-2xl text-center px-2">
            Find people who actually show up. MoveUs uses your psychological profile to match you with workout partners and local sports events that click with how you move.
          </p>

          <div className="hero-ctas mt-6 sm:mt-8 lg:mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-2 sm:px-0">
            <Link
              to="/register"
              className="btn btn-primary btn-lg gap-2 btn-arrow w-full sm:w-auto"
            >
              Request invite
              <HiArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="btn btn-ghost btn-lg w-full sm:w-auto">
              I have an account
            </Link>
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
