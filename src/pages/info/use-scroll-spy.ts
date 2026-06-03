import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view and returns its id so a table of
 * contents can highlight it.
 *
 * Scroll-position math rather than IntersectionObserver: the active section is
 * the last one whose heading has crossed an offset line below the sticky
 * header. At the very bottom of the page the final section wins outright, which
 * an observer band can never guarantee for a short trailing section.
 */
export function useScrollSpy(ids: string[], offset = 100): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);
  const key = ids.join("|");

  useEffect(() => {
    if (ids.length === 0) return;

    const compute = () => {
      const doc = document.documentElement;
      // Bottom of the document: the last section is current, full stop.
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        setActiveId(ids[ids.length - 1]);
        return;
      }
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) current = id;
        else break;
      }
      setActiveId(current);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        compute();
        ticking = false;
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, offset]);

  return activeId;
}
