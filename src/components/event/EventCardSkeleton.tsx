function EventCardSkeleton() {
  return (
    <div className="bg-base-200 rounded-2xl overflow-hidden border border-base-300">
      <div className="relative aspect-video overflow-hidden bg-base-300">
        <div className="skeleton h-full"/>
      </div>
      <div className="p-5">
        <div className="mb-2 skeleton h-7 w-[70%]" />
        <div className="mb-2 skeleton h-4 w-[100%]" />
        <div className="mb-2 skeleton h-4 w-[100%]" />
        <div className="mb-2 skeleton h-4 w-[100%]" />
        <div className="mb-2 skeleton h-4 w-[60%]" />
      </div>
    </div>
  );
}

export default EventCardSkeleton;
