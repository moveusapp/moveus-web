import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { HiXMark, HiCamera } from "react-icons/hi2";
import { useMutation, useApolloClient } from "@apollo/client/react";
import TextInput from "@/components/ui/TextInput";
import TextArea from "@/components/ui/TextArea";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import DateOfBirth from "@/components/ui/DateOfBirth";
import FormError from "@/components/ui/FormError";
import defaultAvatar from "@/assets/default-images/user-default-avatar.svg";
import { enumToOptions } from "@/utils/enum-to-options";
import { uploadProfilePicture } from "@/utils/upload";
import { formatError } from "@/utils/format-error";
import {
  AlterProfileBasicInfoDocument,
  ContextProfileFragment,
  Gender,
  GetUserByUsernameDocument,
} from "@/graphql/graphql-types";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ContextProfileFragment;
}

const genderOptions = enumToOptions(Gender);

function toDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  const d = new Date(value as string);
  return isNaN(d.getTime()) ? null : d;
}

function toGender(value: string | null | undefined): Gender | null {
  if (!value) return null;
  const match = (Object.values(Gender) as string[]).find((g) => g === value);
  return (match as Gender) ?? null;
}

function formatDateForApi(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function EditProfileModal({ isOpen, onClose, profile }: EditProfileModalProps) {
  const apollo = useApolloClient();
  const [alterBasicInfo, { loading, error }] = useMutation(
    AlterProfileBasicInfoDocument,
  );

  const [firstName, setFirstName] = useState(profile.firstName ?? "");
  const [lastName, setLastName] = useState(profile.lastName ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");
  const [gender, setGender] = useState<Gender | null>(toGender(profile.gender));
  const [dob, setDob] = useState<Date | null>(toDate(profile.dateOfBirth));

  const initialAvatar = `${import.meta.env.VITE_BUCKET_URL}/profile-pictures/${profile.id}`;
  const [avatarSrc, setAvatarSrc] = useState(initialAvatar);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (imageRef.current) imageRef.current.value = "";
  };

  const resetForm = () => {
    setFirstName(profile.firstName ?? "");
    setLastName(profile.lastName ?? "");
    setBio(profile.bio ?? "");
    setGender(toGender(profile.gender));
    setDob(toDate(profile.dateOfBirth));
    setSelectedImage(null);
    setImagePreview(null);
    setUploadError(null);
    setAvatarSrc(initialAvatar);
    if (imageRef.current) imageRef.current.value = "";
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUploadError(null);

    try {
      if (selectedImage) {
        try {
          await uploadProfilePicture(apollo, selectedImage);
        } catch (err) {
          console.error(err);
          setUploadError("Could not upload profile picture.");
          return;
        }
      }

      await alterBasicInfo({
        variables: {
          firstName,
          lastName,
          bio,
          dateOfBirth: dob ? formatDateForApi(dob) : null,
          gender,
        },
        refetchQueries: [
          {
            query: GetUserByUsernameDocument,
            variables: { username: profile.username },
          },
        ],
      });

      onClose();
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (!isOpen) return null;

  const previewSrc = imagePreview ?? avatarSrc;
  const errorMessage = uploadError ?? (error ? formatError(error) : null);

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Edit profile</h3>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost"
            aria-label="Close"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="relative shrink-0">
              <label
                htmlFor="profile-image"
                className="group relative block cursor-pointer rounded-full focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-base-100"
                aria-label="Change profile picture"
              >
                <div className="avatar">
                  <div className="relative w-20 h-20 rounded-full ring-1 ring-base-300 overflow-hidden">
                    <img
                      src={previewSrc}
                      alt=""
                      className="aspect-square object-cover"
                      onError={() => {
                        if (!imagePreview) setAvatarSrc(defaultAvatar);
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-base-content/45 opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 group-focus-within:opacity-100">
                      <HiCamera className="w-6 h-6 text-base-100" />
                    </div>
                  </div>
                </div>
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  ref={imageRef}
                  onChange={handleImageSelect}
                  className="sr-only"
                />
              </label>
              {selectedImage && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-1 -right-1 btn btn-xs btn-circle btn-error shadow"
                  aria-label="Discard new photo"
                >
                  <HiXMark className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="grow grid grid-cols-1 sm:grid-cols-2 gap-x-4 w-full">
              <TextInput
                label="First name"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
                required
              />
              <TextInput
                label="Last name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
                required
              />
            </div>
          </div>

          <TextArea
            label="Bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.currentTarget.value)}
            placeholder="Tell us something about yourself"
            rows={4}
          />

          <DateOfBirth label="Date of birth" dob={dob} setDob={setDob} />

          <Dropdown<Gender>
            label="Gender"
            value={gender}
            setValue={setGender}
            options={genderOptions as { label: string; value: Gender }[]}
            placeholder="Select gender"
          />

          {errorMessage && <FormError message={errorMessage} />}

          <div className="flex gap-2 justify-end pt-2">
            <Button
              onClick={handleClose}
              disabled={loading}
              className="btn-ghost"
            >
              Cancel
            </Button>
            <Button type="submit" loading={loading} className="btn-primary">
              Save changes
            </Button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={handleClose}>
          close
        </button>
      </form>
    </dialog>
  );
}

export default EditProfileModal;
