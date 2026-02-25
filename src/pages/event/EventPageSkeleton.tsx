function EventPageSkeleton() {
  return (
    <div className="w-full mx-auto max-w-4xl p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <div className="skeleton w-[80%] h-8" />
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline">
              <div className="skeleton rounded-full w-7 h-7" />
              <div className="skeleton w-[40%] h-4" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-row gap-1 rounded-xl border border-base-300 bg-base-200 p-4">
              <div className="skeleton w-[100%] h-4" />
            </div>
            <div className="flex flex-row gap-1 rounded-xl border border-base-300 bg-base-200 p-4">
              <div className="skeleton w-[100%] h-4" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="skeleton w-[100%] h-4" />
            <div className="skeleton w-[100%] h-4" />
            <div className="skeleton w-[100%] h-4" />
            <div className="skeleton w-[100%] h-4" />
            <div className="skeleton w-[100%] h-4" />
            <div className="skeleton w-[100%] h-4" />
            <div className="skeleton w-[50%] h-4" />
          </div>
        </div>

        <div className="w-full lg:w-90 flex-shrink-0 flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-xl">
            <div className="skeleton w-60 h-60 w-full video-cover" />
          </div>

          <div className="rounded-xl border border-base-300 bg-base-200 p-5 flex flex-col gap-4">
            <div className="skeleton rounded-2xl w-full h-12" />
            <div className="skeleton rounded-2xl w-full h-12" />
          </div>

          <div className="hidden lg:block rounded-xl border border-base-300 bg-base-200 p-5">
            <div className="flex flex-col gap-2">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-secondary"
                >
                  <div className="skeleton rounded-full w-8 h-8" />
                  <div className="skeleton w-[80%] h-4" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden rounded-xl border border-base-300 bg-base-200 p-5">
          <div className="flex flex-col gap-2">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-secondary"
              >
                <div className="skeleton rounded-full w-8 h-8" />
                <div className="skeleton w-[80%] h-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPageSkeleton;
