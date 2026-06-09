import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { CreateEventDocument } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import EventForm, { type EventFormValues } from "@/components/event/EventForm";
import PageHeader from "@/components/layout/PageHeader";
import { useToast } from "@/context/toast-context";
import { uploadWithTicket } from "@/utils/upload";
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
          withPicture: !!values.thumbnail,
          contentType: values.thumbnail?.type,
        },
      });

      const event = result.data?.createEvent?.event;
      if (event?.id) {
        let imageFailed = false;
        if (values.thumbnail && event.imageUpload) {
          try {
            await uploadWithTicket(event.imageUpload, values.thumbnail);
          } catch {
            imageFailed = true;
          }
        }

        if (imageFailed) {
          toast.info(strings.toast.eventCreatedNoPhoto);
        } else {
          toast.success(strings.toast.eventCreated);
        }
        navigate(`/event/${event.id}`);
      }
    } catch {
      // Errors surface inline via EventForm's apiError prop.
    }
  };

  return (
    <div className="min-h-full shrink-0 flex flex-col">
      <div className="w-full max-w-3xl">
        <PageHeader title={strings.createEvent.title} />

        <div className="px-4 py-6 sm:px-6">
          <EventForm
            mode="create"
            submitLabel={strings.createEvent.submit}
            loading={loading}
            apiError={apiError}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateEventPage;
