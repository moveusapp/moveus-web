import { IoStatsChart } from "react-icons/io5";
import strings from "@/translations/strings";

function UserProgressWidget() {
  return (
    <div className="bg-base-200 rounded-2xl border border-base-300 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral">
          {strings.widgets.progress}
        </h3>
        <div className="badge badge-accent badge-sm text-base-200 font-bold">
          {strings.formatString(strings.widgets.level, { level: 5 })}
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-xs text-base-content/60">
            <IoStatsChart size={13} className="text-accent" />
            <strong className="font-semibold text-accent">
              {strings.formatString(strings.widgets.exp, { count: 200 })}
            </strong>
          </div>
          <span className="text-xs text-base-content/40 font-medium">
            {strings.formatString(strings.widgets.exp, { count: 1600 })}
          </span>
        </div>
        <div className="w-full bg-base-300 rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 bg-accent"
            style={{ width: `${45}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default UserProgressWidget;
