import { HiFire, HiMapPin, HiTrophy } from "react-icons/hi2";

const quickStats = [
  { label: "Events This Week", value: "24", icon: HiTrophy },
  { label: "Active Near You", value: "186", icon: HiMapPin },
  { label: "Hot Streak", value: "5 days", icon: HiFire },
];

function UserActivityWidget() {
  return (
    <div className="bg-base-200 rounded-2xl border border-base-300 p-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-neutral mb-3">
        Your Activity
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
