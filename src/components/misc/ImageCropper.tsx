import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/utils/image-data";

function ImageCropper({
  image,
  handleCancel,
  handleUpload,
}: ImageCropperProps) {
  const [crop, onCropChange] = useState({ x: 0, y: 0 });
  const [zoom, onZoomChange] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback(
    (_: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [setCroppedAreaPixels],
  );

  const showCroppedImage = useCallback(async () => {
    if (!image || !croppedAreaPixels) return;
    const cropped = await getCroppedImg(image, croppedAreaPixels);
    handleUpload(cropped);
  }, [image, croppedAreaPixels, handleUpload]);

  const onMediaLoaded = useCallback(
    (mediaSize: { width: number; height: number }) => {
      const aspect = 1;
      const { width, height } = mediaSize;

      let newZoom = 1;

      if (width / height > aspect) {
        newZoom = 300 / height;
      } else {
        newZoom = 300 / width;
      }

      onZoomChange(Math.max(newZoom, 1));
    },
    [onZoomChange],
  );

  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-[#3339] flex justify-center items-center">
      <div className="max-w-80 w-full flex flex-col gap-3">
        <div className="relative w-full aspect-square rounded-[15px] overflow-hidden">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
            onMediaLoaded={onMediaLoaded}
          />
        </div>
        <button className="w-full block" onClick={showCroppedImage}>
          Upload
        </button>
        <button
          className="w-full block bg-block text-foreground"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

interface ImageCropperProps {
  image: string;
  handleCancel: () => void;
  handleUpload: (cropped: any) => void;
}

export default ImageCropper;
