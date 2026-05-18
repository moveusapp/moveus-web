import { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { HiArrowLeft, HiArrowRight, HiLockClosed } from "react-icons/hi2";
import { LuCheck, LuFlame, LuHeart, LuMapPin } from "react-icons/lu";
import moveusLogo from "@/assets/logos/moveus-logo.svg";
import "./landing.css";
import EventCard from "@/components/event/EventCard";
import { GetAnonymousUserEventsDocument } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import { useProfile } from "@/context/profile-context";

const VERBS = [
  "RUN.", "LIFT.", "CLIMB.", "ROW.", "CYCLE.", "STRETCH.",
  "JUMP.", "SWIM.", "SPRINT.", "PRESS.", "PADDLE.", "SPIN.",
  "REACH.", "FLOW.", "PUSH.", "BREATHE.",
];

function MatchedStickers() {
  return (
    <div className="lp-stk-cluster">
      <div className="lp-stk lp-stk--survey" style={{ top: "4%", left: "6%", transform: "rotate(-5deg)" }}>
        <div className="lp-stk-eyebrow">Profile</div>
        <div className="lp-stk-q">How do you train?</div>
        <div className="lp-stk-row lp-stk-row--on">
          <span className="lp-stk-radio" aria-hidden="true" />
          Small group
        </div>
        <div className="lp-stk-row">
          <span className="lp-stk-radio" aria-hidden="true" />
          Bigger crew
        </div>
      </div>
      <div className="lp-stk lp-stk--chip lp-stk--chip-blue" style={{ top: "18%", right: "4%", transform: "rotate(7deg)" }}>
        <LuMapPin className="w-3.5 h-3.5" />
        Maksimir · 0.8km
      </div>
      <div className="lp-stk lp-stk--chip lp-stk--chip-orange" style={{ bottom: "6%", left: "30%", transform: "rotate(-3deg)" }}>
        <span className="lp-stk-dot" aria-hidden="true" />
        3 events match
      </div>
    </div>
  );
}

function MakeItRealStickers() {
  return (
    <div className="lp-stk-cluster">
      <div className="lp-stk lp-stk--event" style={{ top: "2%", left: "8%", transform: "rotate(-4deg)" }}>
        <div className="lp-stk-event-date">
          <span className="lp-stk-event-day">FRI</span>
          <span className="lp-stk-event-num">14</span>
        </div>
        <div>
          <div className="lp-stk-event-title">Sunset trail run</div>
          <div className="lp-stk-event-meta">19:30 · Rijeka, Mlaka Park</div>
        </div>
      </div>
      <div className="lp-stk lp-stk--bubble lp-stk--bubble-in" style={{ top: "44%", right: "10%", transform: "rotate(4deg)" }}>
        Still on for tomorrow?
      </div>
      <div className="lp-stk lp-stk--bubble lp-stk--bubble-out" style={{ top: "62%", right: "28%", transform: "rotate(-3deg)" }}>
        Yep, bringing a friend
      </div>
      <div className="lp-stk lp-stk--chip lp-stk--chip-green" style={{ bottom: "4%", left: "12%", transform: "rotate(6deg)" }}>
        <LuCheck className="w-3.5 h-3.5" />
        Locked in
      </div>
    </div>
  );
}

function StayInItStickers() {
  return (
    <div className="lp-stk-cluster">
      <div className="lp-stk lp-stk--post" style={{ top: "4%", left: "10%", transform: "rotate(-4deg)" }}>
        <div className="lp-stk-post-head">
          <div className="lp-stk-post-avatar" aria-hidden="true">T</div>
          <div className="leading-tight">
            <div className="lp-stk-post-name">Tatjana</div>
            <div className="lp-stk-post-time">1 week ago</div>
          </div>
        </div>
        <p className="lp-stk-post-body">Sub-50. Legs are jello. Worth it.</p>
        <div className="lp-stk-post-meta">
          <span className="lp-stk-post-stat">
            <LuHeart className="w-3.5 h-3.5" /> 24
          </span>
        </div>
      </div>
      <div className="lp-stk lp-stk--chip lp-stk--chip-flame" style={{ top: "22%", right: "6%", transform: "rotate(8deg)" }}>
        <LuFlame className="w-4 h-4" />
        <span><strong>12</strong> day streak</span>
      </div>
      <div className="lp-stk lp-stk--chip lp-stk--chip-cream" style={{ bottom: "6%", left: "42%", transform: "rotate(-5deg)" }}>
        <span className="lp-stk-xp">+ 240 XP</span>
        this week
      </div>
    </div>
  );
}

const STRIPS = [
  {
    num: "01",
    tag: "Profile + Algorithm",
    headline: "Matched to people who actually show up.",
    body: "A short survey shapes who you train with. The app reads it and picks events and crews nearby that click.",
    cls: "lp-strip--1",
    stickers: <MatchedStickers />,
    reverse: false,
  },
  {
    num: "02",
    tag: "Host + Chat",
    headline: "Host or join. Lock it in the chat.",
    body: "Spin up your own events quickly, then confirm in the thread. Plans that survive past 'sometime.'",
    cls: "lp-strip--2",
    stickers: <MakeItRealStickers />,
    reverse: true,
  },
  {
    num: "03",
    tag: "Posts + Streaks",
    headline: "Show up enough and the app shows it back.",
    body: "Share the after, build a streak, watch the weeks add up. Small rewards for sticking with it.",
    cls: "lp-strip--3",
    stickers: <StayInItStickers />,
    reverse: false,
  },
] as const;

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
  const [carouselEl, setCarouselEl] = useState<HTMLUListElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollCarousel = (dir: 1 | -1) => {
    if (!carouselEl) return;
    const first = carouselEl.querySelector("li") as HTMLElement | null;
    if (!first) return;
    const styles = window.getComputedStyle(carouselEl);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 24;
    carouselEl.scrollBy({ left: dir * (first.offsetWidth + gap), behavior: "smooth" });
  };

  useEffect(() => {
    if (!carouselEl) return;
    const update = () => {
      const max = carouselEl.scrollWidth - carouselEl.clientWidth;
      setCanPrev(carouselEl.scrollLeft > 1);
      setCanNext(carouselEl.scrollLeft < max - 1);
    };
    update();
    carouselEl.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(carouselEl);
    return () => {
      carouselEl.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [carouselEl]);

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
        className="lp-hero-stage relative overflow-hidden bg-base-100"
      >
        {/* ambient glows */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-[1400px] px-4 sm:px-10 lg:px-16 pt-8 pb-14 sm:pt-10 lg:pt-8 lg:pb-12 flex flex-col items-center">
          {/* Kicker */}
          <div className="lp-hero-kicker flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-base-content/55 mb-8 sm:mb-10 lg:mb-6 px-2 text-center">
            <span className="inline-block w-6 sm:w-8 h-px bg-base-content/30" />
            <span>Your workout wingman · Invite-only beta</span>
            <span className="inline-block w-6 sm:w-8 h-px bg-base-content/30" />
          </div>

          {/* Stage: verb field + logo overlay */}
          <div className="lp-hero-verb-stage relative w-full max-w-[1200px] min-h-[420px] sm:min-h-[480px] lg:min-h-[460px] flex items-center justify-center">
            {/* Verb field — masked so verbs fade to nothing before reaching the logo */}
            <div className="lp-hero-verb-mask absolute inset-0 pointer-events-none">
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
              className="lp-hero-logo-tilt relative z-10"
              style={{
                width: "min(60vmin, 28rem)",
                aspectRatio: "277.28/198.49",
              }}
            >
              <div
                className="lp-hero-logo-shadow absolute inset-0 -z-10 pointer-events-none"
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
              <div className="lp-hero-logo-breathe w-full h-full">
                <div className="lp-hero-logo-enter w-full h-full">
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
          <p className="lp-hero-tagline mt-6 sm:mt-4 lg:mt-2 text-base sm:text-xl text-base-content/65 leading-relaxed max-w-2xl text-center px-2">
            Find people who actually show up. MoveUs uses your psychological profile to match you with workout partners and local sports events that click with how you move.
          </p>

          <div className="lp-hero-ctas mt-6 sm:mt-8 lg:mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-2 sm:px-0">
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

      {/* FEATURE SHOWCASE — storybook chapter strips */}
      <section className="lp-story relative py-24 lg:py-32 bg-base-200 border-y border-base-300 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-16 lg:mb-20 max-w-2xl mx-auto">
            <h2 className="lp-story-h2">
              How{" "}
              <span className="relative inline-block text-primary">
                MoveUs
                <svg
                  className="absolute left-0 right-0 -bottom-2 w-full h-3 pointer-events-none overflow-visible"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    className="text-accent"
                    d="M2 7 Q 40 1, 80 7 T 160 7 T 198 7"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
              {" "}works.
            </h2>
            <p className="lp-story-lede">
              Find your people, lock the plan, keep showing up.
            </p>
          </div>

          <div className="lp-story-list">
            {STRIPS.map((s, i) => (
              <div key={s.num} className="lp-story-frame">
                <article className={`lp-strip ${s.cls} ${s.reverse ? "lp-strip--reverse" : ""}`}>
                  <div className="lp-strip-text">
                    <div className="lp-strip-eyebrow">
                      <span className="lp-strip-num">{s.num}</span>
                      <span className="lp-strip-slash" aria-hidden="true">/</span>
                      <span>{s.tag}</span>
                    </div>
                    <h3 className="lp-strip-headline">{s.headline}</h3>
                    <p className="lp-strip-body">{s.body}</p>
                  </div>
                  <div className="lp-strip-visual">{s.stickers}</div>
                </article>
                {i < STRIPS.length - 1 && (
                  <div className="lp-story-connector" aria-hidden="true">
                    <svg viewBox="0 0 96 28" className="w-24 h-7">
                      <path
                        d="M3 14 Q 16 3, 30 14 T 58 14 T 86 14"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <circle cx="90" cy="14" r="2.5" fill="currentColor" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEARBY EVENTS — simple carousel */}
      {(() => {
        const nearbyEvents = (eventsData?.anonymousUserEvents ?? [])
          .filter((e): e is NonNullable<typeof e> => Boolean(e))
          .slice(0, 6);

        return (
          <section className="py-20 lg:py-24 bg-base-100 border-t border-base-300 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
              <div className="text-center mb-10 lg:mb-12 max-w-2xl mx-auto">
                <h2 className="lp-story-h2 sm:whitespace-nowrap">
                  Happening{" "}
                  <span className="relative inline-block text-primary">
                    near you
                    <svg
                      className="absolute left-0 right-0 -bottom-2 w-full h-3 pointer-events-none overflow-visible"
                      viewBox="0 0 200 12"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        className="text-accent"
                        d="M2 7 Q 40 1, 80 7 T 160 7 T 198 7"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                  .
                </h2>
                <p className="lp-story-lede">
                  Real plans. Pick one, join, show up.
                </p>
              </div>
            </div>

            {eventsLoading ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) : nearbyEvents.length > 0 ? (
              <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
                <div className="lp-carousel" aria-label="Events near you">
                  <button
                    type="button"
                    onClick={() => scrollCarousel(-1)}
                    className="lp-carousel-arrow lp-carousel-arrow--prev"
                    aria-label="Previous events"
                    disabled={!canPrev}
                  >
                    <HiArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="lp-carousel-viewport">
                    <ul ref={setCarouselEl} className="lp-carousel-track">
                      {nearbyEvents.map((event) => (
                        <li key={event.id} className="lp-carousel-card">
                          <EventCard event={event} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollCarousel(1)}
                    className="lp-carousel-arrow lp-carousel-arrow--next"
                    aria-label="Next events"
                    disabled={!canNext}
                  >
                    <HiArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : null}

            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
              <div className="text-center mt-8 lg:mt-10">
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
        );
      })()}

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
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-8 flex flex-col items-center gap-5 text-sm text-base-content/60 sm:grid sm:grid-cols-3 sm:gap-4">
          <img src={moveusLogo} alt="MoveUs" className="h-7 sm:justify-self-start" />
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-self-center">
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </nav>
          <p className="sm:justify-self-end">MoveUs, j.d.o.o. 2026</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
