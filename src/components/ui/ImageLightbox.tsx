import { HiXMark } from "react-icons/hi2";
import strings from "@/translations/strings";
import { useHtmlDialog } from "@/hooks/use-html-dialog";

interface ImageLightboxProps {
  open: boolean;
  src: string | null | undefined;
  alt?: string;
  onClose: () => void;
}

function ImageLightbox({ open, src, alt = "", onClose }: ImageLightboxProps) {
  const { dialogRef } = useHtmlDialog(open && !!src);

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box flex max-w-4xl items-center justify-center bg-transparent p-0 shadow-none">
        <button
          type="button"
          onClick={onClose}
          aria-label={strings.common.close}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10 bg-base-100/80 hover:bg-base-100"
        >
          <HiXMark className="h-5 w-5" />
        </button>
        {src && (
          <img
            src={src}
            alt={alt}
            className="h-auto max-h-[95vh] w-full object-contain"
          />
        )}
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
