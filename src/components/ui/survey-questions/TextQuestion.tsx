interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function TextQuestion({ value, onChange, placeholder }: Props) {
  return (
    <input
      type="text"
      className="input rounded-2xl w-full min-h-12"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

export default TextQuestion;
