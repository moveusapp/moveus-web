interface Props {
  value: number | null | undefined;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  minLabel?: string;
  maxLabel?: string;
}

function SliderQuestion({
  value,
  onChange,
  min,
  max,
  step,
  minLabel,
  maxLabel,
}: Props) {
  const midpoint = min + Math.floor((max - min) / 2);
  const hasValue = typeof value === "number" && Number.isFinite(value);
  const displayValue = hasValue ? (value as number) : midpoint;
  const showLabels = !!minLabel || !!maxLabel;

  return (
    <div className="flex flex-col gap-3">
      <div
        className={`text-center text-4xl font-semibold tabular-nums transition-colors duration-150 ${
          hasValue ? "text-primary" : "text-base-content/30"
        }`}
        aria-live="polite"
      >
        {displayValue}
      </div>
      <input
        type="range"
        className="range range-primary w-full"
        min={min}
        max={max}
        step={step ?? 1}
        value={displayValue}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={hasValue ? String(displayValue) : "Not selected"}
      />
      {showLabels && (
        <div className="flex justify-between text-sm font-medium text-base-content/60 px-1">
          <span>{minLabel ?? ""}</span>
          <span>{maxLabel ?? ""}</span>
        </div>
      )}
    </div>
  );
}

export default SliderQuestion;
