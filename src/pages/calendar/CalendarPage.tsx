import EventCard from "@/components/event/EventCard";
import { useProfile } from "@/context/profile-context";
import { ContextProfileFragment, EventCardFragment } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import {
  dayKey,
  formatLongDate,
  relativeLabel,
  startOfDay,
} from "@/utils/time-utils";
import { useMemo, useState } from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import CalendarPageSkeleton from "./CalendarPageSkeleton";
import MonthGrid from "./MonthGrid";
import PageHeader from "@/components/layout/PageHeader";
import strings from "@/translations/strings";

const navButtonClass =
  "inline-flex items-center justify-center w-9 h-9 rounded-full text-base-content/70 hover:bg-base-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors";

function CalendarPage() {
  useDocumentTitle(strings.calendar.documentTitle);

  const { profile } = useProfile();

  const today = useMemo(() => startOfDay(new Date()), []);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [monthDate, setMonthDate] = useState<Date>(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const events = useMemo(() => mergeEvents(profile), [profile]);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, EventCardFragment[]>();
    for (const event of events) {
      if (!event.startTime) continue;
      const key = dayKey(new Date(event.startTime));
      const list = map.get(key);
      if (list) list.push(event);
      else map.set(key, [event]);
    }
    for (const list of map.values()) {
      list.sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      );
    }
    return map;
  }, [events]);

  const selectedEvents = useMemo(() => {
    const key = dayKey(selectedDate);
    return events
      .filter((e) => e.startTime && dayKey(new Date(e.startTime)) === key)
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      );
  }, [events, selectedDate]);

  if (!profile) return <CalendarPageSkeleton />;

  const firstInterestingDay = (month: Date): Date => {
    const year = month.getFullYear();
    const m = month.getMonth();
    if (year === today.getFullYear() && m === today.getMonth()) return today;
    const daysInMonth = new Date(year, m + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const candidate = new Date(year, m, d);
      if (eventsByDay.has(dayKey(candidate))) return candidate;
    }
    return new Date(year, m, 1);
  };

  const goToMonth = (offset: number) => {
    const newMonth = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() + offset,
      1,
    );
    setMonthDate(newMonth);
    setSelectedDate(firstInterestingDay(newMonth));
  };

  const handlePrevMonth = () => goToMonth(-1);
  const handleNextMonth = () => goToMonth(1);
  const handleToday = () => {
    setMonthDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };
  const handleSelectDate = (d: Date) => {
    setSelectedDate(d);
    if (
      d.getMonth() !== monthDate.getMonth() ||
      d.getFullYear() !== monthDate.getFullYear()
    ) {
      setMonthDate(new Date(d.getFullYear(), d.getMonth(), 1));
    }
  };

  const locale = strings.getLanguage();
  const relative = relativeLabel(selectedDate, today);
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(monthDate);

  return (
    <div className="h-full overflow-y-auto">
      <PageHeader
        title={strings.calendar.title}
        actions={
          <MonthNavActions
            monthLabel={monthLabel}
            onPrev={handlePrevMonth}
            onNext={handleNextMonth}
            onToday={handleToday}
          />
        }
      />

      <div className="px-4 sm:px-6 pt-3 pb-2">
        <MonthGrid
          className="h-[calc(100dvh-220px)]"
          monthDate={monthDate}
          selectedDate={selectedDate}
          today={today}
          eventsByDay={eventsByDay}
          myProfileId={profile.id ?? undefined}
          dayKey={dayKey}
          onSelectDate={handleSelectDate}
        />
      </div>

      <section className="flex flex-col gap-2 px-4 sm:px-6 pt-2 pb-6">
        <div className="flex items-baseline gap-2">
          <h2 className="text-base font-semibold">
            {formatLongDate(selectedDate, locale)}
          </h2>
          {relative && (
            <span className="text-sm text-base-content/55">· {relative}</span>
          )}
          {selectedEvents.length > 0 && (
            <span className="text-sm text-base-content/45 ml-auto">
              {strings.formatString(
                selectedEvents.length === 1
                  ? strings.calendar.eventCount
                  : strings.calendar.eventCountPlural,
                { count: selectedEvents.length },
              )}
            </span>
          )}
        </div>

        {selectedEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            {selectedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-base-content/55 italic">
            {emptyDayCopy(selectedDate, today, events.length === 0)}
          </p>
        )}
      </section>
    </div>
  );
}

type MonthNavActionsProps = {
  monthLabel: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
};

function MonthNavActions({
  monthLabel,
  onPrev,
  onNext,
  onToday,
}: MonthNavActionsProps) {
  return (
    <>
      <div className="flex items-center gap-0.5">
        <button
          type="button"
          onClick={onPrev}
          aria-label={strings.calendar.previousMonth}
          className={navButtonClass}
        >
          <HiOutlineChevronLeft size={20} />
        </button>
        <span
          className="text-base sm:text-lg font-semibold text-center tabular-nums shrink-0"
          style={{ width: "12rem" }}
        >
          {monthLabel}
        </span>
        <button
          type="button"
          onClick={onNext}
          aria-label={strings.calendar.nextMonth}
          className={navButtonClass}
        >
          <HiOutlineChevronRight size={20} />
        </button>
      </div>
      <button
        type="button"
        onClick={onToday}
        className="inline-flex items-center px-3 h-8 rounded-full text-sm font-medium text-base-content/80 bg-base-200 hover:bg-base-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors"
      >
        {strings.calendar.today}
      </button>
    </>
  );
}

function mergeEvents(
  profile: ContextProfileFragment | null,
): EventCardFragment[] {
  if (!profile) return [];
  const seen = new Set<number>();
  const out: EventCardFragment[] = [];
  const push = (
    list: ReadonlyArray<EventCardFragment | null> | null | undefined,
  ) => {
    if (!list) return;
    for (const ev of list) {
      if (!ev || ev.id == null || seen.has(ev.id)) continue;
      seen.add(ev.id);
      out.push(ev);
    }
  };
  push(profile.organizingEvents);
  push(profile.attendingEvents);
  return out;
}

function emptyDayCopy(
  selected: Date,
  today: Date,
  noEventsAtAll: boolean,
): string {
  if (noEventsAtAll) return strings.calendar.noEventsYet;
  const diff = Math.round(
    (startOfDay(selected).getTime() - today.getTime()) / 86_400_000,
  );
  if (diff === 0) return strings.calendar.nothingToday;
  if (diff > 0) return strings.calendar.nothingPlanned;
  return strings.calendar.noEventsOnDay;
}
export default CalendarPage;
