import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { CreateEventDocument } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import EventForm, { type EventFormValues } from "@/components/event/EventForm";
import PageHeader from "@/components/layout/PageHeader";
import { useToast } from "@/context/toast-context";
import strings from "@/translations/strings";

function CreateEventPage() {
  useDocumentTitle(strings.createEvent.documentTitle);

  const navigate = useNavigate();
  const toast = useToast();
  const [createEvent, { loading, error: apiError }] =
    useMutation(CreateEventDocument);

  const handleSubmit = async (values: EventFormValues) => {
    const startDateTime = new Date(`${values.startDate}T${values.startTime}`);
    const endDateTime =
      values.endDate && values.endTime
        ? new Date(`${values.endDate}T${values.endTime}`)
        : new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);

    try {
      const result = await createEvent({
        variables: {
          title: values.title,
          description: values.description || null,
          startTime: startDateTime,
          endTime: endDateTime,
          activity: values.activity!,
          skillLevel: values.skillLevel!,
          locationName: values.location?.name ?? "",
          locationAddressLine1: values.location?.addressLine1 ?? null,
          locationAddressLine2: values.location?.addressLine2 ?? null,
          locationCountryCode: values.location?.countryCode ?? null,
          locationRegion: values.location?.region ?? null,
          locationZipCode: values.location?.zipCode ?? null,
          locationLatitude: values.location?.latitude ?? null,
          locationLongitude: values.location?.longitude ?? null,
          maxParticipants: values.maxParticipants
            ? parseInt(values.maxParticipants)
            : null,
          minAge: values.minAge ? parseInt(values.minAge) : null,
          maxAge: values.maxAge ? parseInt(values.maxAge) : null,
          acceptedGenders: values.acceptedGenders,
          allowSpectators: values.allowSpectators,
        },
      });

      if (result.data?.createEvent?.event?.id) {
        toast.success(strings.toast.eventCreated);
        navigate(`/event/${result.data.createEvent.event.id}`);
      }
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  return (
    <div className="min-h-full shrink-0 flex flex-col">
      <PageHeader title={strings.createEvent.title} />

      <div className="w-full mx-auto max-w-3xl p-4">
        <EventForm
          mode="create"
          submitLabel={strings.createEvent.submit}
          loading={loading}
          apiError={apiError}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default CreateEventPage;
