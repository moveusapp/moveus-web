import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { HiArrowLeft, HiArrowRight, HiLockClosed } from "react-icons/hi2";
import moveusLogo from "@/assets/logos/moveus-logo.svg";
import "./landing.css";
import EventCard from "@/components/event/EventCard";
import EventCardSkeleton from "@/components/event/EventCardSkeleton";
import { GetAnonymousUserEventsDocument } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import { useProfile } from "@/context/profile-context";
import strings from "@/translations/strings";
import MatchedStickers from "./stickers/MatchedStickers";
import MakeItRealStickers from "./stickers/MakeItRealStickers";
import StayInItStickers from "./stickers/StayInItStickers";
import VerbSlot from "./VerbSlot";
import { useCarouselNav } from "./use-carousel-nav";
import { useHeroTilt } from "./use-hero-tilt";

function LandingPage() {
  const { profile } = useProfile();
  const heroRef = useRef<HTMLElement>(null);
  const logoTiltRef = useRef<HTMLDivElement>(null);
  const [carouselEl, setCarouselEl] = useState<HTMLUListElement | null>(null);

  const { canPrev, canNext, scrollBy: scrollCarousel } =
    useCarouselNav(carouselEl);

  useHeroTilt(heroRef, logoTiltRef);

  useDocumentTitle(strings.landing.documentTitle);

  const { data: eventsData, loading: eventsLoading } = useQuery(
    GetAnonymousUserEventsDocument,
  );

  if (profile) {
    return <Navigate to="/home" replace />;
  }

  const strips = [
    {
      num: "01",
      tag: strings.landing.strips.one.tag,
      headline: strings.landing.strips.one.headline,
      body: strings.landing.strips.one.body,
      cls: "lp-strip--1",
      stickers: <MatchedStickers />,
      reverse: false,
    },
    {
      num: "02",
      tag: strings.landing.strips.two.tag,
      headline: strings.landing.strips.two.headline,
      body: strings.landing.strips.two.body,
      cls: "lp-strip--2",
      stickers: <MakeItRealStickers />,
      reverse: true,
    },
    {
      num: "03",
      tag: strings.landing.strips.three.tag,
      headline: strings.landing.strips.three.headline,
      body: strings.landing.strips.three.body,
      cls: "lp-strip--3",
      stickers: <StayInItStickers />,
      reverse: false,
    },
  ];

  const nearbyEvents = (eventsData?.anonymousUserEvents ?? [])
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Closed beta strip */}
      <div className="sticky top-0 z-[60] bg-accent text-accent-content">
        <div className="mx-auto px-6 py-2 flex items-center justify-center gap-2 text-sm font-medium">
          <HiLockClosed className="w-4 h-4 shrink-0" />
          <span>
            {strings.landing.closedBetaPrefix}{" "}
            <span className="font-bold">{strings.landing.closedBetaHighlight}</span>
            {strings.landing.closedBetaSuffix}
          </span>
        </div>
      </div>

      {/* HERO — verbs cycle behind the logo */}
      <section
        ref={heroRef}
        className="lp-hero-stage relative overflow-hidden bg-base-100"
      >
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-[1400px] px-4 sm:px-10 lg:px-16 pt-8 pb-14 sm:pt-10 lg:pt-8 lg:pb-12 flex flex-col items-center">
          <div className="lp-hero-kicker flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-base-content/55 mb-8 sm:mb-10 lg:mb-6 px-2 text-center">
            <span className="inline-block w-6 sm:w-8 h-px bg-base-content/30" />
            <span>{strings.landing.kicker}</span>
            <span className="inline-block w-6 sm:w-8 h-px bg-base-content/30" />
          </div>

          <div className="lp-hero-verb-stage relative w-full max-w-[1200px] min-h-[420px] sm:min-h-[480px] lg:min-h-[460px] flex items-center justify-center">
            <div className="lp-hero-verb-mask absolute inset-0 pointer-events-none">
              <VerbSlot offset={0}  size="lg" color="primary" rotate={-2} positionClass="top-[1%] left-[0%]" />
              <VerbSlot offset={3}  size="md" color="accent"  rotate={2}  positionClass="top-[6%] right-[1%]" />
              <VerbSlot offset={6}  size="sm" color="primary" rotate={-1} positionClass="top-[46%] left-[0%]" />
              <VerbSlot offset={9}  size="sm" color="primary" rotate={1}  positionClass="top-[50%] right-[0%]" />
              <VerbSlot offset={12} size="md" color="accent"  rotate={-2} positionClass="bottom-[8%] left-[1%]" />
              <VerbSlot offset={1}  size="lg" color="primary" rotate={2}  positionClass="bottom-[1%] right-[1%]" />
            </div>

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
              <div
                className="lp-hero-logo-plate absolute -inset-x-12 -inset-y-8 -z-10 pointer-events-none"
                aria-hidden="true"
              />
              <div className="lp-hero-logo-breathe w-full h-full">
                <div className="lp-hero-logo-enter w-full h-full">
                  <h1 className="w-full h-full m-0">
                    <img
                      src={moveusLogo}
                      alt={strings.common.brand}
                      className="w-full h-full select-none"
                      draggable={false}
                    />
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <p className="lp-hero-tagline mt-6 sm:mt-4 lg:mt-2 text-base sm:text-xl text-base-content/65 leading-relaxed max-w-2xl text-center px-2">
            {strings.landing.tagline}
          </p>

          <div className="lp-hero-ctas mt-6 sm:mt-8 lg:mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-2 sm:px-0">
            <Link
              to="/register"
              className="btn btn-primary btn-lg gap-2 btn-arrow w-full sm:w-auto"
            >
              {strings.landing.requestInvite}
              <HiArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="btn btn-ghost btn-lg w-full sm:w-auto">
              {strings.landing.iHaveAccount}
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURE SHOWCASE */}
      <section className="lp-story relative py-24 lg:py-32 bg-base-200 border-y border-base-300 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-16 lg:mb-20 max-w-2xl mx-auto">
            <h2 className="lp-story-h2">
              {strings.landing.howItWorksPrefix}{" "}
              <span className="relative inline-block text-primary">
                {strings.common.brand}
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
              {" "}{strings.landing.howItWorksSuffix}
            </h2>
            <p className="lp-story-lede">
              {strings.landing.howItWorksLede}
            </p>
          </div>

          <div className="lp-story-list">
            {strips.map((s, i) => (
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
                {i < strips.length - 1 && (
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

      {/* NEARBY EVENTS */}
      <section className="py-20 lg:py-24 bg-base-100 border-t border-base-300 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-10 lg:mb-12 max-w-2xl mx-auto">
            <h2 className="lp-story-h2 sm:whitespace-nowrap">
              {strings.landing.happeningPrefix}{" "}
              <span className="relative inline-block text-primary">
                {strings.landing.happeningHighlight}
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
              {strings.landing.happeningLede}
            </p>
          </div>
        </div>

        {eventsLoading ? (
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="lp-carousel" aria-hidden="true">
              <div className="lp-carousel-arrow invisible" />
              <div className="lp-carousel-viewport">
                <ul className="lp-carousel-track">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <li key={i} className="lp-carousel-card">
                      <EventCardSkeleton />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lp-carousel-arrow invisible" />
            </div>
          </div>
        ) : nearbyEvents.length > 0 ? (
          <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="lp-carousel" aria-label={strings.landing.eventsAriaLabel}>
              <button
                type="button"
                onClick={() => scrollCarousel(-1)}
                className="lp-carousel-arrow lp-carousel-arrow--prev"
                aria-label={strings.landing.previousEvents}
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
                aria-label={strings.landing.nextEvents}
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
              {strings.landing.seeAllEvents}
              <HiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#028ED1] py-24 lg:py-28">
        <div
          className="absolute inset-0 opacity-[0.1]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative mx-auto px-6 sm:px-10 lg:px-16 text-center text-white">
          <h2 className="text-[clamp(1.625rem,7vw,4.5rem)] font-black mb-5 tracking-tight leading-[1.05] text-white whitespace-nowrap">
            {strings.landing.finalCtaHeadline}
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-md mx-auto">
            {strings.landing.finalCtaBody}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/register"
              className="btn btn-lg bg-base-100 text-primary hover:bg-base-200 border-0 gap-2 btn-arrow"
            >
              {strings.landing.requestInvite}
              <HiArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="btn btn-ghost btn-lg text-white hover:bg-white/15 border border-white/30"
            >
              {strings.landing.iHaveAccount}
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-base-200 border-t border-base-300">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-8 flex flex-col items-center gap-5 text-sm text-base-content/60 sm:grid sm:grid-cols-3 sm:gap-4">
          <img src={moveusLogo} alt={strings.common.brand} className="h-7 sm:justify-self-start" />
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-self-center">
            <Link to="/about" className="hover:text-primary transition-colors">{strings.footer.about}</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">{strings.landing.footerContact}</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">{strings.footer.privacy}</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">{strings.footer.terms}</Link>
          </nav>
          <p className="sm:justify-self-end">{strings.footer.copy}</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
