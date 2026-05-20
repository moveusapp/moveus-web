import { RATING_OPTIONS, RatingBadge } from "@/components/event/RatingFaces";

interface EventScoreProps {
  /** Final event score on a 1.0 - 5.0 scale. */
  score: number;
}

/** The aggregate rating a finished event earned, shown to everyone. */
function EventScore({ score }: EventScoreProps) {
  const index = Math.min(4, Math.max(0, Math.round(score) - 1));
  const word = RATING_OPTIONS[index].label;

  return (
    <div
      className="flex items-center gap-3"
      role="img"
      aria-label={`Rated ${word}, ${score.toFixed(1)} out of 5`}
    >
      <RatingBadge score={index} size="md" />
      <p className="flex items-baseline gap-2 text-lg font-bold">
        <span className="text-foreground">{word}</span>
        <span className="tabular-nums text-primary">
          {score.toFixed(1)}
          <span className="text-sm font-bold text-base-content/40"> / 5</span>
        </span>
      </p>
    </div>
  );
}

export default EventScore;
