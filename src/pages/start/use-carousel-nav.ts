import { useCallback, useEffect, useState } from "react";

export function useCarouselNav(el: HTMLElement | null) {
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanPrev(el.scrollLeft > 1);
      setCanNext(el.scrollLeft < max - 1);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [el]);

  const scrollBy = useCallback(
    (dir: 1 | -1) => {
      if (!el) return;
      const first = el.querySelector("li") as HTMLElement | null;
      if (!first) return;
      const styles = window.getComputedStyle(el);
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 24;
      el.scrollBy({ left: dir * (first.offsetWidth + gap), behavior: "smooth" });
    },
    [el],
  );

  return { canPrev, canNext, scrollBy };
}
