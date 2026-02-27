import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import { HiXMark, HiPhoto } from "react-icons/hi2";
import TextArea from "@/components/ui/TextArea";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import { CreatePostDocument } from "@/graphql/graphql-types";
import { useMutation } from "@apollo/client/react";
import { HiX } from "react-icons/hi";

interface CreatePostModalProps {
  eventId: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

function CreatePostModal({
  eventId,
  isOpen,
  onClose,
  onSuccess,
}: CreatePostModalProps) {
  const [createPost, { loading, error }] = useMutation(CreatePostDocument);

  const [input, setInput] = useState({
    title: "",
    content: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.currentTarget;
      setInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!input.title || !input.content) {
      return;
    }

    try {
      const result = await createPost({
        variables: {
          eventId,
          ...input,
        },
      });

      if (selectedImage && result.data?.createPost?.post?.imageUploadUrl) {
        const buffer = await selectedImage.arrayBuffer();
        const blob = new Blob([new Uint8Array(buffer)], {
          type: selectedImage.type,
        });
        await fetch(result.data.createPost.post.imageUploadUrl, {
          method: "PUT",
          body: blob,
          headers: {
            "cache-control": "must-revalidate",
          },
        });
      }

      setInput({ title: "", content: "" });
      setSelectedImage(null);
      setImagePreview(null);

      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const handleClose = () => {
    setInput({ title: "", content: "" });
    setSelectedImage(null);
    setImagePreview(null);
    if (imageRef.current) {
      imageRef.current.value = "";
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Create Post</h3>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Title"
            name="title"
            value={input.title}
            onChange={onChange}
            placeholder="Give your post a title"
            required
          />

          <TextArea
            label="Content"
            name="content"
            value={input.content}
            onChange={onChange}
            placeholder="What's on your mind?"
            rows={5}
            required
          />

          <div>
            <label className="block text-sm font-medium mb-2">
              Image (Optional)
            </label>

            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border border-base-300">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-64 object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 btn btn-sm btn-circle btn-error"
                >
                  <HiXMark className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="post-image"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-base-300 rounded-xl cursor-pointer hover:border-primary/50 transition-colors"
              >
                <HiPhoto className="w-8 h-8 text-base-content/40 mb-2" />
                <span className="text-sm text-base-content/60">
                  Click to upload an image
                </span>
                <input
                  type="file"
                  id="post-image"
                  accept="image/*"
                  ref={imageRef}
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {error && (
            <div
              role="alert"
              className="alert alert-error text-sm text-error bg-error/10 rounded-2xl"
            >
              <HiX />
              <p>{error.message}</p>
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-ghost"
              disabled={loading}
            >
              Cancel
            </button>
            <Button type="submit" loading={loading} className="btn btn-primary w-30">
              Create Post
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

export default CreatePostModal;
