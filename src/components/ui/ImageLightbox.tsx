import { HiXMark } from "react-icons/hi2";

interface ImageLightboxProps {
  open: boolean;
  src: string | null | undefined;
  alt?: string;
  onClose: () => void;
}

function ImageLightbox({ open, src, alt = "", onClose }: ImageLightboxProps) {
  if (!open || !src) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box flex max-w-4xl items-center justify-center bg-transparent p-0 shadow-none">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10 bg-base-100/80 hover:bg-base-100"
        >
          <HiXMark className="h-5 w-5" />
        </button>
        <img
          src={src}
          alt={alt}
          className="h-auto max-h-[95vh] w-full object-contain"
        />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>
          close
        </button>
      </form>
    </dialog>
  );
}

export default ImageLightbox;
