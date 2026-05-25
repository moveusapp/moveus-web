import { EventRating } from "@/graphql/graphql-types";
import strings from "@/translations/strings";
import FaceSvg from "./FaceSvg";
import { RATING_OPTIONS } from "./rating-options";

type RatingFacesProps = {
  value: EventRating | null;
  onChange: (rating: EventRating) => void;
  disabled?: boolean;
};

function RatingFaces({ value, onChange, disabled }: RatingFacesProps) {
  const selected = RATING_OPTIONS.find((o) => o.rating === value);

  return (
    <fieldset disabled={disabled} className="disabled:opacity-60">
      <legend className="sr-only">{strings.event.feedback.legend}</legend>

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
          <span className="text-base-content/50">{strings.event.feedback.tapToRate}</span>
        )}
      </p>
    </fieldset>
  );
}

export default RatingFaces;
