import { ChangeEvent, useEffect, useRef, useState } from "react";
import { HiCamera, HiXMark } from "react-icons/hi2";
import strings from "@/translations/strings";

interface Props {
  value: File | null;
  onChange: (value: File | null) => void;
}

function ProfilePictureQuestion({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange(file);
  };

  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <label
        htmlFor="survey-profile-picture"
        className="group relative block cursor-pointer rounded-full focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-base-100"
        aria-label={strings.survey.choosePicture}
      >
        <div className="avatar">
          <div className="relative w-32 h-32 rounded-full ring-1 ring-base-300 overflow-hidden bg-base-200 flex items-center justify-center">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt=""
                className="aspect-square object-cover w-full h-full"
              />
            ) : (
              <HiCamera className="w-10 h-10 text-base-content/40" />
            )}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-base-content/45 opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 group-focus-within:opacity-100">
              <HiCamera className="w-8 h-8 text-base-100" />
            </div>
          </div>
        </div>
        <input
          ref={inputRef}
          id="survey-profile-picture"
          type="file"
          accept="image/*"
          onChange={handleSelect}
          className="sr-only"
        />
      </label>

      {value && (
        <button
          type="button"
          onClick={handleRemove}
          className="btn btn-sm btn-ghost rounded-full gap-1"
        >
          <HiXMark className="w-4 h-4" />
          {strings.common.remove}
        </button>
      )}
    </div>
  );
}

export default ProfilePictureQuestion;
