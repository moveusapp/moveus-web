import { randomInt } from "@/utils/math-utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function EventCardSkeleton() {
  return (
    <div className="w-full bg-block relative p-6 shrink-0 rounded-[15px] overflow-hidden h-44 font-medium flex flex-col">
      <Skeleton width={160} className="text-sm my-2" />
      <Skeleton width={randomInt(190, 400)} height={28} className="text-2xl" />
      <div className="mt-auto">
        <Skeleton style={{ width: "70%" }}/>
      </div>
    </div>
  );
}

export default EventCardSkeleton;
