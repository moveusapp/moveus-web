import { EventRating } from "@/graphql/graphql-types";

export type RatingOption = {
  rating: EventRating;
  label: string;
  /** Saturated text/icon color, readable on a light tint or white. */
  ink: string;
  /** Soft tint surface (border + background) for a chip of this rating. */
  surface: string;
  /** `peer-checked:` color bundle for the selected face in the picker. */
  picked: string;
};

/**
 * Ordered 0-4, worst to best — matches the backend `EventRating` enum.
 * Each rating carries a hue on a red-to-green sentiment scale so a rating
 * reads at a glance, without parsing the small face. The face shape and
 * label stay as the colour-independent fallback.
 */
export const RATING_OPTIONS: RatingOption[] = [
  {
    rating: EventRating.VeryBad,
    label: "Rough",
    ink: "text-red-600",
    surface: "border-red-200 bg-red-100",
    picked:
      "peer-checked:border-red-300 peer-checked:bg-red-100 peer-checked:text-red-600 peer-checked:shadow-red-500/25",
  },
  {
    rating: EventRating.Bad,
    label: "Meh",
    ink: "text-orange-600",
    surface: "border-orange-200 bg-orange-100",
    picked:
      "peer-checked:border-orange-300 peer-checked:bg-orange-100 peer-checked:text-orange-600 peer-checked:shadow-orange-500/25",
  },
  {
    rating: EventRating.Neutral,
    label: "Okay",
    ink: "text-amber-700",
    surface: "border-amber-200 bg-amber-100",
    picked:
      "peer-checked:border-amber-300 peer-checked:bg-amber-100 peer-checked:text-amber-700 peer-checked:shadow-amber-500/25",
  },
  {
    rating: EventRating.Good,
    label: "Good",
    ink: "text-lime-700",
    surface: "border-lime-200 bg-lime-100",
    picked:
      "peer-checked:border-lime-300 peer-checked:bg-lime-100 peer-checked:text-lime-700 peer-checked:shadow-lime-500/25",
  },
  {
    rating: EventRating.Great,
    label: "Amazing",
    ink: "text-emerald-600",
    surface: "border-emerald-200 bg-emerald-100",
    picked:
      "peer-checked:border-emerald-300 peer-checked:bg-emerald-100 peer-checked:text-emerald-600 peer-checked:shadow-emerald-500/25",
  },
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
              className={`flex aspect-square w-full items-center justify-center rounded-2xl border border-base-300 bg-base-200 text-base-content/35 transition duration-150 ease-out group-hover:-translate-y-0.5 group-hover:text-base-content/55 peer-checked:z-10 peer-checked:scale-110 ${option.picked} peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-base-100 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:peer-checked:scale-100`}
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
  score: EventRating | string | number | null | undefined;
  size?: keyof typeof BADGE_SIZES;
  className?: string;
};

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
      className={`flex ${BADGE_SIZES[size]} ${option.surface} ${option.ink} border shrink-0 items-center justify-center rounded-2xl ${className ?? ""}`}
      title={option.label}
      aria-label={option.label}
    >
      <FaceSvg index={index} />
    </span>
  );
}
