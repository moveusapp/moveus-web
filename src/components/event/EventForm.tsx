import { useEffect, useRef, useState, type ReactNode } from "react";
import { HiArrowRight, HiCheck } from "react-icons/hi";
import {
  HiOutlinePencilSquare,
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlineUsers,
  HiOutlinePhoto,
  HiPhoto,
  HiXMark,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useImageSelect } from "@/hooks/use-image-select";
import Button from "@/components/ui/Button";
import { formatError } from "@/utils/format-error";
import TextInput from "@/components/ui/TextInput";
import TextArea from "@/components/ui/TextArea";
import Dropdown from "@/components/ui/Dropdown";
import SingleChoice from "@/components/ui/SingleChoice";
import LocationAutocomplete, {
  type LocationData,
} from "@/components/ui/LocationAutocomplete";
import MultiChoice from "@/components/ui/MultiChoice";
import FormError from "@/components/ui/FormError";
import FormSection from "@/components/ui/FormSection";
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
  endDate: string | undefined;
  endTime: string | undefined;
  activity: ActivityKind | null;
  skillLevel: SkillLevel | null;
  location: LocationData | null;
  maxParticipants: string;
  minAge: string;
  maxAge: string;
  acceptedGenders: GenderNoPnts[];
  allowSpectators: boolean;
  thumbnail: File | null;
};

const EMPTY: EventFormValues = {
  title: "",
  description: "",
  startDate: "",
  startTime: "",
  endDate: undefined,
  endTime: undefined,
  activity: null,
  skillLevel: null,
  location: null,
  maxParticipants: "",
  minAge: "",
  maxAge: "",
  acceptedGenders: [],
  allowSpectators: true,
  thumbnail: null,
};

function FieldGroupLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 text-sm font-medium text-base-content/70">{children}</p>
  );
}

type Props = {
  mode: "create" | "edit";
  initialValues?: Partial<EventFormValues>;
  /** Existing thumbnail URL to preview in edit mode. */
  initialThumbnailUrl?: string;
  submitLabel: string;
  loading: boolean;
  apiError?: unknown;
  cancelHref?: string;
  onSubmit: (values: EventFormValues) => Promise<void>;
};

function EventForm({
  mode,
  initialValues,
  initialThumbnailUrl,
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

  const {
    inputRef: thumbnailRef,
    file: thumbnailFile,
    previewUrl: thumbnailPreview,
    onSelect: onThumbnailSelect,
    clear: clearThumbnail,
  } = useImageSelect();
  const [existingThumbnailFailed, setExistingThumbnailFailed] = useState(false);

  const existingThumbnail =
    initialThumbnailUrl && !existingThumbnailFailed ? initialThumbnailUrl : null;
  const thumbnailSrc = thumbnailPreview ?? existingThumbnail;

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
    await onSubmit({ ...values, thumbnail: thumbnailFile });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-8">
        <FormSection
          icon={HiOutlinePencilSquare}
          title={strings.event.form.basicsTitle}
          description={strings.event.form.basicsDesc}
        >
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
        </FormSection>

        <FormSection
          divided
          icon={HiOutlineCalendarDays}
          title={strings.event.form.whenTitle}
          description={strings.event.form.whenDesc}
        >
          <div>
            <FieldGroupLabel>{strings.event.startTime}</FieldGroupLabel>
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
            <FieldGroupLabel>{strings.event.endTime}</FieldGroupLabel>
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
        </FormSection>

        {isCreate && (
          <FormSection
            divided
            icon={HiOutlineMapPin}
            title={strings.event.form.detailsTitle}
            description={strings.event.form.detailsDesc}
          >
            <Dropdown
              label={strings.event.activity}
              value={values.activity}
              setValue={(v) => set("activity", v as ActivityKind | null)}
              options={enumToOptions(ActivityKind, "enums.activityKind")}
              placeholder={strings.event.selectActivity}
              required
            />

            <SingleChoice
              variant="chips"
              label={strings.event.skillLevel}
              value={values.skillLevel}
              setValue={(v) => set("skillLevel", v)}
              options={enumToOptions(SkillLevel, "enums.skillLevel")}
            />

            <LocationAutocomplete
              label={strings.event.location}
              placeholder={strings.event.locationPlaceholder}
              value={values.location}
              onChange={(v) => set("location", v)}
              required
            />
          </FormSection>
        )}

        <FormSection
          divided
          icon={HiOutlineUsers}
          title={strings.event.form.whoTitle}
          description={
            isCreate
              ? strings.event.form.whoDesc
              : strings.event.form.whoDescEdit
          }
        >
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
                <FieldGroupLabel>
                  {strings.event.ageConstraints}
                </FieldGroupLabel>
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

              <MultiChoice
                label={strings.event.allowedGenders}
                helperText={strings.event.leaveEmptyAll}
                options={enumToOptions(GenderNoPnts, "enums.genderNoPnts")}
                setValue={(v) => set("acceptedGenders", v)}
                value={values.acceptedGenders}
              />

              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-base-content/20 px-4 py-3 transition-colors hover:border-primary/40">
                <div>
                  <p className="text-sm font-medium">
                    {strings.event.allowSpectators}
                  </p>
                  <p className="text-xs text-base-content/60">
                    {strings.event.allowSpectatorsDesc}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={values.allowSpectators}
                  className="toggle toggle-primary shrink-0"
                  onChange={(e) => set("allowSpectators", e.target.checked)}
                />
              </label>
            </>
          )}
        </FormSection>

        <FormSection
          divided
          icon={HiOutlinePhoto}
          title={strings.event.coverImage}
          description={strings.event.form.coverDesc}
        >
          {thumbnailSrc ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-base-300">
              <img
                src={thumbnailSrc}
                alt={strings.event.coverImagePreviewAlt}
                onError={() => {
                  if (!thumbnailPreview) setExistingThumbnailFailed(true);
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => thumbnailRef.current?.click()}
                className="btn btn-sm absolute bottom-2.5 right-2.5 rounded-full shadow-md"
              >
                <HiPhoto className="h-4 w-4" />
                {strings.event.changeCoverImage}
              </button>
              {thumbnailPreview && (
                <button
                  type="button"
                  onClick={clearThumbnail}
                  aria-label={strings.event.removeCoverImageAria}
                  className="btn btn-sm btn-circle btn-error absolute right-2.5 top-2.5 shadow-md"
                >
                  <HiXMark className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => thumbnailRef.current?.click()}
              className="flex aspect-video w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-base-content/20 text-center transition-colors hover:border-primary/50 hover:bg-primary/5"
            >
              <HiOutlinePhoto className="mb-2 h-8 w-8 text-base-content/40" />
              <span className="text-sm font-medium text-base-content/70">
                {strings.event.addCoverImage}
              </span>
              <span className="mt-0.5 text-xs text-base-content/50">
                {strings.event.coverImageDesc}
              </span>
            </button>
          )}

          <input
            type="file"
            accept="image/*"
            ref={thumbnailRef}
            onChange={onThumbnailSelect}
            className="hidden"
          />
        </FormSection>
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

      <div className="sticky bottom-0 z-10 -mx-4 flex gap-2 border-t border-base-300 bg-base-100/85 px-4 py-4 backdrop-blur-md sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
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
