import defaultAvatar from "@/assets/default-images/user-default-avatar.svg";
import { useState } from "react";
import strings from "@/translations/strings";

function UserAvatar({ imageUrl, className }: UserImageProps) {
  const [image, setImage] = useState(imageUrl || defaultAvatar);

  return (
    <div className={className}> {/* Wrapped in 2 divs because of some daisyUI bull */}
      <div className="avatar rounded-full">
        <div className="rounded-full">
          <img
            src={image}
            className="aspect-square"
            alt={strings.user.avatarAlt}
            onError={() => {
              setImage(defaultAvatar);
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface UserImageProps {
  imageUrl?: string | null;
  className?: string;
}

export default UserAvatar;
