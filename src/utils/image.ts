const MAX_DIMENSION = 1920;
const JPEG_QUALITY = 0.82;
const DECODE_ATTEMPTS = 3;
const DECODE_RETRY_DELAY_MS = 300;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function isNotReadable(err: unknown): boolean {
  return err instanceof DOMException && err.name === "NotReadableError";
}

async function decode(file: File): Promise<ImageBitmap> {
  let lastErr: unknown;
  for (let attempt = 0; attempt < DECODE_ATTEMPTS; attempt++) {
    try {
      return await createImageBitmap(file);
    } catch (err) {
      lastErr = err;
      if (!isNotReadable(err)) break;
      await delay(DECODE_RETRY_DELAY_MS);
    }
  }
  throw lastErr;
}

export async function prepareImageForUpload(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  if (typeof createImageBitmap !== "function") return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await decode(file);
  } catch {
    return file;
  }

  try {
    const scale = Math.min(
      1,
      MAX_DIMENSION / Math.max(bitmap.width, bitmap.height),
    );
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
    );
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } catch {
    return file;
  } finally {
    bitmap.close();
  }
}
