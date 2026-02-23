import { HiUsers } from "react-icons/hi";

function EventCapacityBar({
  participantCount,
  maxParticipants,
}: EventCapacityBarProps) {
  const spotsLeft = maxParticipants - participantCount;
  const spotsPercent = (participantCount! / maxParticipants!) * 100;
  const almostFull = maxParticipants && spotsPercent >= 50;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-base-content/70">
          <HiUsers size={14} className="text-primary" />
          <span>
            <strong
              className={`font-semibold text-sm ${almostFull ? "text-error" : "text-primary"}`}
            >
              {maxParticipants ? `${spotsPercent}%` : "No participant limit"}
            </strong>{" "}
            <span className="text-xs">
              {maxParticipants ? "filled" : ""}
            </span>
          </span>
        </div>
        {maxParticipants && (
          <div className="badge rounded-2xl bg-accent text-xs text-white">
            {spotsLeft} spots left
          </div>
        )}
      </div>
      {maxParticipants && (
        <div className="w-full bg-base-300 mt-2 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              almostFull ? "bg-error" : "bg-primary"
            }`}
            style={{
              width: `${maxParticipants ? spotsPercent : 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}

interface EventCapacityBarProps {
  participantCount: number;
  maxParticipants: number;
}

export default EventCapacityBar;
