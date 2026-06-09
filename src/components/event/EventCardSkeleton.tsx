interface EventCardSkeletonProps {
  variant?: "default" | "feed";
}

function EventCardSkeleton({ variant = "default" }: EventCardSkeletonProps) {
  if (variant === "feed") {
    return (
      <div className="px-4 sm:px-5 py-4">
        <div className="skeleton h-3 w-28 mb-2" />
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="skeleton w-10 h-10 rounded-full shrink-0" />
            <div className="flex flex-col gap-1.5 min-w-0">
              <div className="skeleton h-3.5 w-32" />
              <div className="skeleton h-3 w-24" />
            </div>
          </div>
          <div className="skeleton h-5 w-16 rounded-full shrink-0" />
        </div>
        <div className="mt-3 overflow-hidden rounded-2xl border border-base-300">
          <div className="skeleton aspect-video w-full rounded-none" />
          <div className="p-3.5">
            <div className="skeleton h-5 w-[55%]" />
            <div className="mt-2 flex flex-col gap-1.5">
              <div className="skeleton h-4 w-[45%]" />
              <div className="skeleton h-4 w-[35%]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-200 rounded-2xl border border-base-300 p-4 flex flex-col gap-2">
      <div className="skeleton aspect-video w-full rounded-xl" />
      <div className="skeleton h-5 w-[60%]" />
      <div className="flex flex-col gap-1">
        <div className="skeleton h-4 w-[50%]" />
        <div className="skeleton h-4 w-[40%]" />
      </div>
      <div className="flex items-center justify-between pt-1.5 border-t border-base-300">
        <div className="flex items-center gap-2">
          <div className="skeleton w-6 h-6 rounded-full" />
          <div className="skeleton h-3 w-24" />
        </div>
        <div className="skeleton h-4 w-14" />
      </div>
    </div>
  );
}

export default EventCardSkeleton;
