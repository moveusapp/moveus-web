import DateOfBirth from "../DateOfBirth";

interface Props {
  value: Date | null;
  onChange: (value: Date | null) => void;
}

function DateOfBirthQuestion({ value, onChange }: Props) {
  return <DateOfBirth value={value} onChange={onChange} />;
}

export default DateOfBirthQuestion;
