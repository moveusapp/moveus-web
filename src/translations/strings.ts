import LocalizedStrings from "react-localization";
// Type-only import — TS strips this, so the JSON does NOT land in the eager bundle.
import type EnContent from "./en.json";

export enum Locale {
  EN = "en",
  HR = "hr",
  SV = "sv",
}

const STORAGE_KEY = "moveus-language";
const DEFAULT_LOCALE: Locale = Locale.EN;

type LocaleContent = typeof EnContent;

const loaders: Record<Locale, () => Promise<LocaleContent>> = {
  [Locale.EN]: () => import("./en.json").then((m) => m.default as LocaleContent),
  [Locale.HR]: () => import("./hr.json").then((m) => m.default as LocaleContent),
  [Locale.SV]: () => import("./sv.json").then((m) => m.default as LocaleContent),
};

const loaded: Partial<Record<Locale, LocaleContent>> = {};

// Single stable instance; content is seeded on demand via loadLocale().
const strings = new LocalizedStrings<LocaleContent>({ en: {} as LocaleContent });

export function getStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === Locale.EN || stored === Locale.HR || stored === Locale.SV) return stored;
  } catch {
    // storage unavailable
  }
  return DEFAULT_LOCALE;
}

function apply(locale: Locale): void {
  strings.setContent(loaded as Record<string, LocaleContent>);
  strings.setLanguage(locale);
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("lang", locale);
  }
}

/** Fetch a locale chunk (if not already loaded) and activate it. */
export async function loadLocale(locale: Locale): Promise<void> {
  if (!loaded[locale]) {
    loaded[locale] = await loaders[locale]();
  }
  apply(locale);
}

/** Activate a locale and persist the choice. */
export async function setLocale(locale: Locale): Promise<void> {
  await loadLocale(locale);
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // storage unavailable
  }
}

export default strings;
