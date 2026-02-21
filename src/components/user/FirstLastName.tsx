import { ChangeEvent, useCallback, useState } from "react";
import {
  firstnameValidator,
  lastnameValidator,
} from "@/utils/validators/basic-info-validators";
import TextInput from "../ui/TextInput";

function FirstLastName({
  firstname,
  lastname,
  setFirstname,
  setLastname,
}: FirstLastNameProps) {
  const [localFirstname, setLocalFirstname] = useState(firstname);
  const [locaLastname, setLocalLastname] = useState(lastname);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      if (name === "firstname" && firstnameValidator(value) === undefined)
        setFirstname(value);
      else if (lastnameValidator(value) === undefined) setLastname(value);
    },
    [setFirstname, setLastname],
  );

  return (
    <div>
      <h2 className="main-text">What is your name?</h2>
      <TextInput
        name="firstname"
        value={localFirstname}
        setValue={setLocalFirstname}
        onChange={handleChange}
        validate={firstnameValidator}
        className="mb-3"
      />
      <TextInput
        name="lastname"
        value={locaLastname}
        setValue={setLocalLastname}
        onChange={handleChange}
        validate={lastnameValidator}
      />
    </div>
  );
}

export default FirstLastName;

interface FirstLastNameProps {
  firstname: string;
  lastname: string;
  setFirstname: (value: string) => void;
  setLastname: (value: string) => void;
}
