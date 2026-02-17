import { setDocumentTitle } from "../hooks/use-document-title";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useGetEventLazyQuery } from "@/graphql/generated";
import BackButton from "@/components/routes/BackButton";
import { HashLoader } from "react-spinners";
import { LOADER_COLOR } from "@/constants";
import EventInfoTab from "@/components/event/EventInfoTab";
import EventParticipantsTab from "@/components/event/EventParticipantsTab";
import EventPostsTab from "@/components/event/EventPostsTab";
import EventButtons from "@/components/event/EventButtons";

type EventTab = "info" | "participants" | "posts";

function EventPage() {
  const { eventId } = useParams();

  const [tab, setTab] = useState<EventTab>("info");

  const [getEvent, { loading, error, data }] = useGetEventLazyQuery();
  const event = data?.event;

  const fetchEvent = useCallback(() => {
    if (!eventId) return;
    getEvent({
      variables: { eventId: parseInt(eventId) },
      fetchPolicy: "network-only",
    })
      .then((result) => {
        setDocumentTitle(result.data?.event?.title ?? "Uh Oh");
      })
      .catch((_) => {});
  }, [eventId, getEvent]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return (
    <div className="pt-8 h-full flex flex-col">
      <BackButton />
      {
        (() => {
          switch (true) {
            case !eventId || loading:
              return (
                <div className="h-full flex justify-center items-center">
                  <HashLoader color={LOADER_COLOR} />
                </div>
              );
            case !!error || event === null || event === undefined:
              return <p className="mt-8">{error?.message}</p>;
            default:
              return (
                <div className="grow flex flex-col pb-8 max-h-[calc(100%-2rem)]">
                  <div className="flex justify-around py-2 border-b border-foreground bottom-1 [&>p]:cursor-pointer [&>p]:select-none my-4">
                    <p
                      className={tab === "info" ? "text-block-accent" : ""}
                      onClick={() => setTab("info")}
                    >
                      info
                    </p>
                    <p
                      className={
                        tab === "participants" ? "text-block-accent" : ""
                      }
                      onClick={() => setTab("participants")}
                    >
                      participants({event!.members.length})
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
                        return <EventInfoTab event={event!} />;
                      case "participants":
                        return (
                          <EventParticipantsTab members={event!.members} />
                        );
                      case "posts":
                        return (
                          <EventPostsTab
                            posts={event!.posts}
                            organizer={event!.organizer!}
                          />
                        );
                    }
                  })()}
                  <div className="h-16 shrink-0" />
                  <EventButtons event={event!} reFetch={fetchEvent} />
                </div>
              );
          }
        })() // :D
      }
    </div>
  );
}

export default EventPage;
