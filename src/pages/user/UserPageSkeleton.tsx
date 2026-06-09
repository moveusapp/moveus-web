import PostCardSkeleton from "@/components/post/PostCardSkeleton";
import RightRail from "@/components/layout/RightRail";

function UserPageSkeleton() {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col grow min-w-0">
        <div className="w-full mx-auto max-w-[600px]">
          <header className="px-4 sm:px-5 pt-5 pb-4">
            <div className="flex items-start justify-between gap-3">
              <div className="skeleton rounded-full w-20 h-20 sm:w-24 sm:h-24 shrink-0" />
              <div className="skeleton h-10 w-28 rounded-2xl" />
            </div>

            <div className="mt-3 flex flex-col gap-2">
              <div className="skeleton h-7 w-48" />
              <div className="skeleton h-4 w-28" />
            </div>

            <div className="mt-3 flex flex-col gap-2 max-w-prose">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-3/4" />
            </div>

            <div className="mt-3 flex flex-row flex-wrap gap-x-4 gap-y-2">
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-4 w-20" />
            </div>
          </header>

          <div className="border-b border-base-300 h-11" />

          <div className="divide-y divide-base-300">
            {Array.from({ length: 4 }).map((_, i) => (
              <PostCardSkeleton key={i} variant="feed" />
            ))}
          </div>
        </div>
      </div>

      <RightRail />
    </div>
  );
}

export default UserPageSkeleton;
