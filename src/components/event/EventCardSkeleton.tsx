function EventCardSkeleton() {
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
