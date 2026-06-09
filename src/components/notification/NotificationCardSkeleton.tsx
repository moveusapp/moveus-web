function NotificationCardSkeleton() {
  return (
    <div className="px-4 sm:px-5 py-4">
      <div className="flex flex-row items-center gap-3">
        <div className="skeleton h-11 w-11 shrink-0 rounded-2xl -rotate-6" />
        <div className="skeleton h-5 grow" />
        <div className="skeleton h-3 w-16 shrink-0" />
      </div>
    </div>
  );
}

export default NotificationCardSkeleton;
