import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { apolloClient } from "@/appolo/client";
import {
  GetAttachmentUploadUrlDocument,
  useSendMessageMutation,
  WsChatMessageType,
} from "@/graphql/generated";
import { fileToBase64 } from "@/utils/image-data";

function SendMessage({ chatId, addMessage }: SendMessageInterface) {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const imageInput = useRef<HTMLInputElement>(null);

  const onImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedImage(e.currentTarget.files ? e.currentTarget.files[0] : null);
    },
    [setSelectedImage],
  );

  const clearImageInput = useCallback(() => {
    imageInput.current!.value = "";
    setSelectedImage(null);
  }, [setSelectedImage, imageInput]);

  const [sendMessage] = useSendMessageMutation();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!text && !selectedImage) return;
      clearImageInput();
      setText("");
      addMessage({
        id: null,
        attachmentUrl: selectedImage ? await fileToBase64(selectedImage) : null,
        textContent: text,
        userId: 0,
        timeSent: new Date(),
      });
      let attachmentId: string | null = null;
      if (selectedImage) {
        await apolloClient
          .query({
            query: GetAttachmentUploadUrlDocument,
          })
          .then(async (result) => {
            const { id, url } = result.data.newAttachment;
            attachmentId = id;
            const buffer = await selectedImage.arrayBuffer();
            const blob = new Blob([new Uint8Array(buffer)], {
              type: selectedImage.type,
            });
            await fetch(url, {
              method: "PUT",
              body: blob,
              headers: {
                "cache-control": "must-revalidate",
              },
            });
          });
      }
      sendMessage({
        variables: {
          chatId,
          attachmentId,
          message: text,
        },
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
    <div className="my-8 flex flex-col gap-4">
      {selectedImage && (
        <button
          className="text-sm! px-2! py-1! inline! w-auto! bg-block-accent"
          onClick={clearImageInput}
        >
          Image selected, click to remove
        </button>
      )}
      <form
        className="px-4 py-2 border border-foreground rounded-[15px] flex items-center gap-3 w-full"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          name="attachment-image"
          ref={imageInput}
          className="hidden"
          onChange={onImageChange}
        />
        <HiPhoto
          className="text-2xl shrink-0 cursor-pointer"
          onClick={() => imageInput.current?.click()}
        />
        <input
          type="text"
          name="message"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          className="p-0! border-0! outline-hidden! rounded-none!"
          autoComplete="off"
          accept="image/*"
        />
        <button
          type="submit"
          className="p-0! inline! w-auto! text-foreground! bg-transparent!"
        >
          <HiPaperAirplane className="text-3xl shrink-0" />
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
