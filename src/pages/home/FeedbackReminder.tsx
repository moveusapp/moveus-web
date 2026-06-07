import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { HiXMark } from "react-icons/hi2";
import {
  EventRating,
  GetUnratedEventsDocument,
  GetUnratedEventsQueryResult,
} from "@/graphql/graphql-types";
import RatingFaces from "@/components/event/RatingFaces";
import LeaveFeedbackModal from "@/components/event/LeaveFeedbackModal";
import useSessionDismissed from "@/hooks/use-session-dismissed";
import { timeAgo } from "@/utils/time-utils";
import duckHappy from "@/assets/duck/duck-happy.svg";
import strings from "@/translations/strings";

type UnratedEvent = NonNullable<
  NonNullable<GetUnratedEventsQueryResult["unratedEvents"]>[number]
>;

function FeedbackReminder() {
  const { data, loading } = useQuery(GetUnratedEventsDocument, {
    fetchPolicy: "cache-and-network",
  });

  // Snapshot the queue once so ratings advance a stable "X of N" counter
  // instead of the list shifting under the user as it refetches.
  const [queue, setQueue] = useState<UnratedEvent[] | null>(null);
  const [index, setIndex] = useState(0);
  const [dismissed, dismiss] = useSessionDismissed("feedback-reminder");
  const [pendingScore, setPendingScore] = useState<EventRating | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (queue || loading) return;
    const events = (data?.unratedEvents ?? []).filter(
      (e): e is UnratedEvent => !!e && e.id != null,
    );
    if (events.length > 0) setQueue(events);
  }, [data, loading, queue]);

  if (dismissed || !queue) return null;

  const event = queue[index];
  if (!event) return null;

  const openModal = (score: EventRating) => {
    setPendingScore(score);
    setModalOpen(true);
  };

  const handleSubmitted = () => {
    setModalOpen(false);
    setPendingScore(null);
    setIndex((i) => i + 1);
  };

  return (
    <>
      <section className="rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <img
            src={duckHappy}
            alt=""
            className="h-14 w-auto shrink-0 -rotate-6 select-none"
            draggable={false}
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-bold leading-snug text-base-content text-balance">
              {strings.home.feedbackHowWas}{" "}
              <Link
                to={`/event/${event.id}`}
                className="text-primary underline-offset-2 hover:underline focus-visible:underline"
              >
                {event.title}
              </Link>
              ?
            </h2>
            <p className="text-sm text-base-content/70">
              {strings.formatString(strings.home.feedbackWrappedUp, { time: timeAgo(event.endTime) })}
            </p>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="btn btn-sm btn-circle btn-ghost shrink-0 text-base-content/60"
            aria-label={strings.home.dismissFeedbackAria}
          >
            <HiXMark className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3">
          <RatingFaces value={null} onChange={openModal} />
        </div>

        {queue.length > 1 && (
          <p className="mt-2 text-right text-xs font-medium text-base-content/70">
            {strings.formatString(strings.home.queueProgress, { index: index + 1, total: queue.length })}
          </p>
        )}
      </section>

      <LeaveFeedbackModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        eventId={event.id!}
        eventTitle={event.title}
        initialScore={pendingScore}
        onSubmitted={handleSubmitted}
      />
    </>
  );
}

export default FeedbackReminder;
