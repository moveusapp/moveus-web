import { useEffect, useId, useRef, useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { CountryCode } from "@/graphql/graphql-types";
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

type PhotonProperties = {
  name?: string;
  street?: string;
  housenumber?: string;
  city?: string;
  district?: string;
  locality?: string;
  state?: string;
  country?: string;
  countrycode?: string;
  postcode?: string;
};

type PhotonFeature = {
  geometry: { coordinates: [number, number] };
  properties: PhotonProperties;
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

const PHOTON_URL = "https://photon.komoot.io/api/";
const DEBOUNCE_MS = 250;

function composeLabel(p: PhotonProperties): string {
  const parts: string[] = [];
  const streetLine = [p.housenumber, p.street].filter(Boolean).join(" ");
  if (p.name) parts.push(p.name);
  if (streetLine && streetLine !== p.name) parts.push(streetLine);
  const city = p.city ?? p.district ?? p.locality;
  if (city && city !== p.name) parts.push(city);
  if (p.country) parts.push(p.country);
  return parts.join(", ");
}

function toCountryCode(code: string | undefined): CountryCode | undefined {
  if (!code) return undefined;
  const key = code[0].toUpperCase() + code.slice(1).toLowerCase();
  const value = (CountryCode as Record<string, CountryCode>)[key];
  return value;
}

function mapFeatureToLocationData(feature: PhotonFeature): LocationData {
  const p = feature.properties;
  const streetLine = [p.housenumber, p.street].filter(Boolean).join(" ");
  const city = p.city ?? p.district ?? p.locality;
  const zip = p.postcode ? parseInt(p.postcode, 10) : NaN;

  return {
    name: composeLabel(p),
    addressLine1: streetLine || undefined,
    addressLine2: city || undefined,
    region: p.state || undefined,
    countryCode: toCountryCode(p.countrycode),
    zipCode: Number.isFinite(zip) ? zip : undefined,
    latitude: feature.geometry.coordinates[1],
    longitude: feature.geometry.coordinates[0],
  };
}

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
  const [results, setResults] = useState<PhotonFeature[]>([]);
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const biasCoords = useRef<{ lat: number; lon: number } | null>(null);
  const listboxId = useId();
  const hasError = !!error;
  const isSelected = value?.latitude != null;
  const showUnselectedHint =
    touched && !!value?.name?.trim() && !isSelected && !open;

  useEffect(() => {
    if (!("geolocation" in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        biasCoords.current = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
      },
      () => {},
      { maximumAge: 5 * 60 * 1000, timeout: 5000 },
    );
  }, []);

  useEffect(() => {
    if (value?.name !== query && value === null) setQuery("");
  }, [value]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      const url = new URL(PHOTON_URL);
      url.searchParams.set("q", trimmed);
      url.searchParams.set("limit", "15");
      url.searchParams.set("lang", "en");
      if (biasCoords.current) {
        url.searchParams.set("lat", String(biasCoords.current.lat));
        url.searchParams.set("lon", String(biasCoords.current.lon));
      }

      try {
        const res = await fetch(url.toString(), { signal: controller.signal });
        if (!res.ok) return;
        const data: { features?: PhotonFeature[] } = await res.json();
        setResults(data.features ?? []);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Photon request failed", err);
        }
      }
    }, DEBOUNCE_MS);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

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
              const label = composeLabel(feature.properties);
              return (
                <li key={`${label}-${i}`}>
                  <button
                    type="button"
                    role="option"
                    onClick={() => handleSelect(feature)}
                    className="focus:bg-primary/15 focus:text-primary focus:outline-none"
                  >
                    {label}
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
