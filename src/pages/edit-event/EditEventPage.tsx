import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { HiOutlineNoSymbol, HiOutlineTrash } from "react-icons/hi2";
import {
  AlterEventDocument,
  CancelEventDocument,
  DeleteEventDocument,
  EventPhase,
  MemberRole,
} from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import EventForm, { type EventFormValues } from "@/components/event/EventForm";
import { useEvent } from "@/hooks/use-event";
import EditEventPageSkeleton from "./EditEventPageSkeleton";
import Button from "@/components/ui/Button";
import { formatError } from "@/utils/format-error";
import PageHeader from "@/components/layout/PageHeader";
import { useToast } from "@/context/toast-context";

const pageWrap = "w-full mx-auto max-w-3xl p-4";

const pad = (n: number) => n.toString().padStart(2, "0");

const dateString = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const timeString = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

function EditEventPage() {
  useDocumentTitle("Edit Event");

  const { eventId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { id, event, fallback } = useEvent({
    eventIdParam: eventId,
    loadingFallback: <EditEventPageSkeleton />,
  });

  const [alterEvent, { loading: saving, error: apiError }] =
    useMutation(AlterEventDocument);

  const [deleteEvent, { loading: deleting, error: deleteError }] = useMutation(
    DeleteEventDocument,
  );

  const [cancelEvent, { loading: cancelling, error: cancelError }] = useMutation(
    CancelEventDocument,
  );

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  useEffect(() => {
    if (event && event.role !== MemberRole.Organizer) {
      navigate(`/event/${id}`, { replace: true });
    }
  }, [event, id, navigate]);

  if (fallback) return fallback;
  if (!event || event.role !== MemberRole.Organizer) return null;

  const startDate = new Date(event.startTime);
  const endDate = event.endTime ? new Date(event.endTime) : null;

  const defaultEndTime = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
  const isDefaultEnd =
    endDate && endDate.getTime() === defaultEndTime.getTime();

  const initialValues: Partial<EventFormValues> = {
    title: event.title ?? "",
    description: event.description ?? "",
    startDate: dateString(startDate),
    startTime: timeString(startDate),
    endDate: endDate && !isDefaultEnd ? dateString(endDate) : "",
    endTime: endDate && !isDefaultEnd ? timeString(endDate) : "",
    maxParticipants: event.maxParticipants?.toString() ?? "",
  };

  const handleSubmit = async (values: EventFormValues) => {
    const startDateTime = new Date(`${values.startDate}T${values.startTime}`);
    const endDateTime =
      values.endDate && values.endTime
        ? new Date(`${values.endDate}T${values.endTime}`)
        : new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);

    try {
      const result = await alterEvent({
        variables: {
          eventId: id,
          title: values.title,
          description: values.description || null,
          startTime: startDateTime,
          endTime: endDateTime,
          maxParticipants: values.maxParticipants
            ? parseInt(values.maxParticipants)
            : null,
        },
      });

      if (result.data?.alterEvent?.event?.id) {
        toast.success("Changes saved.");
        navigate(`/event/${id}`);
      }
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  const handleCancel = async () => {
    try {
      const result = await cancelEvent({ variables: { eventId: id } });
      if (result.data?.cancelEvent?.event?.id) {
        toast.success("Event cancelled.");
        navigate(`/event/${id}`);
      }
    } catch (err) {
      console.error("Error cancelling event:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteEvent({
        variables: { eventId: id },
        update: (cache) => {
          cache.evict({ id: cache.identify({ __typename: "EventType", id }) });
          cache.gc();
        },
      });
      if (result.data?.deleteEvent?.success) {
        toast.success("Event deleted.");
        navigate("/home", { replace: true });
      }
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  return (
    <div className="min-h-full shrink-0 flex flex-col">
      <PageHeader title="Edit Event">
        <p className="pb-3 text-sm text-base-content/60 truncate">
          {event.title}
        </p>
      </PageHeader>

      <div className={pageWrap}>
        <EventForm
          mode="edit"
          initialValues={initialValues}
          submitLabel="Save Changes"
          loading={saving}
          apiError={apiError}
          cancelHref={`/event/${id}`}
          onSubmit={handleSubmit}
        />

        <div className="mt-10 pt-6 border-t border-base-300 flex justify-end gap-2">
          {event.phase !== EventPhase.Cancelled &&
            event.phase !== EventPhase.Finished && (
              <button
                type="button"
                onClick={() => setCancelOpen(true)}
                className="btn btn-outline btn-warning rounded-2xl"
              >
                <HiOutlineNoSymbol className="h-4 w-4" />
                Cancel event
              </button>
            )}
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="btn btn-outline btn-error rounded-2xl"
          >
            <HiOutlineTrash className="h-4 w-4" />
            Delete event
          </button>
        </div>

        <dialog className={`modal ${confirmOpen ? "modal-open" : ""}`}>
          <div className="modal-box rounded-2xl">
            <h3 className="font-bold text-lg">Delete this event?</h3>
            <p className="py-3 text-sm text-base-content/70">
              <span className="font-medium text-foreground">
                {event.title}
              </span>{" "}
              will be removed for everyone. This can't be undone.
            </p>

            {deleteError && (
              <p className="text-sm text-error mb-2">
                {formatError(deleteError)}
              </p>
            )}

            <div className="modal-action">
              <Button
                onClick={() => setConfirmOpen(false)}
                disabled={deleting}
                className="btn-ghost"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                loading={deleting}
                className="btn-error"
              >
                Delete event
              </Button>
            </div>
          </div>
          <button
            type="button"
            className="modal-backdrop"
            aria-label="Close"
            onClick={() => !deleting && setConfirmOpen(false)}
          />
        </dialog>

        <dialog className={`modal ${cancelOpen ? "modal-open" : ""}`}>
          <div className="modal-box rounded-2xl">
            <h3 className="font-bold text-lg">Cancel this event?</h3>
            <p className="py-3 text-sm text-base-content/70">
              Participants will be notified.{" "}
              <span className="font-medium text-foreground">
                {event.title}
              </span>{" "}
              stays in your history as cancelled. This can't be undone.
            </p>

            {cancelError && (
              <p className="text-sm text-error mb-2">
                {formatError(cancelError)}
              </p>
            )}

            <div className="modal-action">
              <Button
                onClick={() => setCancelOpen(false)}
                disabled={cancelling}
                className="btn-ghost"
              >
                Keep event
              </Button>
              <Button
                onClick={handleCancel}
                loading={cancelling}
                className="btn-warning"
              >
                Cancel event
              </Button>
            </div>
          </div>
          <button
            type="button"
            className="modal-backdrop"
            aria-label="Close"
            onClick={() => !cancelling && setCancelOpen(false)}
          />
        </dialog>
      </div>
    </div>
  );
}

export default EditEventPage;
