import { useEffect, useState } from "react";

const MS_IN_YEAR = 1000 * 60 * 60 * 24 * 365.25;
const MIN_YEAR = new Date().getFullYear() - 18;

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const years = Array.from({ length: 82 }, (_, i) => MIN_YEAR - i);

interface Props {
  value: Date | null;
  onChange: (value: Date | null) => void;
}

function DateOfBirthQuestion({ value, onChange }: Props) {
  const [day, setDay] = useState<number | null>(value?.getDate() ?? null);
  const [month, setMonth] = useState<number | null>(
    value ? value.getMonth() + 1 : null,
  );
  const [year, setYear] = useState<number | null>(value?.getFullYear() ?? null);

  let error = "";
  let validDate: Date | null = null;
  if (day && month && year) {
    const date = new Date(year, month - 1, day);
    if (date.getDate() !== day || date.getMonth() !== month - 1) {
      error = "That date doesn't exist.";
    } else if ((Date.now() - date.getTime()) / MS_IN_YEAR < 18) {
      error = "You must be at least 18.";
    } else {
      validDate = date;
    }
  }

  useEffect(() => {
    if (validDate?.toDateString() !== value?.toDateString()) {
      onChange(validDate);
    }
  }, [validDate, value, onChange]);

  return (
    <div>
      <div className="flex gap-3">
        <select
          aria-label="Day"
          className="select rounded-2xl grow basis-0 min-h-12"
          value={day ?? ""}
          onChange={(e) => setDay(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Day</option>
          {days.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          aria-label="Month"
          className="select rounded-2xl grow-[1.5] basis-0 min-h-12"
          value={month ?? ""}
          onChange={(e) => setMonth(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Month</option>
          {months.map((name, i) => (
            <option key={name} value={i + 1}>{name}</option>
          ))}
        </select>
        <select
          aria-label="Year"
          className="select rounded-2xl grow basis-0 min-h-12"
          value={year ?? ""}
          onChange={(e) => setYear(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      {error && (
        <p className="text-error text-sm mt-3" role="alert">{error}</p>
      )}
    </div>
  );
}

export default DateOfBirthQuestion;
