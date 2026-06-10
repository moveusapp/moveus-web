export function choiceSurface(isSelected: boolean): string {
  const base =
    "choice-control outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary";
  const state = isSelected
    ? "is-selected bg-primary text-primary-content border-primary"
    : "bg-base-100 text-base-content border-base-content/20 hover:border-primary/40 hover:bg-base-200";
  return `${base} ${state}`;
}

export function chipClass(isSelected: boolean): string {
  return [
    "inline-flex items-center gap-1.5 min-h-11 px-4 py-2 rounded-full border text-sm font-medium",
    choiceSurface(isSelected),
  ].join(" ");
}

export function optionCardClass(isSelected: boolean): string {
  return [
    "group flex items-center justify-between gap-3 w-full min-h-14 px-5 rounded-2xl border",
    "text-left font-medium",
    choiceSurface(isSelected),
  ].join(" ");
}
