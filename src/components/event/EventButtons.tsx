import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { LOADER_COLOR } from "@/constants";
import {
  EventFragment,
  useCancelEventMutation,
  useJoinEventMutation,
  useLeaveEventMutation,
} from "@/graphql/generated";

function EventButtons({ event, reFetch }: EventButtonsProps) {
  const [joinEvent, { loading: joinLoading }] = useJoinEventMutation();
  const [leaveEvent, { loading: leaveLoading }] = useLeaveEventMutation();
  const [cancelEvent] = useCancelEventMutation();

  const navigate = useNavigate();

  const handleJoin = useCallback(() => {
    if (joinLoading || !event) return;
    joinEvent({
      variables: { eventId: event.id! },
    })
      .then(() => {
        reFetch();
      })
      .catch((_) => {});
  }, [event, joinEvent, joinLoading, reFetch]);

  const handleLeave = useCallback(() => {
    if (leaveLoading || !event) return;
    leaveEvent({
      variables: { eventId: event.id! },
    })
      .then(() => {
        reFetch();
      })
      .catch((_) => {});
  }, [event, leaveEvent, leaveLoading, reFetch]);

  const handleShare = useCallback(() => {
    if (navigator.share && event)
      navigator.share({
        url: window.location.href,
        title: `You've been invited to a MoveUs event: ${event.title}`,
        text: event.description ?? "",
      });
  }, [event]);

  const handleCancel = useCallback(() => {
    if (!event) return;
    cancelEvent({
      variables: { eventId: event.id! },
    })
      .then(() => {
        navigate("/");
      })
      .catch((e) => console.error(e));
  }, [cancelEvent, event?.id, navigate]);

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <button className="bg-block-accent" onClick={handleShare}>
          Share
        </button>
        {event?.role === "ORGANIZER" ? (
          <button className="bg-block-accent" onClick={handleCancel}>
            Cancel
          </button>
        ) : (
          <Link to={`/chat/${event?.organizer?.user.id}`} className="w-full">
            <button className="bg-block-accent">Message organizer</button>
          </Link>
        )}
      </div>
      {event?.role === "ORGANIZER" ? (
        <Link className="w-full" to={`/create-post/${event?.id}`}>
          <button>Create post</button>
        </Link>
      ) : event?.role === null ? (
        joinLoading ? (
          <HashLoader className="mx-auto" color={LOADER_COLOR} />
        ) : (
          <button onClick={handleJoin}>Join</button>
        )
      ) : leaveLoading ? (
        <HashLoader className="mx-auto" color={LOADER_COLOR} />
      ) : (
        <button className="bg-block text-foreground" onClick={handleLeave}>
          Leave
        </button>
      )}
    </div>
  );
}

export default EventButtons;

interface EventButtonsProps {
  event?: EventFragment;
  reFetch: () => void;
}
