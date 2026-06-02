import strings from "@/translations/strings";
import { sliderMidpoint } from "@/surveys/types";

interface Props {
  value: number | null | undefined;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  labelsNamespace?: string;
  unit?: string;
}

function resolveLabels(namespace?: string): string[] | null {
  if (!namespace) return null;
  let node: unknown = strings;
  for (const part of namespace.split(".")) {
    node = (node as Record<string, unknown> | null | undefined)?.[part];
  }
  return Array.isArray(node) ? (node as string[]) : null;
}

function SliderQuestion({
  value,
  onChange,
  min,
  max,
  step,
  labelsNamespace,
  unit,
}: Props) {
  // The runner seeds the value; the fallback is only defensive.
  const displayValue =
    typeof value === "number" && Number.isFinite(value)
      ? value
      : sliderMidpoint(min, max, step);

  const labels = resolveLabels(labelsNamespace);
  const readout =
    labels?.[displayValue - min] ??
    (unit ? `${displayValue} ${unit}` : String(displayValue));
  const endLabels =
    labels && labels.length >= 2
      ? [labels[0], labels[labels.length - 1]]
      : null;

  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex items-center justify-center min-h-[2.5rem] text-center text-xl sm:text-2xl font-semibold tabular-nums text-primary px-2"
        aria-live="polite"
      >
        {readout}
      </div>
      <input
        type="range"
        className="range range-primary w-full"
        min={min}
        max={max}
        step={step ?? 1}
        value={displayValue}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={readout}
      />
      {endLabels && (
        <div className="flex justify-between gap-4 px-1 text-sm font-medium text-base-content/60">
          <span className="max-w-[48%] text-left">{endLabels[0]}</span>
          <span className="max-w-[48%] text-right">{endLabels[1]}</span>
        </div>
      )}
    </div>
  );
}

export default SliderQuestion;
