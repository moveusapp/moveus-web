import { useCallback, useState } from "react";
import {
  FollowUserDocument,
  UnfollowUserDocument,
} from "@/graphql/graphql-types";
import { useMutation } from "@apollo/client/react";
import Button from "../ui/Button";
import strings from "@/translations/strings";

function FollowButton({ isFollowing: initialIsFollowing, userId }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isHovered, setIsHovered] = useState(false);

  const [followUser, { loading: followLoading }] = useMutation(FollowUserDocument);
  const [unfollowUser, { loading: unfollowLoading }] = useMutation(UnfollowUserDocument);

  const loading = followLoading || unfollowLoading;

  const handleFollow = useCallback(() => {
    followUser({ variables: { userId } })
      .then(() => setIsFollowing(true))
      .catch(() => {});
  }, [followUser, userId]);

  const handleUnfollow = useCallback(() => {
    unfollowUser({ variables: { userId } })
      .then(() => setIsFollowing(false))
      .catch(() => {});
  }, [unfollowUser, userId]);

  if (isFollowing) {
    return (
      <Button
        loading={loading}
        onClick={handleUnfollow}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${isHovered ? "btn-error" : ""}`}
      >
        {isHovered ? strings.user.unfollow : strings.user.following}
      </Button>
    );
  }

  return (
    <Button loading={loading} onClick={handleFollow} className="btn-primary w-30">
      {strings.user.follow}
    </Button>
  );
}

export default FollowButton;

interface FollowButtonProps {
  isFollowing: boolean;
  userId: number;
}
