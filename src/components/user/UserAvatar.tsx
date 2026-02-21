import defaultAvatar from "@/assets/default-images/user-default-avatar.svg";
import { useState } from "react";

function UserAvatar({ userId, className }: UserImageProps) {
  const [image, setImage] = useState(
    `${import.meta.env.VITE_BUCKET_URL}/profile-pictures/${userId}`,
  );

  return (
    <div className={className}> {/* Wrapped in 2 divs because of some daisyUI bull */}
      <div className="avatar rounded-full">
        <div className="rounded-full">
          <img
            src={image}
            className="aspect-square"
            alt="User"
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
  userId: number;
  className?: string;
}

export default UserAvatar;
