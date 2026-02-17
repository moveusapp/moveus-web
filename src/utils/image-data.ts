function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous"; // important if using images from external URLs

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Could not get canvas context"));

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
      );

      const base64Image = canvas.toDataURL("image/jpeg");

      resolve(base64Image);
    };

    image.onerror = (err) => reject(err);
  });
}

function base64ToBlob(base64: string, mime = "image/jpeg"): Blob {
  const byteChars = atob(base64.split(",")[1]);
  const byteNumbers = Array.from(byteChars).map((c) => c.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mime });
}

async function fileToBase64(file: File): Promise<string> {
  try {
    const reader = new FileReader();

    return await new Promise<string>((resolve) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(""); // resolve with undefined on error
      reader.readAsDataURL(file);
    });
  } catch {
    return "";
  }
}

export { getCroppedImg, base64ToBlob, fileToBase64 };
