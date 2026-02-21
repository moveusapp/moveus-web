import { use, useCallback, useMemo, useState } from "react";
import { HashLoader } from "react-spinners";
import { LOADER_COLOR } from "@/constants";
import {
  RelationshipStatus,
  AcceptFriendRequestDocument,
  CancelFriendRequestDocument,
  RemoveFriendDocument,
  SendFriendRequestDocument,
} from "@/graphql/graphql-types";
import { useMutation } from "@apollo/client/react";
import Button from "../ui/Button";

function FriendshipButton({ status: ogStatus, userId }: FriendshipButtonProps) {
  const [status, setStatus] = useState(ogStatus);

  const [sendRequest, { loading: sendLoading }] = useMutation(
    SendFriendRequestDocument,
  );
  const [acceptRequest, { loading: acceptLoading }] = useMutation(
    AcceptFriendRequestDocument,
  );
  const [cancelRequest, { loading: cancelLoading }] = useMutation(
    CancelFriendRequestDocument,
  );
  const [removeFriend, { loading: removeLoading }] =
    useMutation(RemoveFriendDocument);

  const handleSend = useCallback(() => {
    sendRequest({
      variables: { userId },
    })
      .then(() => setStatus(RelationshipStatus.RequestSent))
      .catch((_) => {});
  }, [sendRequest, userId, setStatus]);

  const handleAccept = useCallback(() => {
    acceptRequest({
      variables: { userId },
    })
      .then(() => setStatus(RelationshipStatus.Friends))
      .catch((_) => {});
  }, [acceptRequest, userId, setStatus]);

  const handleCancel = useCallback(() => {
    cancelRequest({
      variables: { userId },
    })
      .then(() => setStatus(RelationshipStatus.None))
      .catch((_) => {});
  }, [cancelRequest, userId, setStatus]);

  const handleRemove = useCallback(() => {
    removeFriend({
      variables: { userId },
    })
      .then(() => setStatus(RelationshipStatus.None))
      .catch((_) => {});
  }, [removeFriend, userId, setStatus]);

  const loading = useMemo(() => {
    return sendLoading || acceptLoading || cancelLoading || removeLoading;
  }, [sendLoading, acceptLoading, cancelLoading, removeLoading]);

  switch (status) {
    case null:
    case undefined:
    case RelationshipStatus.None:
      return (
        <Button loading={loading} onClick={handleSend} className="btn-primary w-30">
          Add Friend
        </Button>
      );
    case RelationshipStatus.RequestReceived:
      return (
        <Button loading={loading} onClick={handleAccept} className="btn-primary">
          Accept Request
        </Button>
      );
    case RelationshipStatus.RequestSent:
      return (
        <Button loading={loading} onClick={handleCancel} className="w-40">
          Cancel Request
        </Button>
      );
    case RelationshipStatus.Friends:
      return (
        <Button loading={loading} onClick={handleRemove} className="btn-error btn-outline w-38">
          Remove Friend
        </Button>
      );
  }
  return <></>;
}

export default FriendshipButton;

interface FriendshipButtonProps {
  status: RelationshipStatus;
  userId: number;
}
