import PostCardSkeleton from "@/components/post/PostCardSkeleton";

function EventPageSkeleton() {
  return (
    <div className="w-full mx-auto max-w-5xl py-5 lg:px-3 lg:py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left column */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Header shares the loaded page's content inset so nothing shifts
              horizontally when the skeleton is replaced. */}
          <div className="px-4 sm:px-5">
            {/* Activity + Title */}
            <div className="skeleton w-16 h-3.5" />
            <div className="skeleton w-[80%] h-7 sm:h-8 lg:h-9 mt-1.5" />

            {/* Organizer */}
            <div className="flex items-center gap-2 mt-3">
              <div className="skeleton rounded-full w-9 h-9" />
              <div className="skeleton w-[40%] h-4" />
            </div>

            {/* Date/location row — mobile only */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-4 lg:hidden">
              <div className="skeleton w-36 h-4" />
              <div className="skeleton w-32 h-4" />
            </div>

            {/* Description */}
            <div className="mt-5 space-y-1.5">
              <div className="skeleton w-full h-4" />
              <div className="skeleton w-full h-4" />
              <div className="skeleton w-[60%] h-4" />
            </div>
          </div>

          {/* Action bar — mobile only */}
          <div className="lg:hidden mt-6 py-3.5 px-4 sm:px-5 flex items-center gap-3">
            <div className="skeleton flex-1 h-12 rounded-2xl" />
            <div className="skeleton w-12 h-12 rounded-2xl" />
          </div>

          {/* Post skeletons */}
          <div className="mt-6 divide-y divide-base-300 pb-6">
            {[...Array(2)].map((_, i) => (
              <PostCardSkeleton key={i} variant="feed" />
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="w-full px-4 lg:px-0 lg:w-[280px] lg:flex-shrink-0 order-first lg:order-last">
          <div className="lg:sticky lg:top-8 lg:self-start flex flex-col gap-6">
            {/* Thumbnail */}
            <div className="skeleton rounded-2xl aspect-video w-full" />

            {/* Action buttons — desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="skeleton flex-1 h-12 rounded-2xl" />
              <div className="skeleton w-12 h-12 rounded-2xl" />
            </div>

            <div className="hidden lg:flex lg:flex-col gap-4 border-t border-base-300 pt-6">
              <div className="flex items-center gap-3">
                <div className="skeleton h-5 w-5 rounded shrink-0" />
                <div className="skeleton h-4 w-[70%]" />
              </div>
              <div className="flex items-center gap-3">
                <div className="skeleton h-5 w-5 rounded shrink-0" />
                <div className="skeleton h-4 w-[55%]" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="skeleton h-5 w-5 rounded shrink-0" />
                  <div className="skeleton h-4 w-[40%]" />
                </div>
                <div className="flex -space-x-3 pl-8">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="skeleton w-10 h-10 rounded-full ring-2 ring-base-100"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default EventPageSkeleton;
