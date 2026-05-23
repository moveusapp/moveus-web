import { HiFire, HiMapPin, HiTrophy } from "react-icons/hi2";
import strings from "@/translations/strings";

function UserActivityWidget() {
  const quickStats = [
    { label: strings.widgets.eventsThisWeek, value: "24", icon: HiTrophy },
    { label: strings.widgets.activeNearYou, value: "186", icon: HiMapPin },
    { label: strings.widgets.hotStreak, value: strings.widgets.hotStreakValue, icon: HiFire },
  ];

  return (
    <div className="bg-base-200 rounded-2xl border border-base-300 p-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-neutral mb-3">
        {strings.widgets.yourActivity}
      </h3>
      <div className="flex flex-col gap-2.5">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon size={15} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-neutral">{stat.label}</p>
                <p className="text-sm font-bold text-base-content">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserActivityWidget;
