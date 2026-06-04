import defaultEventThumbnail from "@/assets/default-images/event-default-thumbnail.webp";
import { useState } from "react";

interface EventThumbnailProps {
  imageUrl?: string | null;
  alt: string;
  className?: string;
  /** Forwarded to the underlying <img> (e.g. for canvas/color sampling). */
  crossOrigin?: "anonymous" | "use-credentials";
}

function EventThumbnail({
  imageUrl,
  alt,
  className,
  crossOrigin,
}: EventThumbnailProps) {
  const [src, setSrc] = useState(imageUrl || defaultEventThumbnail);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      crossOrigin={crossOrigin}
      onError={() => {
        if (src !== defaultEventThumbnail) setSrc(defaultEventThumbnail);
      }}
      className={className}
    />
  );
}

export default EventThumbnail;
