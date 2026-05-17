import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import {
  AlterEventDocument,
  MemberRole,
} from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import EventForm, { type EventFormValues } from "@/components/event/EventForm";
import { useEvent } from "@/hooks/use-event";
import EditEventPageSkeleton from "./EditEventPageSkeleton";

const pageWrap = "w-full mx-auto max-w-3xl p-4";

const pad = (n: number) => n.toString().padStart(2, "0");

const dateString = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const timeString = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

function EditEventPage() {
  useDocumentTitle("Edit Event");

  const { eventId } = useParams();
  const navigate = useNavigate();

  const { id, event, fallback } = useEvent({
    eventIdParam: eventId,
    loadingFallback: <EditEventPageSkeleton />,
  });

  const [alterEvent, { loading: saving, error: apiError }] =
    useMutation(AlterEventDocument);

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
        navigate(`/event/${id}`);
      }
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  return (
    <div className={pageWrap}>
      <div className="mb-4">
        <h1 className="font-medium text-xl">Edit Event</h1>
        <p className="text-sm text-base-content/60 truncate">{event.title}</p>
      </div>

      <EventForm
        mode="edit"
        initialValues={initialValues}
        submitLabel="Save Changes"
        loading={saving}
        apiError={apiError}
        cancelHref={`/event/${id}`}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default EditEventPage;
