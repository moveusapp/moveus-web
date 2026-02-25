function PostCardSkeleton() {
  return (
    <article className="bg-base-200 w-full rounded-2xl border border-base-300 overflow-hidden hover:border-primary/20 transition-all">
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div
            className="flex items-center gap-3 flex-1 min-w-0 group"
          >
            <div className="skeleton rounded-full w-10 h-10" />
            <div className="flex flex-col gap-1 min-w-0">
              <div className="skeleton h-3 w-50" />
              <div className="skeleton h-3 w-[50%]" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="skeleton h-4 w-[100%]" />
          <div className="skeleton h-4 w-[100%]" />
          <div className="skeleton h-4 w-[100%]" />
          <div className="skeleton h-4 w-[50%]" />
        </div>
      </div>
    </article>
  );
}

export default PostCardSkeleton;