import TextInput from "../TextInput";
import strings from "@/translations/strings";

type Value = { firstName: string; lastName: string };

interface Props {
  value: Value;
  onChange: (value: Value) => void;
}

function FullNameQuestion({ value, onChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <TextInput
        type="text"
        autoComplete="given-name"
        placeholder={strings.survey.firstName}
        aria-label={strings.survey.firstName}
        className="w-full sm:basis-0 sm:grow"
        value={value.firstName}
        onChange={(e) => onChange({ ...value, firstName: e.target.value })}
      />
      <TextInput
        type="text"
        autoComplete="family-name"
        placeholder={strings.survey.lastName}
        aria-label={strings.survey.lastName}
        className="w-full sm:basis-0 sm:grow"
        value={value.lastName}
        onChange={(e) => onChange({ ...value, lastName: e.target.value })}
      />
    </div>
  );
}

export default FullNameQuestion;
