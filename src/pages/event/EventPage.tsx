import EventThumbnail from "@/components/event/EventThumbnail";
import { setDocumentTitle } from "@/hooks/use-document-title";
import UserAvatar from "@/components/user/UserAvatar";
import UserBadge from "@/components/user/UserBadge";
import {
  EventPhase,
  FinishEventDocument,
  JoinEventDocument,
  LeaveEventDocument,
  MemberRole,
} from "@/graphql/graphql-types";
import EventPhaseBadge from "@/components/event/EventPhaseBadge";
import { formatDate, formatTime } from "@/utils/time-utils";
import { formatError } from "@/utils/format-error";
import { useToast } from "@/context/toast-context";
import { useMutation } from "@apollo/client/react";
import { useEvent } from "@/hooks/use-event";
import {
  HiOutlineMapPin,
  HiOutlineCalendarDays,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineUsers,
  HiChevronRight,
} from "react-icons/hi2";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventPageSkeleton from "./EventPageSkeleton";
import TabButtons from "@/components/ui/TabButtons";
import CreatePostModal from "@/components/post/CreatePostModal";
import LeaveFeedbackModal from "@/components/event/LeaveFeedbackModal";
import ViewFeedbackModal from "@/pages/event/ViewFeedbackModal";
import ParticipantsModal from "@/pages/event/ParticipantsModal";
import EventScore from "@/pages/event/EventScore";
import EventActionBar from "@/pages/event/EventActionBar";
import EventTabContent, { EventTabId } from "@/pages/event/EventTabContent";
import { deriveEventState } from "@/pages/event/derive-event-state";
import { useHtmlDialog } from "@/hooks/use-html-dialog";
import Button from "@/components/ui/Button";
import { HiOutlineFlag } from "react-icons/hi2";
import strings from "@/translations/strings";

function EventPage() {
  const { eventId } = useParams();
  const { id, event, refetch, fallback } = useEvent({
    eventIdParam: eventId,
    loadingFallback: <EventPageSkeleton />,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const [desktopActiveTab, setDesktopActiveTab] =
    useState<Extract<EventTabId, "posts" | "comments">>("posts");
  const [mobileActiveTab, setMobileActiveTab] = useState<EventTabId>("posts");
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showLeaveFeedback, setShowLeaveFeedback] = useState(false);
  const [showViewFeedback, setShowViewFeedback] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const { dialogRef: endDialogRef } = useHtmlDialog(showEndConfirm);

  const [joinEvent, { loading: joinLoading }] = useMutation(JoinEventDocument);
  const [leaveEvent, { loading: leaveLoading }] =
    useMutation(LeaveEventDocument);
  const [finishEvent, { loading: endLoading, error: endError }] =
    useMutation(FinishEventDocument);

  const toast = useToast();

  useEffect(() => {
    if (!event || !searchParams.has("feedback")) return;
    setSearchParams("", { replace: true });
    const attended = [
      MemberRole.Participant,
      MemberRole.Moderator,
      MemberRole.Spectator,
    ].includes(event.role!);
    if (event.phase === EventPhase.Finished && attended) {
      setShowLeaveFeedback(true);
    }
  }, [event, searchParams, setSearchParams]);

  if (fallback) return fallback;
  if (!event) return null;

  const d = deriveEventState(event);

  const handleJoin = async () => {
    if (d.isFull) return;
    try {
      await joinEvent({ variables: { eventId: id } });
      toast.success(strings.toast.joinedEvent);
    } catch (err) {
      toast.error(formatError(err));
    }
  };

  const handleLeave = async () => {
    try {
      await leaveEvent({ variables: { eventId: id } });
      toast.info(strings.toast.leftEvent);
    } catch (err) {
      toast.error(formatError(err));
    }
  };

  const handleEnd = async () => {
    try {
      const result = await finishEvent({ variables: { eventId: id } });
      if (result.data?.finishEvent?.success) {
        setShowEndConfirm(false);
        await refetch();
        toast.success(strings.toast.eventEnded);
      }
    } catch (err) {
      toast.error(formatError(err));
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success(strings.toast.linkCopied);
    } catch {
      toast.error(strings.toast.couldntCopyLink);
    }
  };

  setDocumentTitle(event.title);

  const actionBar = (
    <EventActionBar
      eventId={eventId!}
      organizerId={event.organizer?.user.id}
      organizerCanMessage={event.organizer?.user.canMessage}
      isOrganizer={d.isOrganizer}
      isAttendee={d.isAttendee}
      isLocked={d.isLocked}
      isFull={d.isFull}
      canRate={d.canRate}
      canViewFeedback={d.canViewFeedback}
      canEnd={d.canEnd}
      lockedLabel={d.lockedLabel}
      joinLoading={joinLoading}
      leaveLoading={leaveLoading}
      endLoading={endLoading}
      onJoin={handleJoin}
      onLeave={handleLeave}
      onShare={handleShare}
      onRate={() => setShowLeaveFeedback(true)}
      onViewFeedback={() => setShowViewFeedback(true)}
      onEnd={() => setShowEndConfirm(true)}
    />
  );

  const postsTab = {
    value: "posts",
    label: (
      <span className="inline-flex items-center gap-1.5">
        <span>{strings.ui.posts}</span>
        <span className="text-xs opacity-50 tabular-nums">{d.postCount}</span>
      </span>
    ),
  };
  const commentsTab = {
    value: "comments",
    label: (
      <span className="inline-flex items-center gap-1.5">
        <span>{strings.ui.comments}</span>
        <span className="text-xs opacity-50 tabular-nums">{d.commentCount}</span>
      </span>
    ),
  };
  const participantsTab = {
    value: "participants",
    label: (
      <span className="inline-flex items-center gap-1.5">
        <span>{strings.event.page.participants}</span>
        <span className="text-xs opacity-50 tabular-nums">
          {d.participantCount}
        </span>
      </span>
    ),
  };

  return (
    <div className="w-full mx-auto max-w-5xl px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Header shares the same content inset as the tabs and feed below
              (page padding + content padding), so the whole column lines up. */}
          <div className="px-4 sm:px-5">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                {d.activity}
              </p>
              <EventPhaseBadge phase={event.phase} />
            </div>
            <h1
              className={`text-xl sm:text-2xl lg:text-3xl font-bold text-balance mt-1 ${d.titleClass}`}
            >
              {event.title}
            </h1>

            <Link
              to={`/user/${event.organizer?.user.username}`}
              className="flex items-center gap-2 group text-sm text-base-content/60 hover:text-base-content transition-colors mt-2"
            >
              <UserAvatar
                imageUrl={event.organizer?.user.avatarUrl}
                className="w-9 h-9 shrink-0"
              />
              <span className="flex items-center gap-1">
                {strings.event.page.hostedBy}{" "}
                <span className="text-base-content font-medium group-hover:text-primary">
                  {d.organizerName}
                </span>
                <UserBadge badge={event.organizer?.user.badge} size={16} />
              </span>
            </Link>

            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm text-base-content/60 mt-3 lg:hidden">
              <span className="flex items-center gap-1.5">
                <HiOutlineCalendarDays className="h-4 w-4 text-primary" />
                {formatDate(event.startTime)} • {formatTime(event.startTime)}
              </span>
              {d.mapsUrl ? (
                <a
                  href={d.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary"
                >
                  <HiOutlineMapPin className="h-4 w-4" />
                  <span>{d.locationName || strings.event.locationTBD}</span>
                  <HiOutlineArrowTopRightOnSquare className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span className="flex items-center gap-1.5">
                  <HiOutlineMapPin className="h-4 w-4 text-primary" />
                  {strings.event.locationTBD}
                </span>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-base-content/60 whitespace-pre-line break-words">
              {event.description}
            </p>

            {d.showScore && (
              <div className="lg:hidden mt-4">
                <EventScore score={event.score!} />
              </div>
            )}
          </div>

          <div className="lg:hidden sticky top-0 z-20 -mx-4 px-4 py-3 bg-base-100/80 backdrop-blur-lg border-b border-base-300 mt-4">
            {actionBar}
          </div>

          <div className="hidden lg:block border-b border-base-300 mt-4">
            <TabButtons
              tabs={[postsTab, commentsTab]}
              activeTab={desktopActiveTab}
              onChange={(tab) =>
                setDesktopActiveTab(tab as Extract<EventTabId, "posts" | "comments">)
              }
            />
          </div>

          <div className="lg:hidden border-b border-base-300 mt-4">
            <TabButtons
              tabs={[postsTab, commentsTab, participantsTab]}
              activeTab={mobileActiveTab}
              onChange={(tab) => setMobileActiveTab(tab as EventTabId)}
            />
          </div>

          <div
            className={`hidden lg:block pb-6 ${
              desktopActiveTab === "posts" ? "" : "mt-4"
            }`}
          >
            <EventTabContent
              tab={desktopActiveTab}
              event={event}
              eventId={id}
              canCreatePost={d.canCreatePost}
              onCreatePost={() => setShowCreatePostModal(true)}
            />
          </div>

          <div
            className={`lg:hidden pb-6 ${
              mobileActiveTab === "posts" ? "" : "mt-4"
            }`}
          >
            <EventTabContent
              tab={mobileActiveTab}
              event={event}
              eventId={id}
              canCreatePost={d.canCreatePost}
              onCreatePost={() => setShowCreatePostModal(true)}
            />
          </div>
        </div>

        <aside className="w-full lg:w-[300px] lg:flex-shrink-0 order-first lg:order-last">
          <div className="lg:sticky lg:top-6 lg:self-start flex flex-col gap-5">
            <div className="relative rounded-2xl overflow-hidden bg-base-300">
              <EventThumbnail
                imageUrl={event.imageUrl}
                alt={event.title ?? ""}
                crossOrigin="anonymous"
                className={`w-full aspect-video object-cover transition-[filter] duration-300 ${
                  d.isCancelled
                    ? "grayscale brightness-75"
                    : d.isFinished
                      ? "grayscale-[60%] brightness-90"
                      : ""
                }`}
              />
            </div>

            {d.showScore && (
              <div className="hidden lg:block">
                <EventScore score={event.score!} />
              </div>
            )}

            <div className="hidden lg:block">{actionBar}</div>

            <div className="hidden lg:flex lg:flex-col gap-4 border-t border-base-300 pt-5">
              <div className="flex items-center gap-3">
                <HiOutlineCalendarDays className="h-5 w-5 text-primary shrink-0" />
                <p className="text-sm font-medium text-base-content">
                  {formatDate(event.startTime)} • {formatTime(event.startTime)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <HiOutlineMapPin className="h-5 w-5 text-primary shrink-0" />
                {d.mapsUrl ? (
                  <a
                    href={d.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-w-0 flex-1 items-center gap-1.5 text-sm font-medium text-base-content transition-colors hover:text-primary"
                  >
                    <span className="truncate">
                      {d.locationName || strings.event.locationTBD}
                    </span>
                    <HiOutlineArrowTopRightOnSquare className="h-3.5 w-3.5 shrink-0 text-base-content/40 transition-colors group-hover:text-primary" />
                  </a>
                ) : (
                  <p className="text-sm font-medium text-base-content flex-1 min-w-0 truncate">
                    {d.locationName || strings.event.locationTBD}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <HiOutlineUsers className="h-5 w-5 shrink-0 text-primary" />
                  <p className="flex items-center gap-2 text-sm font-medium text-base-content">
                    {strings.event.page.participants}
                    <span className="text-xs tabular-nums text-base-content/50">
                      {event.members.length}
                      {event.maxParticipants ? `/${event.maxParticipants}` : ""}
                    </span>
                  </p>
                  {event.members.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowParticipants(true)}
                      className="ml-auto -mr-2 flex shrink-0 items-center gap-0.5 rounded-lg px-2 py-1 text-xs font-semibold text-primary outline-none transition-colors hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      {strings.common.seeAll}
                      <HiChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {event.members.length > 0 ? (
                  <div className="flex -space-x-3 pl-8">
                    {event.members.slice(0, 5).map((member) => (
                      <div
                        key={member.user.id}
                        className="rounded-full ring-2 ring-base-100"
                      >
                        <UserAvatar
                          imageUrl={member.user.avatarUrl}
                          className="w-10 h-10"
                        />
                      </div>
                    ))}
                    {event.members.length > 5 && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral text-neutral-content ring-2 ring-base-100">
                        <span className="text-xs font-medium">
                          +{event.members.length - 5}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="pl-8 text-sm text-base-content/50">
                    {strings.event.page.noOneJoined}
                  </p>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <CreatePostModal
        eventId={id}
        isOpen={showCreatePostModal}
        onClose={() => setShowCreatePostModal(false)}
        onSuccess={refetch}
      />

      <LeaveFeedbackModal
        isOpen={showLeaveFeedback}
        onClose={() => setShowLeaveFeedback(false)}
        eventId={id}
        eventTitle={event.title}
        onSubmitted={refetch}
      />

      <ViewFeedbackModal
        isOpen={showViewFeedback}
        onClose={() => setShowViewFeedback(false)}
        event={event}
      />

      <ParticipantsModal
        isOpen={showParticipants}
        onClose={() => setShowParticipants(false)}
        event={event}
      />

      <dialog
        ref={endDialogRef}
        className="modal"
        onClose={() => setShowEndConfirm(false)}
      >
        <div className="modal-box rounded-2xl">
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <HiOutlineFlag className="h-5 w-5 text-primary" />
            {strings.event.page.endModalTitle}
          </h3>
          <p className="py-3 text-sm text-base-content/70">
            {strings.formatString(strings.event.page.endModalBody, {
              title: event.title ?? "",
            })}
          </p>

          {endError && (
            <p className="mb-2 text-sm text-error">{formatError(endError)}</p>
          )}

          <div className="modal-action">
            <Button
              onClick={() => setShowEndConfirm(false)}
              disabled={endLoading}
              className="btn-ghost"
            >
              {strings.event.page.endModalKeep}
            </Button>
            <Button
              onClick={handleEnd}
              loading={endLoading}
              className="btn-primary"
            >
              <HiOutlineFlag className="h-4 w-4" />
              {strings.event.page.endEvent}
            </Button>
          </div>
        </div>
        <button
          type="button"
          className="modal-backdrop"
          aria-label={strings.common.close}
          onClick={() => !endLoading && setShowEndConfirm(false)}
        />
      </dialog>
    </div>
  );
}

export default EventPage;
