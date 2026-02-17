import { ChangeEvent, useCallback, useRef, useState } from "react";
import { HiPencil } from "react-icons/hi";
import InputImage from "./image-crop";
import { apolloClient } from "@/appolo/client";
import { GetProfilePictureUploadUrlDocument } from "@/graphql/generated";
import { base64ToBlob } from "@/utils/image-data";

function UserImage({ userId, canChange, className }: UserImageProps) {
  const [image, setImage] = useState<string>(
    `${import.meta.env.VITE_BUCKET_URL}profile-pictures/${userId}`,
  );
  const [inputImage, setInputImage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const onSelectFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", () =>
          setInputImage(reader.result as string),
        );
        reader.readAsDataURL(file);
      }
      inputRef.current!.value = "";
    },
    [inputRef],
  );

  const triggerInput = useCallback(() => {
    inputRef.current?.click();
  }, [inputRef]);

  const handleCancel = useCallback(() => {
    setInputImage(null);
  }, [setInputImage]);

  const handleUpload = useCallback(
    (cropped: string) => {
      apolloClient
        .query({
          query: GetProfilePictureUploadUrlDocument,
        })
        .then((result) => {
          const url = result.data.profilePictureGcloudUrl;
          fetch(url, {
            method: "PUT",
            body: base64ToBlob(cropped),
            headers: {
              "cache-control": "must-revalidate",
            },
          });
        });

      setInputImage(null);
      setImage(cropped);
    },
    [setInputImage],
  );

  return (
    <>
      <div className={`${className} overflow-hidden relative aspect-square"`}>
        {canChange && (
          <div className="absolute h-full w-full justify-center items-center cursor-pointer flex opacity-0 hover:opacity-100">
            <div
              className="absolute h-full w-full bg-foreground opacity-60 flex justify-center items-center cursor-pointer"
              onClick={triggerInput}
            />
            <HiPencil
              className="absolute text-background text-4xl"
              onClick={triggerInput}
            />
          </div>
        )}
        <img
          src={image}
          className="aspect-square"
          alt="User"
          onError={() => {
            setImage("/default-images/user.svg");
          }}
        />
      </div>
      {inputImage && (
        <InputImage
          image={inputImage!}
          handleCancel={handleCancel}
          handleUpload={handleUpload}
        />
      )}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={onSelectFile}
        style={{ display: "none" }}
      />
    </>
  );
}

export default UserImage;

interface UserImageProps {
  userId: number;
  canChange: boolean;
  className?: string;
}
