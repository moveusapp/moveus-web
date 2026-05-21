import { useCallback, useState } from "react";
import { Theme, applyTheme, getInitialTheme, setStoredTheme } from "@/utils/theme";

/**
 * Reads the theme already applied to <html> by the inline script in index.html,
 * and exposes setters that persist the choice to localStorage.
 */
export default function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    return attr === "light" || attr === "dark" ? attr : getInitialTheme();
  });

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    setStoredTheme(next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
