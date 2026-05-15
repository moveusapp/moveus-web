interface Props {
  value: string;
  onChange: (value: string) => void;
}

function TextAreaQuestion({ value, onChange }: Props) {
  return (
    <textarea
      className="textarea rounded-2xl w-full resize-none leading-relaxed"
      rows={7}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default TextAreaQuestion;
