import { useEffect, useRef, useState } from "react";
import { HiArrowRight, HiCheck, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import { formatError } from "@/utils/format-error";
import TextInput from "@/components/ui/TextInput";
import TextArea from "@/components/ui/TextArea";
import Dropdown from "@/components/ui/Dropdown";
import LocationAutocomplete, {
  type LocationData,
} from "@/components/ui/LocationAutocomplete";
import MultiChoice from "@/components/ui/MultiChoice";
import FormError from "@/components/ui/FormError";
import {
  ActivityKind,
  GenderNoPnts,
  SkillLevel,
} from "@/graphql/graphql-types";
import { enumToOptions } from "@/utils/enum-to-options";
import { validateEventForm } from "@/utils/validate-event-form";
import strings from "@/translations/strings";

export type EventFormValues = {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  activity: ActivityKind | null;
  skillLevel: SkillLevel | null;
  location: LocationData | null;
  maxParticipants: string;
  minAge: string;
  maxAge: string;
  acceptedGenders: GenderNoPnts[];
  allowSpectators: boolean;
};

const EMPTY: EventFormValues = {
  title: "",
  description: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  activity: null,
  skillLevel: null,
  location: null,
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

    const missing = validateEventForm(values, isCreate);
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
          label={strings.event.title}
          placeholder={strings.event.titlePlaceholder}
          value={values.title}
          onChange={(e) => set("title", e.target.value)}
          required
        />

        <TextArea
          label={strings.event.description}
          placeholder={strings.event.descriptionPlaceholder}
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
        />

        <div>
          <h3 className="text-sm font-medium mb-3">{strings.event.startTime}</h3>
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label={strings.event.date}
              type="date"
              value={values.startDate}
              onChange={(e) => set("startDate", e.target.value)}
              required
            />
            <TextInput
              label={strings.event.time}
              type="time"
              value={values.startTime}
              onChange={(e) => set("startTime", e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">{strings.event.endTime}</h3>
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label={strings.event.date}
              type="date"
              value={values.endDate}
              onChange={(e) => set("endDate", e.target.value)}
            />
            <TextInput
              label={strings.event.time}
              type="time"
              value={values.endTime}
              onChange={(e) => set("endTime", e.target.value)}
            />
          </div>
        </div>

        {isCreate && (
          <>
            <Dropdown
              label={strings.event.activity}
              value={values.activity}
              setValue={(v) => set("activity", v as ActivityKind | null)}
              options={enumToOptions(ActivityKind, "enums.activityKind")}
              placeholder={strings.event.selectActivity}
              required
            />

            <Dropdown
              label={strings.event.skillLevel}
              value={values.skillLevel}
              setValue={(v) => set("skillLevel", v as SkillLevel | null)}
              options={enumToOptions(SkillLevel, "enums.skillLevel")}
              placeholder={strings.event.selectSkillLevel}
              required
            />

            <LocationAutocomplete
              label={strings.event.location}
              placeholder={strings.event.locationPlaceholder}
              value={values.location}
              onChange={(v) => set("location", v)}
              required
            />
          </>
        )}

        <TextInput
          label={strings.event.maxParticipants}
          type="number"
          placeholder={strings.event.maxParticipantsPlaceholder}
          value={values.maxParticipants}
          onChange={(e) => set("maxParticipants", e.target.value)}
        />

        {isCreate && (
          <>
            <div>
              <h3 className="text-sm font-medium mb-3">
                {strings.event.ageConstraints}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label={strings.event.minAge}
                  type="number"
                  placeholder={strings.event.minAgePlaceholder}
                  value={values.minAge}
                  onChange={(e) => set("minAge", e.target.value)}
                />
                <TextInput
                  label={strings.event.maxAge}
                  type="number"
                  placeholder={strings.event.maxAgePlaceholder}
                  value={values.maxAge}
                  onChange={(e) => set("maxAge", e.target.value)}
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">
                {strings.event.allowedGenders}{" "}
                <span className="text-xs text-base-content/60">
                  {strings.event.leaveEmptyAll}
                </span>
              </h3>
              <MultiChoice
                options={enumToOptions(GenderNoPnts, "enums.genderNoPnts")}
                setValue={(v) => set("acceptedGenders", v as GenderNoPnts[])}
                value={values.acceptedGenders}
              />
            </div>

            <label className="flex items-center justify-between hover:cursor-pointer">
              <div>
                <h3 className="text-sm font-medium">{strings.event.allowSpectators}</h3>
                <p className="text-xs text-base-content/60">
                  {strings.event.allowSpectatorsDesc}
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
                {strings.event.coverImage}
              </label>
              <div className="border-2 border-dashed border-base-content/20 rounded-xl p-8 text-center hover:border-primary/50 transition cursor-not-allowed opacity-50">
                <HiPlus className="w-8 h-8 mx-auto mb-2 text-base-content/40" />
                <p className="text-sm text-base-content/60">
                  {strings.event.coverImageDesc}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {error && (
        <FormError
          ref={errorRef}
          message={error}
          title={
            userError
              ? undefined
              : isCreate
                ? strings.event.couldntCreate
                : strings.event.couldntSave
          }
        />
      )}

      <div className="flex flex-row gap-2">
        {cancelHref && (
          <Link to={cancelHref} className="btn btn-ghost rounded-2xl flex-1">
            {strings.common.cancel}
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
