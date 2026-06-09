import { useEffect, useState } from "react";
import Field from "./Field";
import strings from "@/translations/strings";
import { getMonthNames } from "@/utils/month-names";

const MS_IN_YEAR = 1000 * 60 * 60 * 24 * 365.25;
const MIN_YEAR = new Date().getFullYear() - 18;

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from({ length: 82 }, (_, i) => MIN_YEAR - i);

interface DateOfBirthProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
  label?: string;
  /** External error; takes precedence over the built-in 18+ / valid-date check. */
  error?: string;
  className?: string;
}

/**
 * Day / month / year selects with built-in "must be 18+" and valid-date
 * checks. Reports the parsed date through `onChange` (or null while
 * incomplete / invalid).
 */
function DateOfBirth({
  value,
  onChange,
  label,
  error: externalError,
  className,
}: DateOfBirthProps) {
  const [day, setDay] = useState<number | null>(value?.getDate() ?? null);
  const [month, setMonth] = useState<number | null>(
    value ? value.getMonth() + 1 : null,
  );
  const [year, setYear] = useState<number | null>(value?.getFullYear() ?? null);
  const months = getMonthNames();

  let validationError = "";
  let validDate: Date | null = null;
  if (day && month && year) {
    const date = new Date(year, month - 1, day);
    if (date.getDate() !== day || date.getMonth() !== month - 1) {
      validationError = strings.validation.dateDoesntExist;
    } else if ((Date.now() - date.getTime()) / MS_IN_YEAR < 18) {
      validationError = strings.validation.atLeast18;
    } else {
      validDate = date;
    }
  }

  useEffect(() => {
    if (validDate?.toDateString() !== value?.toDateString()) {
      onChange(validDate);
    }
  }, [validDate, value, onChange]);

  const selectClass = "select rounded-2xl min-h-12 basis-0 grow";

  return (
    <Field
      label={label}
      error={externalError || validationError}
      className={className}
    >
      <div className="flex gap-3">
        <select
          aria-label={strings.common.day}
          className={selectClass}
          value={day ?? ""}
          onChange={(e) => setDay(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">{strings.common.day}</option>
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          aria-label={strings.common.month}
          className={`${selectClass} grow-[1.5]`}
          value={month ?? ""}
          onChange={(e) =>
            setMonth(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">{strings.common.month}</option>
          {months.map((name, i) => (
            <option key={name} value={i + 1}>
              {name}
            </option>
          ))}
        </select>
        <select
          aria-label={strings.common.year}
          className={selectClass}
          value={year ?? ""}
          onChange={(e) =>
            setYear(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">{strings.common.year}</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </Field>
  );
}

export default DateOfBirth;
