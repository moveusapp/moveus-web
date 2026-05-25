import { useEffect, useState } from "react";
import strings from "@/translations/strings";

export type VerbSize = "sm" | "md" | "lg";

const VERB_SIZE_CLASS: Record<VerbSize, string> = {
  sm: "text-[clamp(1.5rem,5vw,3.25rem)]",
  md: "text-[clamp(2rem,7.5vw,5.5rem)]",
  lg: "text-[clamp(3rem,10.5vw,8.5rem)]",
};

interface VerbSlotProps {
  offset: number;
  size: VerbSize;
  color: "primary" | "accent";
  rotate: number;
  positionClass: string;
}

function VerbSlot({ offset, size, color, rotate, positionClass }: VerbSlotProps) {
  const verbs = strings.landing.verbs;
  const [idx, setIdx] = useState(offset % verbs.length);
  const [fade, setFade] = useState(false);
  const [entered, setEntered] = useState(false);

  const enterDelay = 120 + (offset % 6) * 110;

  useEffect(() => {
    const enterId = window.setTimeout(() => setEntered(true), enterDelay);
    const firstTickDelay = enterDelay + 1300 + (offset % 4) * 200;
    const period = 2800 + (offset % 4) * 450;
    let intervalId = 0;
    const firstId = window.setTimeout(() => {
      const tick = () => {
        setFade(true);
        window.setTimeout(() => {
          setIdx((i) => (i + 7) % verbs.length);
          setFade(false);
        }, 360);
      };
      tick();
      intervalId = window.setInterval(tick, period);
    }, firstTickDelay);
    return () => {
      window.clearTimeout(enterId);
      window.clearTimeout(firstId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [offset, verbs.length, enterDelay]);

  const colorClass = color === "primary" ? "text-primary/45" : "text-accent/50";

  let scale = 1;
  let translateY = 0;
  let blur = 0;
  let opacity = 1;
  if (!entered) {
    scale = 0.7;
    translateY = 28;
    blur = 10;
    opacity = 0;
  } else if (fade) {
    scale = 0.94;
    translateY = 14;
    blur = 5;
    opacity = 0;
  }

  return (
    <span
      aria-hidden="true"
      className={`absolute font-black tracking-[-0.04em] leading-none select-none whitespace-nowrap ${colorClass} ${VERB_SIZE_CLASS[size]} ${positionClass}`}
      style={{
        transform: `rotate(${rotate}deg) scale(${scale}) translateY(${translateY}px)`,
        opacity,
        filter: `blur(${blur}px)`,
        transition:
          "opacity 520ms cubic-bezier(0.16, 1, 0.3, 1), transform 520ms cubic-bezier(0.16, 1, 0.3, 1), filter 520ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform, opacity, filter",
      }}
    >
      {verbs[idx]}
    </span>
  );
}

export default VerbSlot;
