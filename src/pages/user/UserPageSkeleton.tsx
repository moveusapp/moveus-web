import PostCardSkeleton from "@/components/post/PostCardSkeleton";

function UserPageSkeleton() {
  return (
    <div className="flex flex-col m-4 gap-2">
      <div className="bg-base-200 rounded-2xl border border-base-300 p-5">
        <div className="flex flex-row items-center gap-4">
          <div className="skeleton rounded-full w-20 h-20 flex-shrink-0"/>

          <div className="flex flex-col grow gap-2">
            <div className="skeleton h-7 w-48"/>
            <div className="skeleton h-4 w-28"/>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4 max-w-prose">
          <div className="skeleton h-4 w-full"/>
          <div className="skeleton h-4 w-3/4"/>
        </div>

        <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 mt-3">
          <div className="skeleton h-4 w-24"/>
          <div className="skeleton h-4 w-20"/>
          <div className="skeleton h-4 w-20"/>
        </div>
      </div>
      <div className="columns-1 md:columns-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="mb-3 break-inside-avoid">
            <PostCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPageSkeleton;
