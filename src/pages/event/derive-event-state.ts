import {
  EventPhase,
  GetEventQueryResult,
  MemberRole,
} from "@/graphql/graphql-types";
import { displayName } from "@/utils/display-name";
import { getActivityLabel } from "@/utils/activity-label";
import strings from "@/translations/strings";

type Event = NonNullable<GetEventQueryResult["event"]>;

const ATTENDEE_ROLES = [
  MemberRole.Participant,
  MemberRole.Moderator,
  MemberRole.Spectator,
];

export function deriveEventState(event: Event) {
  const organizerName = displayName(
    event.organizer?.user.username!,
    event.organizer?.user.firstName!,
    event.organizer?.user.lastName!,
  );

  const activity = getActivityLabel(event.activity);

  const isCancelled = event.phase === EventPhase.Cancelled;
  const isFinished = event.phase === EventPhase.Finished;
  const isLocked = event.phase !== EventPhase.Scheduled;

  const isFull = !!(
    event.maxParticipants && event.members.length >= event.maxParticipants
  );

  const lockedLabel = isCancelled
    ? strings.event.page.eventCancelled
    : isFinished
      ? strings.event.page.eventEnded
      : strings.event.page.eventInProgress;

  const titleClass = isCancelled
    ? "text-base-content/60 line-through decoration-error/50 decoration-2"
    : isFinished
      ? "text-base-content/80"
      : "text-base-content";

  const role = event.role ?? null;
  const isOrganizer = role === MemberRole.Organizer;
  const isAttendee = role != null && ATTENDEE_ROLES.includes(role);

  const canCreatePost =
    role != null &&
    [MemberRole.Organizer, MemberRole.Moderator].includes(role);
  const canRate = isFinished && isAttendee;
  const canViewFeedback = isFinished && isOrganizer;
  const showScore = isFinished && event.score != null && event.score >= 1;

  const postCount = event.posts?.length ?? 0;
  const commentCount = event.comments?.length ?? 0;
  const participantCount = event.members?.length ?? 0;

  const locationName = event.location?.name;
  const mapsUrl =
    event.location?.latitude != null && event.location?.longitude != null
      ? `https://www.google.com/maps/search/?api=1&query=${event.location.latitude},${event.location.longitude}`
      : locationName
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName)}`
        : null;

  return {
    organizerName,
    activity,
    isCancelled,
    isFinished,
    isLocked,
    isFull,
    isOrganizer,
    isAttendee,
    lockedLabel,
    titleClass,
    canCreatePost,
    canRate,
    canViewFeedback,
    showScore,
    postCount,
    commentCount,
    participantCount,
    locationName,
    mapsUrl,
  };
}
