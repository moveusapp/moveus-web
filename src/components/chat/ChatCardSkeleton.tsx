function ChatCardSkeleton() {
  return (
    <div
      className="bg-base-200 rounded-2xl border border-base-300 p-4"
    >
      <div className="flex gap-4 font-medium relative items-center">
        <div className="skeleton h-12 w-12 shrink-0 rounded-full" />
        <div className="flex flex-col overflow-hidden gap-1">
          <div className="skeleton h-4 w-40"/>
          <div className="skeleton h-4 w-100"/>
        </div>
      </div>
    </div>
  );
}

export default ChatCardSkeleton;
