import { useEffect, useId, useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { CountryCode } from "@/graphql/graphql-types";
import {
  composeLabel,
  mapFeatureToLocationData,
  useLocationSearch,
  type PhotonFeature,
} from "@/hooks/use-location-search";
import strings from "@/translations/strings";

export type LocationData = {
  name: string;
  addressLine1?: string;
  addressLine2?: string;
  region?: string;
  countryCode?: CountryCode;
  zipCode?: number;
  latitude?: number;
  longitude?: number;
};

type Props = {
  label: string;
  value: LocationData | null;
  onChange: (value: LocationData | null) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
};

const LocationAutocomplete = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
  className = "",
}: Props) => {
  const [query, setQuery] = useState(value?.name ?? "");
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const results = useLocationSearch(query);
  const listboxId = useId();
  const hasError = !!error;
  const isSelected = value?.latitude != null;
  const showUnselectedHint =
    touched && !!value?.name?.trim() && !isSelected && !open;

  useEffect(() => {
    if (value?.name !== query && value === null) setQuery("");
  }, [value]);

  const handleSelect = (feature: PhotonFeature) => {
    const loc = mapFeatureToLocationData(feature);
    setQuery(loc.name);
    onChange(loc);
    setOpen(false);
  };

  const handleChange = (next: string) => {
    setQuery(next);
    setOpen(true);
    onChange(next.trim() ? { name: next } : null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleWrapperBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setTouched(true);
      setOpen(false);
    }
  };

  const handleFocus = () => {
    if (results.length > 0) setOpen(true);
  };

  return (
    <fieldset className={`fieldset ${className}`}>
      <legend className="fieldset-legend">{label}</legend>
      <div className="relative" onBlur={handleWrapperBlur}>
        <input
          type="text"
          className="input w-full"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-invalid={hasError}
        />
        {open && results.length > 0 && (
          <ul
            id={listboxId}
            role="listbox"
            tabIndex={-1}
            className="menu bg-base-100 rounded-2xl shadow absolute z-10 left-0 right-0 mt-1 p-2 max-h-72 overflow-y-auto flex-nowrap"
          >
            {results.map((feature, i) => {
              const featureLabel = composeLabel(feature.properties);
              return (
                <li key={`${featureLabel}-${i}`}>
                  <button
                    type="button"
                    role="option"
                    onClick={() => handleSelect(feature)}
                    className="focus:bg-primary/15 focus:text-primary focus:outline-none"
                  >
                    {featureLabel}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {hasError ? (
        <div className="fieldset-helper-text text-error">{error}</div>
      ) : showUnselectedHint ? (
        <div className="fieldset-helper-text text-warning flex items-center gap-1.5">
          <HiOutlineLightBulb className="w-4 h-4 shrink-0" />
          {strings.ui.pickASuggestion}
        </div>
      ) : null}
    </fieldset>
  );
};

export default LocationAutocomplete;
