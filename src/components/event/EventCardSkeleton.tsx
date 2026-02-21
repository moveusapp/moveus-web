function EventCardSkeleton() {
  return (
    <div className="bg-base-200 w-full rounded-2xl overflow-hidden border border-base-300">
      <div className="relative w-full aspect-video overflow-hidden bg-base-300">
        <div className="skeleton h-full w-full"/>
      </div>
      <div className="p-5">
        <div className="mb-2 skeleton h-7 w-120" />
        <div className="mb-2 skeleton h-4 w-100" />
        <div className="mb-2 skeleton h-4 w-100" />
        <div className="mb-2 skeleton h-4 w-100" />
        <div className="mb-2 skeleton h-4 w-80" />
      </div>
    </div>
  );
}

export default EventCardSkeleton;
