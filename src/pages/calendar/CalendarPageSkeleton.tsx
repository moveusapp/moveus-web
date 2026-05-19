import EventCardSkeleton from "@/components/event/EventCardSkeleton";

function CalendarPageSkeleton() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="sticky top-0 z-20 flex items-center justify-between gap-3 flex-wrap px-4 sm:px-6 pt-4 sm:pt-5 pb-3 bg-base-100/85 backdrop-blur-md border-b border-base-content/8">
        <div className="skeleton h-8 w-32" />
        <div className="flex items-center gap-2 ml-auto">
          <div className="skeleton h-9 w-9 rounded-full" />
          <div className="skeleton h-6 w-40" />
          <div className="skeleton h-9 w-9 rounded-full" />
          <div className="skeleton h-8 w-20 rounded-full" />
        </div>
      </div>

      <div className="px-4 sm:px-6 pt-3 pb-2">
        <div className="h-[calc(100dvh-220px)]">
          <div
            className="grid gap-px bg-base-content/8 h-full"
            style={{
              gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
              gridTemplateRows: "auto repeat(6, minmax(0, 1fr))",
            }}
          >
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="bg-base-200/70 py-2 flex justify-center"
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
