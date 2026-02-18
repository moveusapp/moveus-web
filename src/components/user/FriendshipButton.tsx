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

function FriendshipButton({ status: ogStatus, userId }: FriendshipButtonProps) {
  const [status, setStatus] = useState(ogStatus);

  const [sendRequest, { loading: sendLoading }] =
    useMutation(SendFriendRequestDocument);
  const [acceptRequest, { loading: acceptLoading }] =
    useMutation(AcceptFriendRequestDocument);
  const [cancelRequest, { loading: cancelLoading }] =
    useMutation(CancelFriendRequestDocument);
  const [removeFriend, { loading: removeLoading }] = useMutation(RemoveFriendDocument);

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

  if (loading)
    return (
      <div className="self-center flex justify-center items-center w-full">
        <HashLoader color={LOADER_COLOR} />
      </div>
    );

  switch (status) {
    case RelationshipStatus.None:
      return <button onClick={handleSend}>Send request</button>;
    case RelationshipStatus.RequestReceived:
      return <button onClick={handleAccept}>Accept request</button>;
    case RelationshipStatus.RequestSent:
      return <button onClick={handleCancel}>Cancel request</button>;
    case RelationshipStatus.Friends:
      return <button onClick={handleRemove}>Remove friend</button>;
  }
  return <></>;
}

export default FriendshipButton;

interface FriendshipButtonProps {
  status: RelationshipStatus;
  userId: number;
}
