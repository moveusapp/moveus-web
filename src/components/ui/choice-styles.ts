/**
 * The single source of truth for every selectable surface in the app: choice
 * chips, radio cards, the availability grid, and the activity-rating widget all
 * compose `choiceSurface`. It matches the daisyUI text inputs (a `base-100`
 * surface with a `base-content/20` hairline, the same `--input-color` daisyUI
 * uses) and goes solid `primary` when selected. Centralizing it here is what
 * stops the survey controls and the form controls from drifting apart.
 */
export function choiceSurface(isSelected: boolean): string {
  const base =
    "transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary";
  const state = isSelected
    ? "bg-primary text-primary-content border-primary"
    : "bg-base-100 text-base-content border-base-content/20 hover:border-primary/40 hover:bg-base-200";
  return `${base} ${state}`;
}

/** Pill chip, used for multi-select and the compact single-select variant. */
export function chipClass(isSelected: boolean): string {
  return [
    "inline-flex items-center gap-1.5 min-h-11 px-4 py-2 rounded-full border text-sm font-medium",
    choiceSurface(isSelected),
  ].join(" ");
}

/** Full-width radio card, used for the spotlight single-select (survey). */
export function optionCardClass(isSelected: boolean): string {
  return [
    "group flex items-center justify-between gap-3 w-full min-h-14 px-5 rounded-2xl border",
    "text-left font-medium",
    choiceSurface(isSelected),
  ].join(" ");
}
