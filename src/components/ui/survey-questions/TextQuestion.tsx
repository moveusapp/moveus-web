import TextInput from "../TextInput";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function TextQuestion({ value, onChange, placeholder }: Props) {
  return (
    <TextInput
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

export default TextQuestion;
