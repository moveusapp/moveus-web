import { EventCardFragment } from "@/graphql/graphql-types";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface MonthGridProps {
  monthDate: Date;
  selectedDate: Date;
  today: Date;
  eventsByDay: Map<string, EventCardFragment[]>;
  myProfileId: number | undefined;
  dayKey: (d: Date) => string;
  onSelectDate: (d: Date) => void;
  className?: string;
}

function MonthGrid({
  monthDate,
  selectedDate,
  today,
  eventsByDay,
  myProfileId,
  dayKey,
  onSelectDate,
  className = "",
}: MonthGridProps) {
  const cells = buildMonthCells(monthDate);
  const selectedKey = dayKey(selectedDate);
  const todayKey = dayKey(today);

  return (
    <div className={className}>
      <div
        className="grid gap-px bg-base-content/8 h-full"
        style={{
          gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
          gridTemplateRows: "auto repeat(6, minmax(0, 1fr))",
        }}
      >
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="bg-base-200/70 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-base-content/55"
          >
            {d}
          </div>
        ))}
        {cells.map((cell) => {
          const key = dayKey(cell.date);
          const events = eventsByDay.get(key) ?? [];
          const isSelected = key === selectedKey;
          const isToday = key === todayKey;
          const featured = events[0];
          const overflow = events.length - (featured ? 1 : 0);

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectDate(cell.date)}
              aria-pressed={isSelected}
              aria-label={`${cell.date.toDateString()}${events.length ? `, ${events.length} event${events.length === 1 ? "" : "s"}` : ""}`}
              className={cellClass(cell.inMonth, isSelected, isToday)}
            >
              <span
                className={dayNumberClass(cell.inMonth, isSelected, isToday)}
              >
                {cell.date.getDate()}
              </span>

              {cell.inMonth && featured && (
                <span className="mt-auto flex flex-col gap-0.5 w-full min-w-0">
                  <span
                    title={featured.title}
                    className={badgeClass(
                      isHostingEvent(featured, myProfileId),
                      isSelected,
                    )}
                  >
                    {featured.title}
                  </span>
                  {overflow > 0 && (
                    <span
                      className={`text-[10px] font-semibold leading-none px-1 text-left ${
                        isSelected
                          ? "text-primary-content/80"
                          : "text-base-content/55"
                      }`}
                    >
                      +{overflow} more
                    </span>
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function isHostingEvent(
  event: EventCardFragment,
  myProfileId: number | undefined,
): boolean {
  return !!myProfileId && event.organizer?.user.id === myProfileId;
}

function cellClass(
  inMonth: boolean,
  selected: boolean,
  isToday: boolean,
): string {
  const base =
    "relative min-w-0 min-h-0 flex flex-col items-start text-left p-1 sm:p-1.5 outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/60 overflow-hidden";

  if (selected) return `${base} bg-primary text-primary-content`;
  if (!inMonth) return `${base} bg-base-200 hover:bg-base-300/60`;
  return `${base} bg-base-100 hover:bg-base-200`;
}

function dayNumberClass(
  inMonth: boolean,
  selected: boolean,
  isToday: boolean,
): string {
  const base = "text-xs sm:text-sm tabular-nums leading-none self-start";

  if (isToday && !selected) {
    return `${base} font-bold inline-flex items-center justify-center min-w-[20px] sm:min-w-[22px] h-[20px] sm:h-[22px] px-1 rounded-full bg-primary text-primary-content`;
  }
  if (selected) return `${base} font-bold`;
  if (!inMonth) return `${base} font-medium text-base-content/35 px-0.5`;
  return `${base} font-semibold text-base-content/80 px-0.5`;
}

function badgeClass(hosting: boolean, selected: boolean): string {
  const base =
    "block w-full truncate rounded px-1 py-0.5 text-[10px] sm:text-[11px] font-semibold leading-tight";

  if (selected) {
    return `${base} bg-primary-content/25 text-primary-content`;
  }
  if (hosting) {
    return `${base} bg-accent/15 text-accent`;
  }
  return `${base} bg-primary/15 text-primary`;
}

function buildMonthCells(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const offset = (firstOfMonth.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - offset);

  const cells: Array<{ date: Date; inMonth: boolean }> = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() + i,
    );
    cells.push({ date: d, inMonth: d.getMonth() === month });
  }
  return cells;
}

export default MonthGrid;
