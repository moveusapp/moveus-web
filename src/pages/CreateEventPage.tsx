import { ChangeEvent, useCallback, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import TextArea from "@/components/input/TextArea";
import TextInput from "@/components/input/TextInput";
import BackButton from "@/components/routes/BackButton";
import useDocumentTitle from "@/hooks/use-document-title";
import { IoCalendarClearOutline } from "react-icons/io5";
import "@/styles/date-time-picker.css";
import Dropdown from "@/components/input/Dropdown";
import {
  Activity,
  GenderNoPnts,
  SkillLevel,
  CreateEventDocument,
} from "@/graphql/graphql-types";
import { useMutation } from "@apollo/client/react";
import { enumToOptions } from "@/utils/enum-to-options";
import LocationPicker from "@/components/input/LocationPicker";
import MultiChoice from "@/components/input/MultiChoice";
import Toggle from "@/components/input/Toggle";
import HashLoader from "react-spinners/HashLoader";
import { LOADER_COLOR } from "@/constants";
import { useNavigate } from "react-router-dom";

interface TextFields {
  title: string;
  description: string | null;
}

interface NumberFields {
  minAge: number | null;
  maxAge: number | null;
  maxParticipants: number | null;
}

function CreateEventPage() {
  useDocumentTitle("Create event");

  const [textFields, setTextFields] = useState<TextFields>({
    title: "",
    description: null,
  });

  const [numberFields, setNumberFields] = useState<NumberFields>({
    minAge: null,
    maxAge: null,
    maxParticipants: null,
  });

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [activity, setActivity] = useState<Activity | null>(null);
  const [skillLevel, setSkillLevel] = useState<SkillLevel | null>(null);
  const [location, setLocation] = useState<LocationCoordinates | null>(null);
  const [acceptedGenders, setAcceptedGenders] = useState<GenderNoPnts[]>([]);
  const [allowSpectators, setAllowSpectators] = useState(true);

  const onTextFieldsChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.currentTarget;
      setTextFields((p) => {
        return {
          ...p,
          [name]: value ? value : null,
        };
      });
    },
    [setTextFields],
  );

  const onNumberFieldsChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.currentTarget;
      const parsed = value ? parseInt(value) : null;
      if (!Number.isNaN(parsed))
        setNumberFields((p) => {
          return {
            ...p,
            [name]: parsed,
          };
        });
    },
    [setNumberFields],
  );

  const navigate = useNavigate();

  const [createEvent, { loading, error }] = useMutation(CreateEventDocument);

  const onCreateEvent = useCallback(() => {
    if (!activity || !skillLevel || !location) return;
    createEvent({
      variables: {
        ...textFields,
        ...numberFields,
        startTime,
        endTime,
        activity,
        skillLevel,
        locationLatitude: location.lat,
        locationLongitude: location.lng,
        acceptedGenders,
        allowSpectators,
      },
    })
      .then((result) => {
        navigate(`/event/${result.data?.createEvent?.event?.id}`);
      })
      .catch((err) => {});
  }, [
    createEvent,
    navigate,
    textFields,
    numberFields,
    startTime,
    endTime,
    activity,
    skillLevel,
    location,
    allowSpectators,
    acceptedGenders,
  ]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center my-8 text-3xl gap-4 shrink-0">
        <BackButton />
        <h2>Create Event</h2>
      </div>
      <div className="grow overflow-y-auto pb-8">
        <h4 className="m-0">Title</h4>
        <TextInput
          name="title"
          value={textFields.title ?? ""}
          placeholder="title (required)"
          onChange={onTextFieldsChange}
        />

        <h4>Description</h4>
        <TextArea
          name="description"
          value={textFields.description ?? ""}
          placeholder="description"
          onChange={onTextFieldsChange}
        />

        <div className="flex md:gap-4 flex-col md:flex-row md:*:grow w-full">
          <div>
            <h4>Start time</h4>
            <DateTimePicker
              onChange={setStartTime as any}
              value={startTime}
              locale="en-GB"
              minDate={new Date()}
              clearIcon={null}
              calendarIcon={<IoCalendarClearOutline className="text-xl" />}
              disableClock
            />
          </div>
          <div>
            <h4>End time</h4>
            <DateTimePicker
              onChange={setEndTime as any}
              value={endTime}
              locale="en-GB"
              minDate={new Date()}
              clearIcon={null}
              calendarIcon={<IoCalendarClearOutline className="text-xl" />}
              disableClock
            />
          </div>
        </div>

        <div className="flex justify-between items-end">
          <h4>Activity</h4>
          <Dropdown
            value={activity}
            setValue={setActivity}
            options={enumToOptions(Activity) as any}
            defaultName="Activity"
            classname="text-xl"
          />
        </div>

        <div className="flex justify-between items-end">
          <h4>Skill level</h4>
          <Dropdown
            value={skillLevel}
            setValue={setSkillLevel}
            options={enumToOptions(SkillLevel) as any}
            defaultName="Skill level"
            classname="text-xl"
          />
        </div>

        <h4>Location</h4>
        <LocationPicker
          location={location}
          setLocation={setLocation}
          classname="h-20"
        />

        <h4>Constraints (optional)</h4>
        <div className="flex gap-4">
          <TextInput
            name="minAge"
            value={numberFields.minAge?.toString() ?? ""}
            placeholder="min age"
            onChange={onNumberFieldsChange}
          />
          <TextInput
            name="maxAge"
            value={numberFields.maxAge?.toString() ?? ""}
            placeholder="max age"
            onChange={onNumberFieldsChange}
          />
        </div>
        <TextInput
          name="maxParticipants"
          value={numberFields.maxParticipants?.toString() ?? ""}
          placeholder="max participants"
          onChange={onNumberFieldsChange}
          className="my-2"
        />
        <h5 className="mb-2">
          Allowed genders{" "}
          <span className="text-sm">(leave empty to allow all)</span>
        </h5>
        <MultiChoice
          options={enumToOptions(GenderNoPnts) as any}
          setValue={setAcceptedGenders}
          value={acceptedGenders}
        />

        <div className="flex justify-between items-end">
          <h4>Allow spectators</h4>
          <Toggle
            defaultValue={true}
            onToggleChanged={(value) => setAllowSpectators(value)}
          />
        </div>
      </div>
      {error && (
        <p className="text-error text-right self-right mb-4 mt-2">
          {error.message}
        </p>
      )}
      {loading ? (
        <HashLoader className="mx-auto mt-8" color={LOADER_COLOR} />
      ) : (
        <button className="mb-8 shrink-0" onClick={onCreateEvent}>
          Create Event
        </button>
      )}
    </div>
  );
}

export default CreateEventPage;
