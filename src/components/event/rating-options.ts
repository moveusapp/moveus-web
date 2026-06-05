import { EventRating } from "@/graphql/graphql-types";
import strings from "@/translations/strings";

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
    label: strings.event.ratingFaces.VERY_BAD,
    ink: "text-red-600",
    surface: "border-red-200 bg-red-100",
    picked:
      "peer-checked:border-red-300 peer-checked:bg-red-100 peer-checked:text-red-600 peer-checked:shadow-red-500/25",
  },
  {
    rating: EventRating.Bad,
    label: strings.event.ratingFaces.BAD,
    ink: "text-orange-600",
    surface: "border-orange-200 bg-orange-100",
    picked:
      "peer-checked:border-orange-300 peer-checked:bg-orange-100 peer-checked:text-orange-600 peer-checked:shadow-orange-500/25",
  },
  {
    rating: EventRating.Neutral,
    label: strings.event.ratingFaces.NEUTRAL,
    ink: "text-amber-700",
    surface: "border-amber-200 bg-amber-100",
    picked:
      "peer-checked:border-amber-300 peer-checked:bg-amber-100 peer-checked:text-amber-700 peer-checked:shadow-amber-500/25",
  },
  {
    rating: EventRating.Good,
    label: strings.event.ratingFaces.GOOD,
    ink: "text-lime-700",
    surface: "border-lime-200 bg-lime-100",
    picked:
      "peer-checked:border-lime-300 peer-checked:bg-lime-100 peer-checked:text-lime-700 peer-checked:shadow-lime-500/25",
  },
  {
    rating: EventRating.Great,
    label: strings.event.ratingFaces.GREAT,
    ink: "text-emerald-600",
    surface: "border-emerald-200 bg-emerald-100",
    picked:
      "peer-checked:border-emerald-300 peer-checked:bg-emerald-100 peer-checked:text-emerald-600 peer-checked:shadow-emerald-500/25",
  },
];

/** Index of a rating within `RATING_OPTIONS` (0-4), or -1 if unknown. */
export function ratingIndex(rating: EventRating | null | undefined) {
  return RATING_OPTIONS.findIndex((o) => o.rating === rating);
}
