function UserCardSkeleton() {
  return (
    <div
      className="bg-base-200 rounded-2xl border border-base-300 p-4"
    >
      <div className="flex flex-row gap-2">
        <div className="skeleton h-12 w-12 shrink-0 rounded-full" />
        <div className="flex flex-col w-full justify-between gap-1">
          <div className="skeleton h-4 w-[70%]"/>
          <div className="skeleton h-4 w-[40%]"/>
        </div>
      </div>
    </div>
  );
}

export default UserCardSkeleton;
