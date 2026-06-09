import { HiCheck } from "react-icons/hi";
import { enumToOptions } from "@/utils/enum-to-options";
import { choiceSurface } from "../choice-styles";
import type { AvailabilityValue } from "@/surveys/types";

interface Props {
  dayEnum: Record<string, string>;
  dayNamespace: string;
  timeEnum: Record<string, string>;
  timeNamespace: string;
  value: AvailabilityValue[];
  onChange: (value: AvailabilityValue[]) => void;
}

function AvailabilityQuestion({
  dayEnum,
  dayNamespace,
  timeEnum,
  timeNamespace,
  value,
  onChange,
}: Props) {
  const dayOptions = enumToOptions(dayEnum, dayNamespace);
  const timeOptions = enumToOptions(timeEnum, timeNamespace);

  const isSelected = (dayOfWeek: string, timeOfDay: string) =>
    value.some((v) => v.dayOfWeek === dayOfWeek && v.timeOfDay === timeOfDay);

  const toggle = (dayOfWeek: string, timeOfDay: string) => {
    if (isSelected(dayOfWeek, timeOfDay)) {
      onChange(
        value.filter(
          (v) => !(v.dayOfWeek === dayOfWeek && v.timeOfDay === timeOfDay),
        ),
      );
    } else {
      onChange([...value, { dayOfWeek, timeOfDay }]);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-fixed w-full border-separate border-spacing-1.5">
        <thead>
          <tr>
            <th aria-hidden className="w-14" />
            {timeOptions.map((time) => (
              <th
                key={time.value}
                className="px-2 pb-1 text-xs font-medium text-base-content/60 text-center"
              >
                {time.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dayOptions.map((day) => (
            <tr key={day.value}>
              <th className="pr-3 text-sm font-medium text-base-content/70 text-right whitespace-nowrap">
                {day.label}
              </th>
              {timeOptions.map((time) => {
                const active = isSelected(day.value, time.value);
                return (
                  <td key={time.value}>
                    <button
                      type="button"
                      aria-pressed={active}
                      aria-label={`${day.label} ${time.label}`}
                      onClick={() => toggle(day.value, time.value)}
                      className={`flex items-center justify-center w-full h-11 rounded-xl border ${choiceSurface(active)}`}
                    >
                      <HiCheck
                        className={`text-lg transition-opacity duration-150 ${
                          active ? "opacity-100" : "opacity-0"
                        }`}
                        aria-hidden
                      />
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AvailabilityQuestion;
