import LocalizedStrings from "react-localization";
import en from "./en.json";
import hr from "./hr.json";

export enum Locale {
  EN = "en",
  HR = "hr",
}

const STORAGE_KEY = "moveus-language";
const DEFAULT_LOCALE: Locale = Locale.EN;

const strings = new LocalizedStrings({
  en: en,
  hr: hr,
});

export function getStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === Locale.EN || stored === Locale.HR) return stored;
  } catch {
    // storage unavailable
  }
  return DEFAULT_LOCALE;
}

function apply(locale: Locale): void {
  strings.setLanguage(locale);
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("lang", locale);
  }
}

/** Apply the locale to react-localization, persist to localStorage, set <html lang>. */
export function setLocale(locale: Locale): void {
  apply(locale);
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // storage unavailable
  }
}

apply(getStoredLocale());

export default strings;
