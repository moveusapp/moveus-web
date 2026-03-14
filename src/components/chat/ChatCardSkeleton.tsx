function ChatCardSkeleton() {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <div className="skeleton h-10 w-10 shrink-0 rounded-full" />
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <div className="skeleton h-3.5 w-24 rounded" />
        <div className="skeleton h-3 w-36 rounded" />
      </div>
    </div>
  );
}

export default ChatCardSkeleton;
