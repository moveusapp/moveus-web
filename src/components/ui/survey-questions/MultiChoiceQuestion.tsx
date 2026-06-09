import { enumToOptions } from "@/utils/enum-to-options";
import MultiChoice from "../MultiChoice";

interface Props {
  enumObj: Record<string, string>;
  enumNamespace: string;
  value: string[];
  onChange: (value: string[]) => void;
}

function MultiChoiceQuestion({
  enumObj,
  enumNamespace,
  value,
  onChange,
}: Props) {
  return (
    <MultiChoice
      value={value}
      setValue={onChange}
      options={enumToOptions(enumObj, enumNamespace)}
    />
  );
}

export default MultiChoiceQuestion;
