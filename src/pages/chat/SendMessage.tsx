import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import { HiPaperAirplane, HiPhoto, HiXMark } from "react-icons/hi2";
import { apolloClient } from "@/appolo/client";
import {
  GetAttachmentUploadUrlDocument,
  GetMyChatsDocument,
  SendChatMessageDocument,
  WsChatMessageType,
} from "@/graphql/graphql-types";
import { fileToBase64 } from "@/utils/image-data";
import { useMutation } from "@apollo/client/react";

function SendMessage({ chatId, addMessage }: SendMessageInterface) {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const imageInput = useRef<HTMLInputElement>(null);

  const onImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.[0] ?? null;
      setSelectedImage(file);
      if (file) {
        const url = URL.createObjectURL(file);
        setImagePreview(url);
      } else {
        setImagePreview(null);
      }
    },
    [setSelectedImage],
  );

  const clearImageInput = useCallback(() => {
    imageInput.current!.value = "";
    setSelectedImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
  }, [setSelectedImage, imageInput, imagePreview]);

  const [sendMessage] = useMutation(SendChatMessageDocument);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (
        (!text || text.trim().length <= 0)
        && !selectedImage
      ) return;
      const imageToSend = selectedImage;
      clearImageInput();
      setText("");
      addMessage({
        id: null,
        attachmentUrl: imageToSend ? await fileToBase64(imageToSend) : null,
        textContent: text,
        userId: 0,
        timeSent: new Date(),
      });
      let attachmentId: string | null = null;
      if (imageToSend) {
        await apolloClient
          .query({
            query: GetAttachmentUploadUrlDocument,
          })
          .then(async (result) => {
            if (!result.data || !result.data.newAttachment) {
              return;
            }

            const { id, url } = result.data!.newAttachment!;

            if (id && url) {
              attachmentId = id;
              const buffer = await imageToSend.arrayBuffer();
              const blob = new Blob([new Uint8Array(buffer)], {
                type: imageToSend.type,
              });
              await fetch(url, {
                method: "PUT",
                body: blob,
                headers: {
                  "cache-control": "must-revalidate",
                },
              });
            }
          });
      }
      sendMessage({
        variables: {
          chatId,
          attachmentId,
          message: text,
        },
        refetchQueries: [GetMyChatsDocument],
      }).catch((error) => console.error(error));
    },
    [
      text,
      selectedImage,
      clearImageInput,
      setText,
      chatId,
      sendMessage,
      addMessage,
    ],
  );

  return (
    <div className="flex flex-col gap-2">
      {imagePreview && (
        <div className="relative inline-block w-16 h-16 ml-2">
          <img
            src={imagePreview}
            alt="Selected"
            className="w-16 h-16 rounded-xl object-cover"
          />
          <button
            type="button"
            className="btn btn-circle btn-xs absolute -top-1.5 -right-1.5 btn-neutral"
            onClick={clearImageInput}
          >
            <HiXMark className="text-xs" />
          </button>
        </div>
      )}
      <form
        className="bg-base-200 rounded-2xl p-2 flex items-center gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          name="attachment-image"
          ref={imageInput}
          className="hidden"
          onChange={onImageChange}
          accept="image/*"
        />
        <button
          type="button"
          className="btn btn-ghost btn-sm btn-circle"
          onClick={() => imageInput.current?.click()}
        >
          <HiPhoto className="text-lg text-base-content/50" />
        </button>
        <input
          type="text"
          name="message"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          className="input input-ghost border-0 flex-1 focus:outline-none"
          placeholder="Type a message..."
          autoComplete="off"
        />
        <button type="submit" className="btn btn-primary btn-sm btn-circle">
          <HiPaperAirplane className="text-base" />
        </button>
      </form>
    </div>
  );
}

export default SendMessage;

interface SendMessageInterface {
  chatId: number;
  addMessage: (message: WsChatMessageType) => void;
}
