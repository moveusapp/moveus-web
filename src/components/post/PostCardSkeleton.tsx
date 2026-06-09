interface PostCardSkeletonProps {
  variant?: "default" | "feed";
}

function PostCardSkeleton({ variant = "default" }: PostCardSkeletonProps) {
  const isFeed = variant === "feed";
  return (
    <article
      className={
        isFeed
          ? "w-full px-4 sm:px-5 py-4"
          : "bg-base-200 w-full rounded-2xl border border-base-300 overflow-hidden"
      }
    >
      <div className={isFeed ? "space-y-4" : "p-4 space-y-4"}>
        {/* Author row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="skeleton w-10 h-10 rounded-full flex-shrink-0" />
            <div className="flex flex-col gap-1.5 min-w-0">
              <div className="skeleton h-3.5 w-32" />
              <div className="skeleton h-3 w-24" />
            </div>
          </div>
          <div className="skeleton h-3 w-10 flex-shrink-0" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="skeleton h-3.5 w-full" />
          <div className="skeleton h-3.5 w-[92%]" />
          <div className="skeleton h-3.5 w-[60%]" />
        </div>

        {/* Image */}
        <div className="skeleton aspect-video w-full rounded-xl" />

        {/* Action bar */}
        <div className="flex items-center gap-4 pt-3 border-t border-base-300">
          <div className="flex items-center gap-1.5">
            <div className="skeleton w-5 h-5 rounded-md" />
            <div className="skeleton h-3 w-4" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="skeleton w-5 h-5 rounded-md" />
            <div className="skeleton h-3 w-4" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCardSkeleton;
