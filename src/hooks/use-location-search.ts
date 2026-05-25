import { useEffect, useRef, useState } from "react";
import { CountryCode } from "@/graphql/graphql-types";
import type { LocationData } from "@/components/ui/LocationAutocomplete";

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

export type PhotonFeature = {
  geometry: { coordinates: [number, number] };
  properties: PhotonProperties;
};

const PHOTON_URL = "https://photon.komoot.io/api/";
const DEBOUNCE_MS = 250;

export function composeLabel(p: PhotonProperties): string {
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
  return (CountryCode as Record<string, CountryCode>)[key];
}

export function mapFeatureToLocationData(feature: PhotonFeature): LocationData {
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

/**
 * Debounced Photon (komoot.io) location search.
 * Captures the user's geolocation once on mount to bias results, and re-runs
 * whenever `query` changes. Returns raw features so the UI can render
 * Photon-shaped labels; use `mapFeatureToLocationData` to convert on select.
 */
export function useLocationSearch(query: string): PhotonFeature[] {
  const [results, setResults] = useState<PhotonFeature[]>([]);
  const biasCoords = useRef<{ lat: number; lon: number } | null>(null);

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

  return results;
}
