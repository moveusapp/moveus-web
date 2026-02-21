import EventCardSkeleton from "@/components/event/EventCardSkeleton";

function UserPageSkeleton() {
  return (
    <div className="flex flex-col m-4 gap-2">
      <div className="bg-base-200 rounded-2xl border border-base-300 p-4">
        <div className="flex flex-row gap-3">
          <div className="skeleton rounded-full w-18 h-18"/>

          <div className="flex flex-col grow justify-start mt-2 gap-1">
            <div className="flex flex-row gap-1 items-center">
              <div className="skeleton h-5 w-50"/>
            </div>

            <p className="text-sm text-base-content/70">
              <div className="skeleton h-4 w-25"/>
            </p>

            <div className="flex flex-col gap-1 mt-1">
              <div className="skeleton h-4 w-100"/>
              <div className="skeleton h-4 w-100"/>
              <div className="skeleton h-4 w-50"/>
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
    </div>
  );
}

export default UserPageSkeleton;
