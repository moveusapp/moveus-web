import { useEffect, useMemo, useState } from "react";
import Dropdown from "./Dropdown";
import strings from "@/translations/strings";
import { getMonthNames } from "@/utils/month-names";

const dayOptions = Array.from({ length: 31 }, (_, i) => ({
  label: String(i + 1),
  value: i + 1,
}));

const maxYear = new Date().getFullYear() - 18;
const yearOptions = Array.from({ length: 82 }, (_, i) => ({
  label: String(maxYear - i),
  value: maxYear - i,
}));

const msInYear = 1000 * 60 * 60 * 24 * 365.25;

interface DateOfBirthProps {
  label: string;
  dob: Date | null;
  setDob: (value: Date | null) => void;
  error?: string;
  className?: string;
}

function DateOfBirth({
  label,
  dob,
  setDob,
  error: externalError,
  className = "",
}: DateOfBirthProps) {
  const [day, setDay] = useState<number | null>(dob?.getDate() ?? null);
  const [month, setMonth] = useState<number | null>(
    dob ? dob.getMonth() + 1 : null,
  );
  const [year, setYear] = useState<number | null>(dob?.getFullYear() ?? null);

  const monthOptions = getMonthNames().map((name, i) => ({
    label: name,
    value: i + 1,
  }));

  const validationError = useMemo(() => {
    if (!day || !month || !year) return "";

    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return strings.validation.invalidDate;
    }

    if ((Date.now() - date.getTime()) / msInYear < 18) {
      return strings.validation.mustBeOver18;
    }

    return "";
  }, [day, month, year]);

  const validDate = useMemo(() => {
    if (!day || !month || !year || validationError) return null;
    return new Date(year, month - 1, day);
  }, [day, month, year, validationError]);

  useEffect(() => {
    if (!validDate) {
      if (dob !== null) setDob(null);
      return;
    }

    if (!dob || validDate.toDateString() !== dob.toDateString()) {
      setDob(validDate);
    }
  }, [validDate, dob, setDob]);

  const error = externalError ?? validationError;
  const hasError = !!error;

  return (
    <fieldset className={`fieldset ${className}`}>
      <legend className="fieldset-legend">{label}</legend>
      <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-2">
        <Dropdown<number>
          placeholder={strings.common.day}
          options={dayOptions}
          value={day}
          setValue={setDay}
        />
        <Dropdown<number>
          placeholder={strings.common.month}
          options={monthOptions}
          value={month}
          setValue={setMonth}
        />
        <Dropdown<number>
          placeholder={strings.common.year}
          options={yearOptions}
          value={year}
          setValue={setYear}
        />
      </div>
      {hasError && (
        <div className="fieldset-helper-text text-error">{error}</div>
      )}
    </fieldset>
  );
}

export default DateOfBirth;
