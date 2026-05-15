interface Props {
  value: string;
  onChange: (value: string) => void;
}

function TextQuestion({ value, onChange }: Props) {
  return (
    <input
      type="text"
      className="input rounded-2xl w-full min-h-12"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default TextQuestion;
