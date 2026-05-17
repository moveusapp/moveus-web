import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import { HiXMark, HiPhoto } from "react-icons/hi2";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import { CreatePostDocument } from "@/graphql/graphql-types";
import { putFileToSignedUrl } from "@/utils/upload";
import { useMutation } from "@apollo/client/react";
import { formatError } from "@/utils/format-error";
import FormError from "@/components/ui/FormError";

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
  const [createPost, { loading: creating, error }] =
    useMutation(CreatePostDocument);

  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const loading = creating || uploading;
  const errorMessage = uploadError ?? (error ? formatError(error) : null);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.currentTarget.value);
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

    if (!content) {
      return;
    }

    setUploadError(null);

    try {
      const result = await createPost({
        variables: {
          eventId,
          content,
        },
      });

      if (selectedImage && result.data?.createPost?.post?.imageUploadUrl) {
        setUploading(true);
        try {
          await putFileToSignedUrl(
            result.data.createPost.post.imageUploadUrl,
            selectedImage,
          );
        } catch (err) {
          console.error("Error uploading image:", err);
          setUploadError(
            "Your post was created, but the image failed to upload.",
          );
          return;
        } finally {
          setUploading(false);
        }
      }

      setContent("");
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
    setContent("");
    setSelectedImage(null);
    setImagePreview(null);
    setUploadError(null);
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
          <TextArea
            label="Content"
            name="content"
            value={content}
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

          {errorMessage && <FormError message={errorMessage} />}

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
