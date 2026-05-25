import RatingBadge from "@/components/event/RatingBadge";
import { RATING_OPTIONS } from "@/components/event/rating-options";
import strings from "@/translations/strings";

interface EventScoreProps {
  score: number;
}

function EventScore({ score }: EventScoreProps) {
  const index = Math.min(4, Math.max(0, Math.round(score) - 1));
  const word = RATING_OPTIONS[index].label;

  return (
    <div
      className="flex items-center gap-3"
      role="img"
      aria-label={
        strings.formatString(strings.event.page.scoreAria, {
          word,
          score: score.toFixed(1),
        }) as string
      }
    >
      <RatingBadge score={index} size="md" />
      <p className="flex items-baseline gap-2 text-lg font-bold">
        <span className="text-foreground">{word}</span>
        <span className="tabular-nums text-primary">
          {score.toFixed(1)}
          <span className="text-sm font-bold text-base-content/40"> {strings.event.page.outOf5}</span>
        </span>
      </p>
    </div>
  );
}

export default EventScore;
