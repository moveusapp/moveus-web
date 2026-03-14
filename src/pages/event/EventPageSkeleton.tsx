function EventPageSkeleton() {
  return (
    <div className="w-full mx-auto max-w-5xl px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Activity + Title */}
          <div className="skeleton w-16 h-3.5" />
          <div className="skeleton w-[80%] h-7 sm:h-8 lg:h-9 mt-1" />

          {/* Organizer */}
          <div className="flex items-center gap-2 mt-2">
            <div className="skeleton rounded-full w-7 h-7" />
            <div className="skeleton w-[40%] h-4" />
          </div>

          {/* Date/location row — mobile only */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 lg:hidden">
            <div className="skeleton w-36 h-4" />
            <div className="skeleton w-32 h-4" />
          </div>

          {/* Description */}
          <div className="mt-4 space-y-1.5">
            <div className="skeleton w-full h-4" />
            <div className="skeleton w-full h-4" />
            <div className="skeleton w-[60%] h-4" />
          </div>

          {/* Action bar — mobile only */}
          <div className="lg:hidden mt-4 py-3 flex items-center gap-3">
            <div className="skeleton flex-1 h-12 rounded-2xl" />
            <div className="skeleton w-12 h-12 rounded-2xl" />
          </div>

          {/* Tab bar */}
          <div className="bg-base-300 rounded-2xl border border-base-300 p-1 mt-4">
            <div className="flex flex-row gap-1">
              <div className="skeleton rounded-2xl h-10 grow" />
              <div className="skeleton rounded-2xl h-10 grow" />
            </div>
          </div>

          {/* Post skeletons */}
          <div className="mt-4 flex flex-col gap-4 pb-6">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-base-300 bg-base-200 p-4 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2">
                  <div className="skeleton rounded-full w-8 h-8" />
                  <div className="skeleton w-[30%] h-4" />
                </div>
                <div className="space-y-1.5">
                  <div className="skeleton w-full h-4" />
                  <div className="skeleton w-full h-4" />
                  <div className="skeleton w-[45%] h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="w-full lg:w-[340px] xl:w-[380px] lg:flex-shrink-0 order-first lg:order-last">
          <div className="lg:sticky lg:top-6 lg:self-start flex flex-col gap-4">
            {/* Thumbnail */}
            <div className="skeleton rounded-2xl aspect-video w-full" />

            {/* Action buttons — desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="skeleton flex-1 h-12 rounded-2xl" />
              <div className="skeleton w-12 h-12 rounded-2xl" />
            </div>

            {/* Date & Time card */}
            <div className="hidden lg:flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 p-4">
              <div className="skeleton w-[70%] h-4" />
            </div>

            {/* Location card */}
            <div className="hidden lg:flex items-start gap-3 rounded-2xl border border-base-300 bg-base-200 p-4">
              <div className="skeleton w-[60%] h-4" />
            </div>

            {/* Participants card */}
            <div className="hidden lg:block rounded-2xl border border-base-300 bg-base-200 p-4">
              <div className="skeleton w-[50%] h-4" />
              <div className="flex -space-x-2 mt-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="skeleton rounded-full w-10 h-10" />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default EventPageSkeleton;
