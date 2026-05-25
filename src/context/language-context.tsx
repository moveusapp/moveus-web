import { createContext, ReactNode, useContext, useState } from "react";
import { getStoredLocale, Locale, setLocale } from "@/translations/strings";

type LanguageContextValue = {
  language: Locale;
  setLanguage: (next: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Holds the active locale and re-keys its children whenever it changes so that
 * all strings.* reads are re-evaluated. react-localization does not trigger
 * React updates on its own.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Locale>(getStoredLocale);

  const setLanguage = (next: Locale) => {
    if (next === language) return;
    void setLocale(next).then(() => setLanguageState(next));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div key={language} className="contents">
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
