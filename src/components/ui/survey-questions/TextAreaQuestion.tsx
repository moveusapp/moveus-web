interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function TextAreaQuestion({ value, onChange, placeholder }: Props) {
  return (
    <textarea
      className="textarea rounded-2xl w-full resize-none leading-relaxed"
      rows={7}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

export default TextAreaQuestion;
