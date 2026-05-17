import { useEffect, useRef, useState } from "react";
import { HiArrowRight, HiCheck, HiPlus } from "react-icons/hi";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import { formatError } from "@/utils/format-error";
import TextInput from "@/components/ui/TextInput";
import TextArea from "@/components/ui/TextArea";
import Dropdown from "@/components/ui/Dropdown";
import MultiChoice from "@/components/ui/MultiChoice";
import {
  ActivityKind,
  GenderNoPnts,
  SkillLevel,
} from "@/graphql/graphql-types";
import { enumToOptions } from "@/utils/enum-to-options";

export type EventFormValues = {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  activity: ActivityKind | null;
  skillLevel: SkillLevel | null;
  location: string;
  maxParticipants: string;
  minAge: string;
  maxAge: string;
  acceptedGenders: GenderNoPnts[];
  allowSpectators: boolean;
};

function validate(values: EventFormValues, isCreate: boolean): string | null {
  if (!values.title.trim()) return "Give your event a title.";
  if (!values.startDate || !values.startTime)
    return "Pick a start date and time.";
  if (isCreate) {
    if (!values.activity) return "Pick an activity.";
    if (!values.skillLevel) return "Pick a skill level.";
    if (!values.location.trim()) return "Add a location.";
  }
  return null;
}

const EMPTY: EventFormValues = {
  title: "",
  description: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  activity: null,
  skillLevel: null,
  location: "",
  maxParticipants: "",
  minAge: "",
  maxAge: "",
  acceptedGenders: [],
  allowSpectators: true,
};

type Props = {
  mode: "create" | "edit";
  initialValues?: Partial<EventFormValues>;
  submitLabel: string;
  loading: boolean;
  apiError?: unknown;
  cancelHref?: string;
  onSubmit: (values: EventFormValues) => Promise<void>;
};

function EventForm({
  mode,
  initialValues,
  submitLabel,
  loading,
  apiError,
  cancelHref,
  onSubmit,
}: Props) {
  const [values, setValues] = useState<EventFormValues>({
    ...EMPTY,
    ...initialValues,
  });
  const [userError, setUserError] = useState("");
  const errorRef = useRef<HTMLDivElement | null>(null);

  const apiErrorMessage = formatError(apiError);
  const error = userError || apiErrorMessage;

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [error]);

  const set = <K extends keyof EventFormValues>(
    key: K,
    value: EventFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (userError) setUserError("");
  };

  const isCreate = mode === "create";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const missing = validate(values, isCreate);
    if (missing) {
      setUserError(missing);
      return;
    }

    setUserError("");
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-base-200 border border-base-300 rounded-2xl p-6 space-y-6">
        <TextInput
          label="Title"
          placeholder="e.g., Saturday Morning Basketball"
          value={values.title}
          onChange={(e) => set("title", e.target.value)}
          required
        />

        <TextArea
          label="Description"
          placeholder="Tell people what your event is about..."
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
        />

        <div>
          <h3 className="text-sm font-medium mb-3">Start Time</h3>
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Date"
              type="date"
              value={values.startDate}
              onChange={(e) => set("startDate", e.target.value)}
              required
            />
            <TextInput
              label="Time"
              type="time"
              value={values.startTime}
              onChange={(e) => set("startTime", e.target.value)}
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
              value={values.endDate}
              onChange={(e) => set("endDate", e.target.value)}
            />
            <TextInput
              label="Time"
              type="time"
              value={values.endTime}
              onChange={(e) => set("endTime", e.target.value)}
            />
          </div>
        </div>

        {isCreate && (
          <>
            <Dropdown
              label="Activity"
              value={values.activity}
              setValue={(v) => set("activity", v as ActivityKind | null)}
              options={enumToOptions(ActivityKind) as any}
              placeholder="Select an activity"
              required
            />

            <Dropdown
              label="Skill Level"
              value={values.skillLevel}
              setValue={(v) => set("skillLevel", v as SkillLevel | null)}
              options={enumToOptions(SkillLevel) as any}
              placeholder="Select skill level"
              required
            />

            <TextInput
              label="Location"
              placeholder="e.g., Rijeka, Zabica 41000"
              value={values.location}
              onChange={(e) => set("location", e.target.value)}
              required
            />
          </>
        )}

        <TextInput
          label="Max Participants"
          type="number"
          placeholder="Leave empty for unlimited"
          value={values.maxParticipants}
          onChange={(e) => set("maxParticipants", e.target.value)}
        />

        {isCreate && (
          <>
            <div>
              <h3 className="text-sm font-medium mb-3">
                Age Constraints (Optional)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="Min Age"
                  type="number"
                  placeholder="e.g., 18"
                  value={values.minAge}
                  onChange={(e) => set("minAge", e.target.value)}
                />
                <TextInput
                  label="Max Age"
                  type="number"
                  placeholder="e.g., 65"
                  value={values.maxAge}
                  onChange={(e) => set("maxAge", e.target.value)}
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
                setValue={(v) => set("acceptedGenders", v as GenderNoPnts[])}
                value={values.acceptedGenders}
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
                checked={values.allowSpectators}
                className="checkbox"
                onChange={(e) => set("allowSpectators", e.target.checked)}
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
          </>
        )}
      </div>

      {error && (
        <div
          ref={errorRef}
          role="alert"
          aria-live="polite"
          className="flex items-start gap-3 rounded-2xl border border-error/30 bg-error/10 p-4 text-sm text-error"
        >
          <HiOutlineExclamationTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          {userError ? (
            <p>{error}</p>
          ) : (
            <div className="space-y-0.5">
              <p className="font-medium">
                {isCreate
                  ? "Couldn't create your event"
                  : "Couldn't save your changes"}
              </p>
              <p className="text-error/80">{error}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-row gap-2">
        {cancelHref && (
          <Link to={cancelHref} className="btn btn-ghost rounded-2xl flex-1">
            Cancel
          </Link>
        )}
        <Button
          type="submit"
          loading={loading}
          className={`btn-primary ${cancelHref ? "flex-1" : "w-full"}`}
        >
          <div className="flex flex-row items-center gap-2">
            {submitLabel}
            {isCreate ? (
              <HiArrowRight className="w-4 h-4" />
            ) : (
              <HiCheck className="w-4 h-4" />
            )}
          </div>
        </Button>
      </div>
    </form>
  );
}

export default EventForm;
