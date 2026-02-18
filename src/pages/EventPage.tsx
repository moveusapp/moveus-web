import { setDocumentTitle } from "../hooks/use-document-title";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { GetEventDocument } from "@/graphql/graphql-types";
import BackButton from "@/components/routes/BackButton";
import EventInfoTab from "@/components/event/EventInfoTab";
import EventParticipantsTab from "@/components/event/EventParticipantsTab";
import EventPostsTab from "@/components/event/EventPostsTab";
import EventButtons from "@/components/event/EventButtons";
import { useLazyQuery } from "@apollo/client/react";

type EventTab = "info" | "participants" | "posts";

function EventPage() {
  const { eventId } = useParams();

  const [tab, setTab] = useState<EventTab>("info");

  const [getEvent, { loading, error, data }] = useLazyQuery(GetEventDocument);
  const event = data?.event;

  const fetchEvent = useCallback(() => {
    if (!eventId) return;
    getEvent({
      variables: { eventId: parseInt(eventId) },
    })
      .then((result) => {
        setDocumentTitle(result.data?.event?.title ?? "Uh Oh");
      })
      .catch((_) => {});
  }, [eventId, getEvent]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const isLoading = () => {
    return loading || event === undefined;
  };

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="pt-8 h-full flex flex-col">
      <BackButton />
      <div className="grow flex flex-col pb-8 max-h-[calc(100%-2rem)]">
        <div className="flex justify-around py-2 border-b border-foreground bottom-1 [&>p]:cursor-pointer [&>p]:select-none my-4">
          <p
            className={tab === "info" ? "text-block-accent" : ""}
            onClick={() => setTab("info")}
          >
            info
          </p>
          <p
            className={tab === "participants" ? "text-block-accent" : ""}
            onClick={() => setTab("participants")}
          >
            {isLoading()
              ? `participants`
              : `participants (${event!.members.length})`}
          </p>
          <p
            className={tab === "posts" ? "text-block-accent" : ""}
            onClick={() => setTab("posts")}
          >
            posts
          </p>
        </div>
        <div className="h-4 shrink-0" />
        {(() => {
          switch (tab) {
            case "info":
              return <EventInfoTab event={event ?? undefined} />;
            case "participants":
              return (
                <EventParticipantsTab
                  members={
                    event === undefined
                      ? Array(6).fill(undefined)
                      : event!.members
                  }
                />
              );
            case "posts":
              return (
                <EventPostsTab
                  posts={event === undefined ? undefined : event!.posts}
                  organizer={event === undefined ? undefined : event!.organizer!}
                />
              );
          }
        })()}
        <div className="h-16 shrink-0" />
        <EventButtons event={event!} reFetch={fetchEvent} />
      </div>
    </div>
  );
}

export default EventPage;
