import defaultAvatar from "@/assets/default-images/user-default-avatar.svg";
import { useState } from "react";
import strings from "@/translations/strings";

function UserAvatar({ imageUrl, className }: UserImageProps) {
  const [image, setImage] = useState(imageUrl || defaultAvatar);

  return (
    <div className={className}>
      <div className="w-full aspect-square overflow-hidden rounded-full bg-base-300">
        <img
          src={image}
          className="h-full w-full object-cover"
          alt={strings.user.avatarAlt}
          onError={() => {
            setImage(defaultAvatar);
          }}
        />
      </div>
    </div>
  );
}

interface UserImageProps {
  imageUrl?: string | null;
  className?: string;
}

export default UserAvatar;
