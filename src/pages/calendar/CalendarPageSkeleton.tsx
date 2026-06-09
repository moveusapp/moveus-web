import EventCardSkeleton from "@/components/event/EventCardSkeleton";
import PageHeader from "@/components/layout/PageHeader";
import strings from "@/translations/strings";

function CalendarPageSkeleton() {
  return (
    <div className="h-full overflow-y-auto">
      <PageHeader
        title={strings.calendar.title}
        actions={
          <div className="flex items-center gap-2">
            <div className="skeleton h-9 w-9 rounded-full" />
            <div className="skeleton h-6 w-40" />
            <div className="skeleton h-9 w-9 rounded-full" />
            <div className="skeleton h-8 w-20 rounded-full" />
          </div>
        }
      />

      <div className="px-4 sm:px-6 pt-3 pb-2">
        <div className="h-[calc(100dvh-220px)] overflow-hidden rounded-2xl border border-base-300">
          <div
            className="grid gap-px bg-base-300 h-full"
            style={{
              gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
              gridTemplateRows: "auto repeat(6, minmax(0, 1fr))",
            }}
          >
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="bg-base-200 py-2 flex justify-center"
              >
                <div className="skeleton h-3 w-6" />
              </div>
            ))}
            {Array.from({ length: 42 }).map((_, i) => (
              <div key={`c-${i}`} className="bg-base-100 p-1.5">
                <div className="skeleton h-3 w-4" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-4 sm:px-6 pt-2 pb-6">
        <div className="skeleton h-5 w-48" />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <EventCardSkeleton />
          <EventCardSkeleton />
        </div>
      </div>
    </div>
  );
}

export default CalendarPageSkeleton;
