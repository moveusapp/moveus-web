import TextArea from "../TextArea";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function TextAreaQuestion({ value, onChange, placeholder }: Props) {
  return (
    <TextArea
      rows={7}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

export default TextAreaQuestion;
