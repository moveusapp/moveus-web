import { EventRating } from "@/graphql/graphql-types";
import strings from "@/translations/strings";
import FaceSvg from "./FaceSvg";
import { RATING_OPTIONS, ratingIndex } from "./rating-options";

const BADGE_SIZES = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
} as const;

type RatingBadgeProps = {
  score: EventRating | number | null | undefined;
  size?: keyof typeof BADGE_SIZES;
  className?: string;
};

function RatingBadge({ score, size = "sm", className }: RatingBadgeProps) {
  const index =
    typeof score === "number"
      ? Math.max(0, Math.min(4, Math.round(score)))
      : ratingIndex(score);
  const option = RATING_OPTIONS[index];

  if (!option) {
    return (
      <span
        className={`flex ${BADGE_SIZES[size]} shrink-0 items-center justify-center rounded-2xl border border-base-300 bg-base-200 text-xs font-medium text-base-content/40 ${className ?? ""}`}
        title={strings.event.ratingFaces.notRated}
      >
        —
      </span>
    );
  }

  return (
    <span
      className={`flex ${BADGE_SIZES[size]} ${option.surface} ${option.ink} border shrink-0 items-center justify-center rounded-2xl ${className ?? ""}`}
      title={option.label}
      aria-label={option.label}
    >
      <FaceSvg index={index} />
    </span>
  );
}

export default RatingBadge;
