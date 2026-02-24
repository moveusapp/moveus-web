import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { HiPlus, HiArrowRight, HiX } from "react-icons/hi";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import TextArea from "@/components/ui/TextArea";
import Dropdown from "@/components/ui/Dropdown";
import LocationPicker from "@/components/ui/LocationPicker";
import MultiChoice from "@/components/ui/MultiChoice";
import {
  Activity,
  GenderNoPnts,
  SkillLevel,
  CreateEventDocument,
} from "@/graphql/graphql-types";
import { enumToOptions } from "@/utils/enum-to-options";
import useDocumentTitle from "@/hooks/use-document-title";

function CreateEventPage() {
  useDocumentTitle("Create Event");

  const navigate = useNavigate();
  const [createEvent, { loading, error: apiError }] =
    useMutation(CreateEventDocument);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [activity, setActivity] = useState<Activity | null>(null);
  const [skillLevel, setSkillLevel] = useState<SkillLevel | null>(null);
  const [location, setLocation] = useState<LocationCoordinates | null>(null);
  const [maxParticipants, setMaxParticipants] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [acceptedGenders, setAcceptedGenders] = useState<GenderNoPnts[]>([]);
  const [allowSpectators, setAllowSpectators] = useState(true);
  const [userError, setUserError] = useState("");

  const getError = () => {
    if (apiError) return apiError.message;
    return userError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!activity || !skillLevel || !location || !startDate || !startTime) {
      setUserError("You haven't filled out all fields.");
      return;
    }

    setUserError("");

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime =
      endDate && endTime
        ? new Date(`${endDate}T${endTime}`)
        : new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // Default: 2 hours later

    try {
      const result = await createEvent({
        variables: {
          title,
          description: description || null,
          startTime: startDateTime,
          endTime: endDateTime,
          activity,
          skillLevel,
          locationLatitude: location.lat,
          locationLongitude: location.lng,
          maxParticipants: maxParticipants ? parseInt(maxParticipants) : null,
          minAge: minAge ? parseInt(minAge) : null,
          maxAge: maxAge ? parseInt(maxAge) : null,
          acceptedGenders,
          allowSpectators,
        },
      });

      if (result.data?.createEvent?.event?.id) {
        navigate(`/event/${result.data.createEvent.event.id}`);
      }
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  return (
    <div className="w-full mx-auto max-w-3xl p-4">
      <h1 className="font-medium text-xl mb-4">Create Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-base-200 border border-base-300 rounded-2xl p-6 space-y-6">
          <TextInput
            label="Title"
            placeholder="e.g., Saturday Morning Basketball"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextArea
            label="Description"
            placeholder="Tell people what your event is about..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div>
            <h3 className="text-sm font-medium mb-3">Start Time</h3>
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
              <TextInput
                label="Time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">End Time (Optional)</h3>
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <TextInput
                label="Time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <Dropdown
            label="Activity"
            value={activity}
            setValue={setActivity}
            options={enumToOptions(Activity) as any}
            placeholder="Select an activity"
            required
          />

          <Dropdown
            label="Skill Level"
            value={skillLevel}
            setValue={setSkillLevel}
            options={enumToOptions(SkillLevel) as any}
            placeholder="Select skill level"
            required
          />

          <div>
            <label className="text-sm font-medium mb-2 block">Location</label>
            <LocationPicker
              location={location}
              setLocation={setLocation}
              classname="h-48 rounded-xl"
            />
          </div>

          <TextInput
            label="Max Participants"
            type="number"
            placeholder="Leave empty for unlimited"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
          />

          <div>
            <h3 className="text-sm font-medium mb-3">
              Age Constraints (Optional)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Min Age"
                type="number"
                placeholder="e.g., 18"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
              />
              <TextInput
                label="Max Age"
                type="number"
                placeholder="e.g., 65"
                value={maxAge}
                onChange={(e) => setMaxAge(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">
              Allowed Genders{" "}
              <span className="text-xs text-base-content/60">
                (leave empty to allow all)
              </span>
            </h3>
            <MultiChoice
              options={enumToOptions(GenderNoPnts) as any}
              setValue={setAcceptedGenders}
              value={acceptedGenders}
            />
          </div>

          <label className="flex items-center justify-between hover:cursor-pointer">
            <div>
              <h3 className="text-sm font-medium">Allow Spectators</h3>
              <p className="text-xs text-base-content/60">
                Allow people to watch without participating
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="checkbox"
              onChange={(e) => {
                setAllowSpectators(e.target.checked);
              }}
            />
          </label>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Cover Image (Coming Soon)
            </label>
            <div className="border-2 border-dashed border-base-content/20 rounded-xl p-8 text-center hover:border-primary/50 transition cursor-not-allowed opacity-50">
              <HiPlus className="w-8 h-8 mx-auto mb-2 text-base-content/40" />
              <p className="text-sm text-base-content/60">
                Image upload coming soon
              </p>
            </div>
          </div>
        </div>

        {getError() && (
          <div
            role="alert"
            className="alert alert-error text-sm text-error bg-error/10 rounded-2xl"
          >
            <HiX />
            <p>{getError()}</p>
          </div>
        )}

        <Button
          type="submit"
          loading={loading}
          className="btn-primary w-full"
        >
          <div className="flex flex-row items-center gap-2">
            Create Event
            <HiArrowRight className="w-4 h-4" />
          </div>
        </Button>
      </form>
    </div>
  );
}

export default CreateEventPage;
