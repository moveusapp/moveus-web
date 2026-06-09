import { enumToOptions } from "@/utils/enum-to-options";
import SingleChoice from "../SingleChoice";

interface Props {
  enumObj: Record<string, string>;
  enumNamespace: string;
  value: string | null | undefined;
  onChange: (value: string) => void;
}

function SingleChoiceQuestion({
  enumObj,
  enumNamespace,
  value,
  onChange,
}: Props) {
  return (
    <SingleChoice
      value={value}
      setValue={onChange}
      options={enumToOptions(enumObj, enumNamespace)}
    />
  );
}

export default SingleChoiceQuestion;
