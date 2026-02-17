import { ChangeEvent, useCallback, useState } from "react";
import { bioValidator } from "@/utils/validators/basic-info-validators";
import TextArea from "../input/TextArea";

function ProfileBio({ bio, setBio }: ProfileBioProps) {
  const [localBio, setLocalBio] = useState(bio);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.currentTarget;
      if (bioValidator(value) === undefined) setBio(value);
    },
    [setBio],
  );

  return (
    <div>
      <h2 className="main-text">Tell us something about yourself?</h2>
      <TextArea
        name="bio"
        value={localBio}
        setValue={setLocalBio}
        placeholder="whatever comes to mind"
        onChange={handleChange}
        validate={bioValidator}
        className="mb-3"
        rows={7}
      />
    </div>
  );
}

export default ProfileBio;

interface ProfileBioProps {
  bio: string;
  setBio: (value: string) => void;
}
