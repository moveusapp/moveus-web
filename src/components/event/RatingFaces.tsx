import { EventRating } from "@/graphql/graphql-types";

export type RatingOption = { rating: EventRating; label: string };

/** Ordered 0-4, worst to best — matches the backend `EventRating` enum. */
export const RATING_OPTIONS: RatingOption[] = [
  { rating: EventRating.VeryBad, label: "Rough" },
  { rating: EventRating.Bad, label: "Meh" },
  { rating: EventRating.Neutral, label: "Okay" },
  { rating: EventRating.Good, label: "Good" },
  { rating: EventRating.Great, label: "Amazing" },
];

/** Index of a rating within `RATING_OPTIONS` (0-4), or -1 if unknown. */
export function ratingIndex(rating: EventRating | string | null | undefined) {
  return RATING_OPTIONS.findIndex((o) => o.rating === rating);
}

const MOUTHS = [
  "M7.8 16.2 Q12 11.6 16.2 16.2", // deep frown
  "M8.2 15.4 Q12 13.6 15.8 15.4", // slight frown
  "M8.4 14.8 H15.6", // flat
  "M7.9 13.9 Q12 17.2 16.1 13.9", // smile
];

export function FaceSvg({ index }: { index: number }) {
  const isGrin = index === 4;

  return (
    <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" aria-hidden="true">
      {isGrin ? (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        >
          <path d="M7.6 9.9 Q9 8.3 10.4 9.9" />
          <path d="M13.6 9.9 Q15 8.3 16.4 9.9" />
        </g>
      ) : (
        <g fill="currentColor">
          <circle cx="9" cy="9.6" r="1.35" />
          <circle cx="15" cy="9.6" r="1.35" />
        </g>
      )}

      {isGrin ? (
        <path d="M7.4 13 Q12 19 16.6 13 Z" fill="currentColor" />
      ) : (
        <path
          d={MOUTHS[index]}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

type RatingFacesProps = {
  value: EventRating | null;
  onChange: (rating: EventRating) => void;
  disabled?: boolean;
};

function RatingFaces({ value, onChange, disabled }: RatingFacesProps) {
  const selected = RATING_OPTIONS.find((o) => o.rating === value);

  return (
    <fieldset disabled={disabled} className="disabled:opacity-60">
      <legend className="sr-only">How would you rate this event?</legend>

      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {RATING_OPTIONS.map((option, index) => (
          <label
            key={option.rating}
            className="group relative cursor-pointer"
          >
            <input
              type="radio"
              name="event-rating"
              value={option.rating}
              checked={value === option.rating}
              onChange={() => onChange(option.rating)}
              className="peer sr-only"
            />
            <span
              className="flex aspect-square w-full items-center justify-center rounded-2xl border border-base-300 bg-base-200 text-base-content/35 transition duration-150 ease-out group-hover:-translate-y-0.5 group-hover:text-base-content/55 peer-checked:z-10 peer-checked:scale-110 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-content peer-checked:shadow-lg peer-checked:shadow-primary/25 peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-base-100 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:peer-checked:scale-100"
            >
              <FaceSvg index={index} />
            </span>
            <span className="sr-only">{option.label}</span>
          </label>
        ))}
      </div>

      <p className="mt-3 min-h-6 text-center text-sm font-medium" aria-hidden="true">
        {selected ? (
          <span className="text-primary">{selected.label}</span>
        ) : (
          <span className="text-base-content/50">Tap a face to rate</span>
        )}
      </p>
    </fieldset>
  );
}

export default RatingFaces;

const BADGE_SIZES = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
} as const;

type RatingBadgeProps = {
  /** A stored `EventRating` value, or its numeric index (0-4). */
  score: EventRating | string | number | null | undefined;
  size?: keyof typeof BADGE_SIZES;
  className?: string;
};

/** Read-only single-face tile — mirrors a selected `RatingFaces` cell. */
export function RatingBadge({ score, size = "sm", className }: RatingBadgeProps) {
  const index =
    typeof score === "number"
      ? Math.max(0, Math.min(4, Math.round(score)))
      : ratingIndex(score);
  const option = RATING_OPTIONS[index];

  if (!option) {
    return (
      <span
        className={`flex ${BADGE_SIZES[size]} shrink-0 items-center justify-center rounded-2xl border border-base-300 bg-base-200 text-xs font-medium text-base-content/40 ${className ?? ""}`}
        title="Not rated"
      >
        —
      </span>
    );
  }

  return (
    <span
      className={`flex ${BADGE_SIZES[size]} shrink-0 items-center justify-center rounded-2xl border border-primary bg-primary text-primary-content shadow-sm ${className ?? ""}`}
      title={option.label}
      aria-label={option.label}
    >
      <FaceSvg index={index} />
    </span>
  );
}
