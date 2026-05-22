import { ReactNode } from "react";

type Tab<T extends string> = T | { label: ReactNode; value: T };

function TabButtons<T extends string>({
  tabs,
  activeTab,
  onChange,
  className,
}: TabButtonsProps<T>) {
  return (
    <div
      className={`flex gap-1 justify-between overflow-x-auto scrollbar-none ${className ?? ""}`}
    >
      {tabs.map((tab) => {
        const value = typeof tab === "string" ? tab : tab.value;
        const label = typeof tab === "string" ? tab : tab.label;
        const isActive = value === activeTab;

        return (
          <button
            key={value}
            type="button"
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap grow rounded-t-lg border-b-2 transition-all
            ${
              isActive
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-neutral hover:text-base-content hover:bg-base-200"
            }`}
            onClick={() => onChange(value)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

interface TabButtonsProps<T extends string> {
  tabs: readonly Tab<T>[];
  activeTab: T;
  onChange: (value: T) => void;
  className?: string;
}

export default TabButtons;
