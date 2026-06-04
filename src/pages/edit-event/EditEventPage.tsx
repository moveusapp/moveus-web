import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApolloClient } from "@apollo/client/react";
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
import strings from "@/translations/strings";
import { useHtmlDialog } from "@/hooks/use-html-dialog";
import { uploadEventThumbnail } from "@/utils/upload";
import { dayKey, formatTime } from "@/utils/time-utils";

const pageWrap = "w-full mx-auto max-w-3xl p-4";

function EditEventPage() {
  useDocumentTitle(strings.editEvent.documentTitle);

  const { eventId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const apollo = useApolloClient();

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
  const { dialogRef: confirmDialogRef } = useHtmlDialog(confirmOpen);
  const { dialogRef: cancelDialogRef } = useHtmlDialog(cancelOpen);

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
    startDate: dayKey(startDate),
    startTime: formatTime(startDate),
    endDate: endDate && !isDefaultEnd ? dayKey(endDate) : "",
    endTime: endDate && !isDefaultEnd ? formatTime(endDate) : "",
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
        let imageFailed = false;
        if (values.thumbnail) {
          try {
            await uploadEventThumbnail(apollo, id, values.thumbnail);
          } catch {
            imageFailed = true;
          }
        }

        if (imageFailed) {
          toast.info(strings.toast.changesSavedNoPhoto);
        } else {
          toast.success(strings.toast.changesSaved);
        }
        navigate(`/event/${id}`);
      }
    } catch {
      // Errors surface inline via EventForm's apiError prop.
    }
  };

  const handleCancel = async () => {
    try {
      const result = await cancelEvent({ variables: { eventId: id } });
      if (result.data?.cancelEvent?.event?.id) {
        toast.success(strings.toast.eventCancelled);
        navigate(`/event/${id}`);
      }
    } catch (err) {
      toast.error(formatError(err));
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
        toast.success(strings.toast.eventDeleted);
        navigate("/home", { replace: true });
      }
    } catch (err) {
      toast.error(formatError(err));
    }
  };

  return (
    <div className="min-h-full shrink-0 flex flex-col">
      <PageHeader title={strings.editEvent.title}>
        <p className="pb-3 text-sm text-base-content/60 truncate">
          {event.title}
        </p>
      </PageHeader>

      <div className={pageWrap}>
        <EventForm
          mode="edit"
          initialValues={initialValues}
          initialThumbnailUrl={event.imageUrl ?? undefined}
          submitLabel={strings.editEvent.submit}
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
                {strings.editEvent.cancelEvent}
              </button>
            )}
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="btn btn-outline btn-error rounded-2xl"
          >
            <HiOutlineTrash className="h-4 w-4" />
            {strings.editEvent.deleteEvent}
          </button>
        </div>

        <dialog
          ref={confirmDialogRef}
          className="modal"
          onClose={() => setConfirmOpen(false)}
        >
          <div className="modal-box rounded-2xl">
            <h3 className="font-bold text-lg">{strings.editEvent.deleteModalTitle}</h3>
            <p className="py-3 text-sm text-base-content/70">
              {strings.formatString(strings.editEvent.deleteModalBody, {
                title: event.title ?? "",
              })}
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
                {strings.common.cancel}
              </Button>
              <Button
                onClick={handleDelete}
                loading={deleting}
                className="btn-error"
              >
                {strings.editEvent.deleteEvent}
              </Button>
            </div>
          </div>
          <button
            type="button"
            className="modal-backdrop"
            aria-label={strings.common.close}
            onClick={() => !deleting && setConfirmOpen(false)}
          />
        </dialog>

        <dialog
          ref={cancelDialogRef}
          className="modal"
          onClose={() => setCancelOpen(false)}
        >
          <div className="modal-box rounded-2xl">
            <h3 className="font-bold text-lg">{strings.editEvent.cancelModalTitle}</h3>
            <p className="py-3 text-sm text-base-content/70">
              {strings.formatString(strings.editEvent.cancelModalBody, {
                title: event.title ?? "",
              })}
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
                {strings.editEvent.keepEvent}
              </Button>
              <Button
                onClick={handleCancel}
                loading={cancelling}
                className="btn-warning"
              >
                {strings.editEvent.cancelEvent}
              </Button>
            </div>
          </div>
          <button
            type="button"
            className="modal-backdrop"
            aria-label={strings.common.close}
            onClick={() => !cancelling && setCancelOpen(false)}
          />
        </dialog>
      </div>
    </div>
  );
}

export default EditEventPage;
