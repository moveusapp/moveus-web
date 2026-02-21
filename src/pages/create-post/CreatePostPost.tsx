import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import TextArea from "@/components/ui/TextArea";
import TextInput from "@/components/ui/TextInput";
import { LOADER_COLOR } from "@/constants";
import { CreatePostDocument } from "@/graphql/graphql-types";
import { useMutation } from "@apollo/client/react";

function CreatePostPage() {
  const { eventId } = useParams();

  const [createPost, { loading, error }] = useMutation(CreatePostDocument);

  const [input, setInput] = useState({
    title: "",
    content: "",
  });
  const imageRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.currentTarget;
      setInput((p) => {
        return {
          ...p,
          [name]: value,
        };
      });
    },
    [setInput],
  );

  const onCreateEvent = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!eventId || Object.values(input).some((v) => !v)) return;
      createPost({
        variables: {
          eventId: parseInt(eventId),
          ...input,
        },
      })
        .then(async (result) => {
          if (imageRef.current?.files && imageRef.current.files[0]) {
            const file = imageRef.current.files[0];
            const buffer = await file.arrayBuffer();
            const blob = new Blob([new Uint8Array(buffer)], {
              type: file.type,
            });
            await fetch(result.data?.createPost?.post?.imageUploadUrl!, {
              method: "PUT",
              body: blob,
              headers: {
                "cache-control": "must-revalidate",
              },
            });
          }
          navigate(`/event/${eventId}`);
        })
        .catch((_) => {});
    },
    [createPost, eventId, input, imageRef, navigate],
  );

  return (
    <div className="py-8 h-full flex flex-col">
      <form
        className="grow w-full mt-8 flex flex-col gap-4"
        onSubmit={onCreateEvent}
      >
        <h2 className="main-text">Create post</h2>
        <TextInput name="title" value={input.title} onChange={onChange} />
        <TextArea
          name="content"
          value={input.content}
          onChange={onChange}
          rows={5}
        />
        <label htmlFor="post-image" className=" mb-auto">
          <h4>Image (optional)</h4>
          <input type="file" id="post-image" accept="image/*" ref={imageRef} />
        </label>
        {error && (
          <p className="text-error text-right self-end">{error.message}</p>
        )}
        {loading ? (
          <HashLoader color={LOADER_COLOR} className="self-center" />
        ) : (
          <button type="submit">Create post</button>
        )}
      </form>
    </div>
  );
}

export default CreatePostPage;
