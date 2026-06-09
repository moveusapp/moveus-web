import { Link } from "react-router-dom";
import {
  HiArrowUpTray,
  HiOutlineChartBar,
  HiOutlineChatBubbleLeftRight,
  HiOutlineFlag,
  HiOutlinePencilSquare,
  HiOutlineStar,
} from "react-icons/hi2";
import Button from "@/components/ui/Button";
import strings from "@/translations/strings";

interface EventActionBarProps {
  eventId: number | string;
  organizerId: number | null | undefined;
  organizerCanMessage: boolean | null | undefined;
  isOrganizer: boolean;
  isAttendee: boolean;
  isLocked: boolean;
  isFull: boolean;
  canRate: boolean;
  canViewFeedback: boolean;
  canEnd: boolean;
  lockedLabel: string;
  joinLoading: boolean;
  leaveLoading: boolean;
  endLoading: boolean;
  onJoin: () => void;
  onLeave: () => void;
  onShare: () => void;
  onRate: () => void;
  onViewFeedback: () => void;
  onEnd: () => void;
}

function EventActionBar({
  eventId,
  organizerId,
  organizerCanMessage,
  isOrganizer,
  isAttendee,
  isLocked,
  isFull,
  canRate,
  canViewFeedback,
  canEnd,
  lockedLabel,
  joinLoading,
  leaveLoading,
  endLoading,
  onJoin,
  onLeave,
  onShare,
  onRate,
  onViewFeedback,
  onEnd,
}: EventActionBarProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <PrimaryAction
          isOrganizer={isOrganizer}
          isAttendee={isAttendee}
          isLocked={isLocked}
          isFull={isFull}
          canRate={canRate}
          canViewFeedback={canViewFeedback}
          canEnd={canEnd}
          lockedLabel={lockedLabel}
          joinLoading={joinLoading}
          leaveLoading={leaveLoading}
          endLoading={endLoading}
          eventId={eventId}
          onJoin={onJoin}
          onLeave={onLeave}
          onRate={onRate}
          onViewFeedback={onViewFeedback}
          onEnd={onEnd}
        />

        <button
          type="button"
          onClick={onShare}
          disabled={isLocked}
          className={`btn btn-square rounded-2xl ${isLocked ? "btn-disabled" : ""}`}
          aria-label={strings.event.page.shareEventAria}
        >
          <HiArrowUpTray className="h-4 w-4" />
        </button>
      </div>

      {!isOrganizer && organizerId != null && organizerCanMessage && (
        <Link
          to={`/chat?userId=${organizerId}`}
          className="btn btn-outline btn-primary w-full"
        >
          <HiOutlineChatBubbleLeftRight className="h-4 w-4" />
          {strings.event.page.messageOrganizer}
        </Link>
      )}
    </div>
  );
}

function PrimaryAction({
  isOrganizer,
  isAttendee,
  isLocked,
  isFull,
  canRate,
  canViewFeedback,
  canEnd,
  lockedLabel,
  joinLoading,
  leaveLoading,
  endLoading,
  eventId,
  onJoin,
  onLeave,
  onRate,
  onViewFeedback,
  onEnd,
}: Omit<EventActionBarProps, "onShare" | "organizerId" | "organizerCanMessage">) {
  if (canRate) {
    return (
      <button
        type="button"
        onClick={onRate}
        className="btn btn-primary flex-1 rounded-2xl"
      >
        <HiOutlineStar className="h-4 w-4" />
        {strings.event.page.leaveFeedback}
      </button>
    );
  }

  if (canViewFeedback) {
    return (
      <button
        type="button"
        onClick={onViewFeedback}
        className="btn btn-primary flex-1 rounded-2xl"
      >
        <HiOutlineChartBar className="h-4 w-4" />
        {strings.event.page.viewFeedback}
      </button>
    );
  }

  if (canEnd) {
    return (
      <Button
        onClick={onEnd}
        loading={endLoading}
        className="btn btn-primary flex-1"
      >
        <HiOutlineFlag className="h-4 w-4" />
        {strings.event.page.endEvent}
      </Button>
    );
  }

  if (isLocked) {
    return (
      <button
        type="button"
        disabled
        className="btn btn-disabled flex-1 rounded-2xl"
      >
        {lockedLabel}
      </button>
    );
  }

  if (isOrganizer) {
    return (
      <Link
        to={`/event/${eventId}/edit`}
        className="btn btn-primary flex-1 rounded-2xl"
      >
        <HiOutlinePencilSquare className="h-4 w-4" />
        {strings.event.page.editEvent}
      </Link>
    );
  }

  if (isAttendee) {
    return (
      <Button
        onClick={onLeave}
        loading={leaveLoading}
        className="btn btn-error btn-outline flex-1"
      >
        {strings.event.page.leaveEvent}
      </Button>
    );
  }

  return (
    <Button
      onClick={onJoin}
      loading={joinLoading}
      disabled={isFull}
      className={`btn btn-primary flex-1 ${isFull ? "btn-disabled" : ""}`}
    >
      {isFull ? strings.event.page.eventFull : strings.event.page.joinEvent}
    </Button>
  );
}

export default EventActionBar;
