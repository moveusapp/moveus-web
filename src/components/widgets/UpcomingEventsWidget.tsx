import { Link } from "react-router-dom";
import { useProfile } from "@/context/profile-context";
import { EventCardFragment, EventPhase } from "@/graphql/graphql-types";
import {
  ensureDateObject,
  formatTime,
  relativeLabel,
  startOfDay,
} from "@/utils/time-utils";
import { HiOutlineMap } from "react-icons/hi2";
import strings from "@/translations/strings";

const DISPLAY_LIMIT = 3;

function UpcomingEventsWidget() {
  const { profile } = useProfile();

  return (
    <div className="bg-base-200 rounded-2xl border border-base-300 p-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-neutral mb-3">
        {strings.widgets.comingUp}
      </h3>
      <WidgetBody profile={profile} />
    </div>
  );
}

function WidgetBody({
  profile,
}: {
  profile: ReturnType<typeof useProfile>["profile"];
}) {
  if (!profile) return <LoadingRows />;

  // Merge attending + organizing, dedupe by id (organized events can appear in
  // both lists), keep only upcoming/scheduled, soonest first.
  const byId = new Map<string, EventCardFragment>();
  for (const event of [
    ...(profile.attendingEvents ?? []),
    ...(profile.organizingEvents ?? []),
  ]) {
    if (event && event.phase === EventPhase.Scheduled)
      byId.set(String(event.id), event);
  }

  const upcoming = Array.from(byId.values()).sort(
    (a, b) =>
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  );

  if (upcoming.length === 0) return <EmptyRail />;

  const today = startOfDay(new Date());

  return (
    <div className="flex flex-col gap-0.5">
      {upcoming.slice(0, DISPLAY_LIMIT).map((event) => (
        <EventRow key={event.id} event={event} today={today} />
      ))}
      {upcoming.length > DISPLAY_LIMIT && (
        <Link
          to="/calendar"
          className="mt-1.5 -mx-2 px-2 py-1.5 rounded-lg text-xs font-semibold text-primary hover:bg-base-300/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {strings.common.seeAll}
        </Link>
      )}
    </div>
  );
}

function EventRow({
  event,
  today,
}: {
  event: EventCardFragment;
  today: Date;
}) {
  const start = ensureDateObject(event.startTime);
  const locale = strings.getLanguage();

  // The tile carries month + day. The "when" slot complements it: a relative
  // label when near, the weekday for same-year dates, or the year itself when
  // the event falls outside the current year (the detail the tile omits).
  const relative = relativeLabel(start, today);
  const when = relative
    ? relative.charAt(0).toUpperCase() + relative.slice(1)
    : start.getFullYear() === today.getFullYear()
      ? new Intl.DateTimeFormat(locale, { weekday: "short" }).format(start)
      : String(start.getFullYear());

  const place = event.location?.name || strings.event.locationTBD;

  return (
    <Link
      to={`/event/${event.id}`}
      className="group flex items-center gap-3 -mx-2 px-2 py-1.5 rounded-xl hover:bg-base-300/60 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <CalendarTile date={start} locale={locale} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-base-content line-clamp-1 group-hover:text-primary transition-colors duration-200">
          {event.title}
        </p>
        <p className="text-xs text-base-content/70 truncate">
          {when} · {formatTime(start)} · {place}
        </p>
      </div>
    </Link>
  );
}

function CalendarTile({ date, locale }: { date: Date; locale: string }) {
  const month = new Intl.DateTimeFormat(locale, { month: "short" }).format(
    date,
  );
  return (
    <div className="w-10 shrink-0 overflow-hidden rounded-lg border border-base-300 text-center leading-none">
      <div className="bg-primary py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-content">
        {month}
      </div>
      <div className="bg-base-100 py-1 text-sm font-bold text-base-content">
        {date.getDate()}
      </div>
    </div>
  );
}

function EmptyRail() {
  return (
    <div className="flex items-center gap-2 py-1">
      <HiOutlineMap
        size={18}
        className="shrink-0 -rotate-6 text-base-content/30"
        aria-hidden
      />
      <p className="text-sm text-base-content/70">
        {strings.widgets.comingUpEmptyCta}
      </p>
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="flex flex-col gap-0.5">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-2 py-1.5">
          <div className="skeleton w-10 h-9 rounded-lg shrink-0" />
          <div className="flex-1 min-w-0 flex flex-col gap-1.5">
            <div className="skeleton h-3 w-[70%]" />
            <div className="skeleton h-3 w-[50%]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default UpcomingEventsWidget;
