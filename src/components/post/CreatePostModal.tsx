import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import { HiXMark, HiPhoto } from "react-icons/hi2";
import Button from "@/components/ui/Button";
import UserAvatar from "@/components/user/UserAvatar";
import { CreatePostDocument } from "@/graphql/graphql-types";
import { putFileToSignedUrl } from "@/utils/upload";
import { useMutation } from "@apollo/client/react";
import { formatError } from "@/utils/format-error";
import FormError from "@/components/ui/FormError";
import { useProfile } from "@/context/profile-context";
import { useToast } from "@/context/toast-context";
import { displayName } from "@/utils/display-name";

interface CreatePostModalProps {
  /** When set, the post is attached to this event. Omit for a standalone post. */
  eventId?: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (postId: number) => void;
}

function CreatePostModal({
  eventId,
  isOpen,
  onClose,
  onSuccess,
}: CreatePostModalProps) {
  const { profile } = useProfile();
  const toast = useToast();

  const [createPost, { loading: creating, error }] =
    useMutation(CreatePostDocument);

  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const loading = creating || uploading;
  const errorMessage = error ? formatError(error) : null;

  const authorName = profile
    ? displayName(profile.username, profile.firstName, profile.lastName)
    : "";

  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  }, []);

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

    if (!content.trim()) {
      return;
    }

    try {
      const result = await createPost({
        variables: {
          eventId,
          content,
        },
      });

      const post = result.data?.createPost?.post;

      let imageFailed = false;
      if (selectedImage && post?.imageUploadUrl) {
        setUploading(true);
        try {
          await putFileToSignedUrl(post.imageUploadUrl, selectedImage);
        } catch (err) {
          console.error("Error uploading image:", err);
          imageFailed = true;
        } finally {
          setUploading(false);
        }
      }

      setContent("");
      setSelectedImage(null);
      setImagePreview(null);

      onClose();
      if (imageFailed) {
        toast.info("Post shared, but the photo didn't upload.");
      } else {
        toast.success("Post shared.");
      }
      if (onSuccess && post?.id != null) {
        onSuccess(post.id);
      }
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const handleClose = () => {
    setContent("");
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
      <div className="modal-box max-w-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">Create post</h3>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="btn btn-sm btn-circle btn-ghost"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex items-start gap-3">
            {profile?.id != null && (
              <UserAvatar
                userId={profile.id}
                className="h-10 w-10 shrink-0"
              />
            )}

            <div className="min-w-0 flex-1 space-y-3">
              <div>
                {authorName && (
                  <p className="text-sm font-semibold">{authorName}</p>
                )}
                <textarea
                  autoFocus
                  name="content"
                  value={content}
                  onChange={onChange}
                  placeholder="What's on your mind?"
                  rows={4}
                  required
                  className="mt-1 w-full resize-none bg-transparent p-0 text-base leading-relaxed placeholder:text-base-content/40 focus:outline-none"
                />
              </div>

              {imagePreview ? (
                <div className="relative overflow-hidden rounded-xl border border-base-300">
                  <img
                    src={imagePreview}
                    alt="Selected attachment"
                    className="max-h-64 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    aria-label="Remove image"
                    className="btn btn-sm btn-circle btn-error absolute right-2 top-2"
                  >
                    <HiXMark className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => imageRef.current?.click()}
                  className="inline-flex items-center gap-1.5 py-1 text-sm font-medium text-primary transition-colors hover:text-primary/70"
                >
                  <HiPhoto className="h-4 w-4" />
                  Add photo
                </button>
              )}

              <input
                type="file"
                accept="image/*"
                ref={imageRef}
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="mt-4">
              <FormError message={errorMessage} />
            </div>
          )}

          <div className="mt-4 flex justify-end gap-3 border-t border-base-300 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-ghost"
              disabled={loading}
            >
              Cancel
            </button>
            <Button
              type="submit"
              loading={loading}
              disabled={!content.trim()}
              className="btn btn-primary w-28"
            >
              Post
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
