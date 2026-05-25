import { RefObject, useEffect } from "react";

export function useHeroTilt(
  heroRef: RefObject<HTMLElement | null>,
  logoTiltRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const hero = heroRef.current;
    const tilt = logoTiltRef.current;
    if (!hero || !tilt) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;

    const onMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      tx = (e.clientX - rect.left) / rect.width - 0.5;
      ty = (e.clientY - rect.top) / rect.height - 0.5;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      tilt.style.setProperty("--tx", `${cx * 9}deg`);
      tilt.style.setProperty("--ty", `${cy * -9}deg`);
      tilt.style.setProperty("--shx", `${cx * -22}px`);
      tilt.style.setProperty("--shy", `${cy * -22 + 30}px`);
      hero.style.setProperty("--cx", `${cx}`);
      hero.style.setProperty("--cy", `${cy}`);
      raf = requestAnimationFrame(loop);
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, [heroRef, logoTiltRef]);
}
