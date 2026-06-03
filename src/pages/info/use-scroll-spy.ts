import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view and returns its id so a table of
 * contents can highlight it.
 *
 * Scroll-position math rather than IntersectionObserver: the active section is
 * the last one whose heading has crossed an activation line below the sticky
 * header.
 *
 * Short trailing sections are the tricky case — the page can't scroll far
 * enough for their headings to reach the normal line, so a fixed line would
 * skip them and never light them up. Over the final screenful we ramp the line
 * down toward the bottom of the viewport, letting each trailing heading cross
 * it in turn and landing exactly on the last section at the bottom.
 */
export function useScrollSpy(ids: string[], offset = 100): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);
  const key = ids.join("|");

  useEffect(() => {
    if (ids.length === 0) return;

    // When the user clicks a TOC link the browser jumps to that anchor, but a
    // section near the bottom can't scroll up to the activation line, so the
    // scroll handler would re-select a lower section. While locked we treat the
    // hash target as authoritative and skip recompute; any real scroll input
    // (wheel/touch/keys) releases the lock and hands control back to the math.
    let lockUntil = 0;
    const release = () => {
      lockUntil = 0;
    };

    const compute = () => {
      if (Date.now() < lockUntil) return;
      const doc = document.documentElement;
      const viewport = window.innerHeight;
      const maxScroll = doc.scrollHeight - viewport;

      // Within the last screenful, slide the activation line from `offset` down
      // toward the viewport bottom so trailing sections that can't scroll up to
      // the offset line still get their turn.
      let line = offset;
      if (maxScroll > 0 && viewport > offset) {
        const rampLen = Math.min(viewport - offset, maxScroll);
        const rampStart = maxScroll - rampLen;
        if (window.scrollY > rampStart) {
          const t = Math.min(1, (window.scrollY - rampStart) / rampLen);
          line = offset + t * (viewport - offset);
        }
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - line <= 0) current = id;
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

    const onHashChange = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id || !ids.includes(id)) return;
      setActiveId(id);
      // Ride out the anchor jump; a manual scroll (below) ends it sooner.
      lockUntil = Date.now() + 800;
    };

    compute();
    onHashChange();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchmove", release, { passive: true });
    window.addEventListener("keydown", release);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
      window.removeEventListener("keydown", release);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, offset]);

  return activeId;
}
