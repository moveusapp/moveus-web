import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Dropdown from "../input/Dropdown";

const dayOptions: Option<number>[] = new Array(31).fill(null).map((_, i) => {
  const day = i + 1;
  return {
    name: day.toString(),
    value: day,
  };
});

const monthOptions: Option<number>[] = new Array(12).fill(null).map((_, i) => {
  const month = i + 1;
  return {
    name: month.toString(),
    value: month,
  };
});

const minYear = new Date().getFullYear() - 18;

const yearOptions: Option<number>[] = new Array(100 - 18)
  .fill(null)
  .map((_, i) => {
    const year = minYear - i;
    return {
      name: year.toString(),
      value: year,
    };
  });

const msInYear = 1000 * 60 * 60 * 24 * 365.25;

function DateOfBirth({ dob, setDob }: ProfileBioProps) {
  console.log(dob);

  const [error, setError] = useState("");

  const [day, setDay] = useState<number | null>(dob?.getDate() ?? null);

  const [month, setMonth] = useState<number | null>(
    dob ? dob.getMonth() + 1 : null,
  );

  const [year, setYear] = useState<number | null>(dob?.getFullYear() ?? null);

  useEffect(() => {
    if (!day || !month || !year) return;
    const date = new Date(`${month}-${day}-${year}`);

    if (date.getDate() !== day) {
      setError("Invalid date.");
      if (dob) setDob(null);
      return;
    }

    if ((new Date().getTime() - date.getTime()) / msInYear < 18) {
      setError("Must be over 18.");
      if (dob) setDob(null);
      return;
    }

    setError("");

    if (dob && date.toDateString() === dob.toDateString()) return;

    setDob(date);
  }, [day, month, year, dob, setDob, setError]);

  return (
    <div>
      <h2 className="main-text">What is your day of birth?</h2>
      <div className="flex gap-[10px] *:basis-0">
        <Dropdown
          defaultName="Day"
          options={dayOptions as any}
          value={day}
          setValue={setDay}
          classname="grow"
        />
        <Dropdown
          defaultName="Month"
          options={monthOptions as any}
          value={month}
          setValue={setMonth}
          classname="grow"
        />
        <Dropdown
          defaultName="Year"
          options={yearOptions as any}
          value={year}
          setValue={setYear}
          classname="grow-2"
        />
      </div>
      <p className="text-right text-error mt-3">{error}</p>
    </div>
  );
}

export default DateOfBirth;

interface ProfileBioProps {
  dob: Date | null;
  setDob: (value: Date | null) => void;
}
