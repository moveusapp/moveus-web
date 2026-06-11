import { useCallback, useState } from "react";
import {
  FollowUserDocument,
  UnfollowUserDocument,
} from "@/graphql/graphql-types";
import { useMutation } from "@apollo/client/react";
import Button from "../ui/Button";
import { useToast } from "@/context/toast-context";
import { formatError } from "@/utils/format-error";
import strings from "@/translations/strings";

function FollowButton({ isFollowing: initialIsFollowing, userId, className = "" }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isHovered, setIsHovered] = useState(false);
  const toast = useToast();

  const [followUser, { loading: followLoading }] = useMutation(FollowUserDocument);
  const [unfollowUser, { loading: unfollowLoading }] = useMutation(UnfollowUserDocument);

  const loading = followLoading || unfollowLoading;

  const handleFollow = useCallback(() => {
    followUser({ variables: { userId } })
      .then(() => setIsFollowing(true))
      .catch((err) => toast.error(formatError(err)));
  }, [followUser, userId, toast]);

  const handleUnfollow = useCallback(() => {
    unfollowUser({ variables: { userId } })
      .then(() => setIsFollowing(false))
      .catch((err) => toast.error(formatError(err)));
  }, [unfollowUser, userId, toast]);

  if (isFollowing) {
    return (
      <Button
        loading={loading}
        onClick={handleUnfollow}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${isHovered ? "btn-error" : ""} ${className}`}
      >
        {isHovered ? strings.user.unfollow : strings.user.following}
      </Button>
    );
  }

  return (
    <Button loading={loading} onClick={handleFollow} className={`btn-primary ${className}`}>
      {strings.user.follow}
    </Button>
  );
}

export default FollowButton;

interface FollowButtonProps {
  isFollowing: boolean;
  userId: number;
  className?: string;
}
