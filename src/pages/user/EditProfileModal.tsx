import { FormEvent, useState } from "react";
import { HiXMark, HiCamera } from "react-icons/hi2";
import { useMutation, useApolloClient } from "@apollo/client/react";
import { useHtmlDialog } from "@/hooks/use-html-dialog";
import { useImageSelect } from "@/hooks/use-image-select";
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
import { useToast } from "@/context/toast-context";
import strings from "@/translations/strings";
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
  const toast = useToast();
  const [alterBasicInfo, { loading, error }] = useMutation(
    AlterProfileBasicInfoDocument,
  );

  const [firstName, setFirstName] = useState(profile.firstName ?? "");
  const [lastName, setLastName] = useState(profile.lastName ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");
  const [gender, setGender] = useState<Gender | null>(toGender(profile.gender));
  const [dob, setDob] = useState<Date | null>(toDate(profile.dateOfBirth));

  const genderOptions = enumToOptions(Gender, "enums.gender");

  const initialAvatar = `${import.meta.env.VITE_BUCKET_URL}/profile-pictures/${profile.id}`;
  const [avatarSrc, setAvatarSrc] = useState(initialAvatar);
  const {
    inputRef: imageRef,
    file: selectedImage,
    previewUrl: imagePreview,
    onSelect: handleImageSelect,
    clear: removeImage,
  } = useImageSelect();
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { dialogRef } = useHtmlDialog(isOpen);

  const resetForm = () => {
    setFirstName(profile.firstName ?? "");
    setLastName(profile.lastName ?? "");
    setBio(profile.bio ?? "");
    setGender(toGender(profile.gender));
    setDob(toDate(profile.dateOfBirth));
    removeImage();
    setUploadError(null);
    setAvatarSrc(initialAvatar);
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
          setUploadError(strings.editProfile.couldNotUploadPicture);
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
        // The mutation returns ProfileType, but the user page reads UserType.
        // They're separate normalized cache entries; normalization can't sync
        // them, so we explicitly refetch the user page's query.
        refetchQueries: [
          {
            query: GetUserByUsernameDocument,
            variables: { username: profile.username },
          },
        ],
      });

      onClose();
      toast.success(strings.toast.profileUpdated);
    } catch {
      // Errors surface inline via the FormError below the fields.
    }
  };

  const previewSrc = imagePreview ?? avatarSrc;
  const errorMessage = uploadError ?? (error ? formatError(error) : null);

  return (
    <dialog ref={dialogRef} className="modal" onClose={handleClose}>
      <div className="modal-box max-w-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{strings.editProfile.title}</h3>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost"
            aria-label={strings.common.close}
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
                aria-label={strings.editProfile.changePictureAria}
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
                  aria-label={strings.editProfile.discardPhotoAria}
                >
                  <HiXMark className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="grow grid grid-cols-1 sm:grid-cols-2 gap-x-4 w-full">
              <TextInput
                label={strings.editProfile.firstName}
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
                required
              />
              <TextInput
                label={strings.editProfile.lastName}
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
                required
              />
            </div>
          </div>

          <TextArea
            label={strings.editProfile.bio}
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.currentTarget.value)}
            placeholder={strings.editProfile.bioPlaceholder}
            rows={4}
          />

          <DateOfBirth label={strings.editProfile.dateOfBirth} dob={dob} setDob={setDob} />

          <Dropdown<Gender>
            label={strings.editProfile.gender}
            value={gender}
            setValue={setGender}
            options={genderOptions as { label: string; value: Gender }[]}
            placeholder={strings.editProfile.selectGender}
          />

          {errorMessage && <FormError message={errorMessage} />}

          <div className="flex gap-2 justify-end pt-2">
            <Button
              onClick={handleClose}
              disabled={loading}
              className="btn-ghost"
            >
              {strings.common.cancel}
            </Button>
            <Button type="submit" loading={loading} className="btn-primary">
              {strings.editProfile.saveChanges}
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
