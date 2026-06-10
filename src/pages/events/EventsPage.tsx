import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { HiArrowRight } from "react-icons/hi2";
import EventCard from "@/components/event/EventCard";
import EventCardSkeleton from "@/components/event/EventCardSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import SiteFooter from "@/components/misc/SiteFooter";
import { GetAnonymousUserEventsDocument } from "@/graphql/graphql-types";
import { useProfile } from "@/context/profile-context";
import useDocumentTitle from "@/hooks/use-document-title";
import strings from "@/translations/strings";
import moveusLogo from "@/assets/logos/moveus-logo.svg";

// A real 3x2 on desktop: six is the most the anonymous endpoint is asked to
// fill, and the grid collapses to two then one column as width drops.
const MAX_EVENTS = 6;

function EventsPage() {
  useDocumentTitle(strings.events.documentTitle);

  const { profile } = useProfile();

  const { data, loading } = useQuery(GetAnonymousUserEventsDocument);

  const events = (data?.anonymousUserEvents ?? [])
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .slice(0, MAX_EVENTS);

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* Public top bar: anonymous visitors get no app sidebar, so identity and
          the two entry CTAs live here. The one sanctioned glass surface. */}
      <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-6 py-3 sm:px-10 lg:px-16">
          <Link to="/" aria-label={strings.common.brand} className="flex items-center">
            <img src={moveusLogo} alt={strings.common.brand} className="h-7" />
          </Link>

          {profile ? (
            <Link to="/home" className="btn btn-primary btn-sm gap-2 btn-arrow">
              {strings.events.backToApp}
              <HiArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn btn-ghost btn-sm">
                {strings.events.logIn}
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm gap-2 btn-arrow">
                {strings.events.getStarted}
                <HiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="grow">
        <div className="mx-auto max-w-[1400px] px-6 pt-12 pb-16 sm:px-10 lg:px-16 lg:pt-16 lg:pb-24">
          {/* Heading: reuses the landing underline motif so the public surfaces
              feel of a piece. */}
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-base-content/50">
              {strings.events.kicker}
            </p>
            <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-black leading-[1.05] tracking-tight text-base-content">
              {strings.events.titlePrefix}{" "}
              <span className="relative inline-block text-primary">
                {strings.events.titleHighlight}
                <svg
                  className="pointer-events-none absolute -bottom-1.5 left-0 right-0 h-3 w-full overflow-visible"
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
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-base-content/65">
              {strings.events.lede}
            </p>
          </div>

          {/* Grid */}
          {loading ? (
            <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
              {Array.from({ length: MAX_EVENTS }).map((_, i) => (
                <li key={i}>
                  <EventCardSkeleton />
                </li>
              ))}
            </ul>
          ) : events.length > 0 ? (
            <ul
              className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
              aria-label={strings.events.gridAriaLabel}
            >
              {events.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-12 lg:mt-14">
              <EmptyState
                title={strings.events.emptyTitle}
                description={strings.events.emptyBody}
              >
                <Link to="/register" className="btn btn-primary btn-sm gap-2 btn-arrow">
                  {strings.events.getStarted}
                  <HiArrowRight className="h-4 w-4" />
                </Link>
              </EmptyState>
            </div>
          )}
        </div>

        {/* Sign-up nudge: only for visitors who can't already join. */}
        {!profile && (
          <section className="border-t border-base-300 bg-base-200">
            <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-6 py-16 text-center sm:px-10 lg:px-16 lg:py-24">
              <div className="max-w-md space-y-2">
                <h2 className="text-2xl font-black tracking-tight text-base-content sm:text-3xl">
                  {strings.events.ctaTitle}
                </h2>
                <p className="text-base leading-relaxed text-base-content/65">
                  {strings.events.ctaBody}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/register" className="btn btn-primary btn-lg gap-2 btn-arrow">
                  {strings.events.getStarted}
                  <HiArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/login" className="btn btn-ghost btn-lg">
                  {strings.events.logIn}
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

export default EventsPage;
