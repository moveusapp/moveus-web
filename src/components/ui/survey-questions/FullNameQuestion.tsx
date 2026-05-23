import strings from "@/translations/strings";

type Value = { firstName: string; lastName: string };

interface Props {
  value: Value;
  onChange: (value: Value) => void;
}

function FullNameQuestion({ value, onChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        autoComplete="given-name"
        placeholder={strings.survey.firstName}
        aria-label={strings.survey.firstName}
        className="input rounded-2xl w-full sm:basis-0 sm:grow min-h-12"
        value={value.firstName}
        onChange={(e) => onChange({ ...value, firstName: e.target.value })}
      />
      <input
        type="text"
        autoComplete="family-name"
        placeholder={strings.survey.lastName}
        aria-label={strings.survey.lastName}
        className="input rounded-2xl w-full sm:basis-0 sm:grow min-h-12"
        value={value.lastName}
        onChange={(e) => onChange({ ...value, lastName: e.target.value })}
      />
    </div>
  );
}

export default FullNameQuestion;
