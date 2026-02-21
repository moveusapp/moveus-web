import { useEffect, useMemo, useState } from "react";
import Dropdown from "../ui/Dropdown";

const dayOptions: Option<number>[] = Array.from({ length: 31 }, (_, i) => ({
  name: (i + 1).toString(),
  value: i + 1,
}));

const monthOptions: Option<number>[] = Array.from({ length: 12 }, (_, i) => ({
  name: (i + 1).toString(),
  value: i + 1,
}));

const minYear = new Date().getFullYear() - 18;
const yearOptions: Option<number>[] = Array.from({ length: 100 - 18 }, (_, i) => ({
  name: (minYear - i).toString(),
  value: minYear - i,
}));

const msInYear = 1000 * 60 * 60 * 24 * 365.25;

function DateOfBirth({ dob, setDob }: ProfileBioProps) {
  const [day, setDay] = useState<number | null>(dob?.getDate() ?? null);
  const [month, setMonth] = useState<number | null>(
    dob ? dob.getMonth() + 1 : null,
  );
  const [year, setYear] = useState<number | null>(dob?.getFullYear() ?? null);

  const error = useMemo(() => {
    if (!day || !month || !year) return "";
    
    const date = new Date(`${month}-${day}-${year}`);

    if (date.getDate() !== day) {
      return "Invalid date.";
    }

    if ((new Date().getTime() - date.getTime()) / msInYear < 18) {
      return "Must be over 18.";
    }

    return "";
  }, [day, month, year]);

  const validDate = useMemo(() => {
    if (!day || !month || !year || error) return null;
    return new Date(`${month}-${day}-${year}`);
  }, [day, month, year, error]);

  useEffect(() => {
    if (!validDate) {
      if (dob !== null) setDob(null);
      return;
    }

    if (!dob || validDate.toDateString() !== dob.toDateString()) {
      setDob(validDate);
    }
  }, [validDate, dob, setDob]);

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