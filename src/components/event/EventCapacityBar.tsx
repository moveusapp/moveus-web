function EventCapacityBar({
  participantCount,
  maxParticipants,
}: EventCapacityBarProps) {
  if (!maxParticipants) return null;

  const spotsLeft = Math.max(0, maxParticipants - participantCount);
  const almostFull = participantCount / maxParticipants >= 0.5;

  if (spotsLeft === 0) {
    return <span className="text-sm font-medium whitespace-nowrap text-error">Full</span>;
  }

  return (
    <span
      className={`text-sm font-medium whitespace-nowrap ${
        almostFull ? "text-accent" : "text-base-content/50"
      }`}
    >
      {spotsLeft} {spotsLeft === 1 ? "spot" : "spots"} left
    </span>
  );
}

interface EventCapacityBarProps {
  participantCount: number;
  maxParticipants: number;
}

export default EventCapacityBar;
