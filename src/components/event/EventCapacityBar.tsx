import strings from "@/translations/strings";

function EventCapacityBar({
  participantCount,
  maxParticipants,
}: EventCapacityBarProps) {
  if (!maxParticipants) return null;

  const spotsLeft = Math.max(0, maxParticipants - participantCount);
  const almostFull = participantCount / maxParticipants >= 0.5;

  if (spotsLeft === 0) {
    return <span className="text-xs font-medium whitespace-nowrap text-error">{strings.event.full}</span>;
  }

  const template = spotsLeft === 1 ? strings.event.spotLeft : strings.event.spotsLeft;

  return (
    <span
      className={`text-xs font-medium whitespace-nowrap ${
        almostFull ? "text-accent" : "text-base-content/60"
      }`}
    >
      {strings.formatString(template, { count: spotsLeft })}
    </span>
  );
}

interface EventCapacityBarProps {
  participantCount: number;
  maxParticipants: number;
}

export default EventCapacityBar;
