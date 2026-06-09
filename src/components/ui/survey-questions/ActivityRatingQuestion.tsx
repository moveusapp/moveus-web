import { useState } from "react";
import { HiPlus, HiSearch, HiX } from "react-icons/hi";
import { enumToOptions } from "@/utils/enum-to-options";
import { chipClass } from "../choice-styles";
import SingleChoice from "../SingleChoice";
import strings from "@/translations/strings";
import type { ActivityRatingValue } from "@/surveys/types";

interface Props {
  activityEnum: Record<string, string>;
  activityNamespace: string;
  skillEnum: Record<string, string>;
  skillNamespace: string;
  value: ActivityRatingValue[];
  onChange: (value: ActivityRatingValue[]) => void;
}

function ActivityRatingQuestion({
  activityEnum,
  activityNamespace,
  skillEnum,
  skillNamespace,
  value,
  onChange,
}: Props) {
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const activityOptions = enumToOptions(activityEnum, activityNamespace);
  const skillOptions = enumToOptions(skillEnum, skillNamespace);
  const defaultSkill = skillOptions[0]?.value ?? "";

  const labelFor = (activity: string) =>
    activityOptions.find((o) => o.value === activity)?.label ?? activity;

  // Reading order, not tap order, so the pinned list stays stable as
  // activities are toggled.
  const selectedEntries = activityOptions
    .map((o) => value.find((v) => v.activity === o.value))
    .filter((v): v is ActivityRatingValue => Boolean(v));

  const selectedValues = new Set(value.map((v) => v.activity));
  const q = query.trim().toLowerCase();

  const browseItems = activityOptions.filter(
    (o) =>
      !selectedValues.has(o.value) &&
      (!q || o.label.toLowerCase().includes(q)),
  );

  const addActivity = (activity: string) =>
    onChange([...value, { activity, skillLevel: defaultSkill }]);

  const removeActivity = (activity: string) =>
    onChange(value.filter((v) => v.activity !== activity));

  const setSkill = (activity: string, skillLevel: string) =>
    onChange(
      value.map((v) => (v.activity === activity ? { ...v, skillLevel } : v)),
    );

  return (
    <div className="flex flex-col gap-5">
      <div
        className={`relative rounded-2xl border bg-base-100 transition-colors duration-150 ${
          searchFocused ? "border-primary" : "border-base-content/20"
        }`}
      >
        <HiSearch
          className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-lg ${
            searchFocused ? "text-primary" : "text-base-content/40"
          }`}
          aria-hidden
        />
        <input
          type="text"
          value={query}
          placeholder={strings.survey.preferences.activitiesSearchPlaceholder}
          aria-label={strings.common.search}
          className="w-full h-12 pl-11 pr-11 bg-transparent rounded-2xl text-base focus:outline-none"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label={strings.common.close}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full text-base-content/50 hover:bg-base-300 hover:text-base-content transition-colors duration-150"
          >
            <HiX className="text-base" />
          </button>
        )}
      </div>

      {selectedEntries.length > 0 && (
        <section className="flex flex-col gap-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
            {strings.survey.preferences.activitiesSelectedTitle}
            <span className="ml-1.5 text-base-content/35 tabular-nums">
              {selectedEntries.length}
            </span>
          </h3>
          {selectedEntries.map((entry) => (
            <div
              key={entry.activity}
              className="animate-survey-question flex flex-col gap-2.5 p-3 rounded-2xl bg-base-200"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium truncate">
                  {labelFor(entry.activity)}
                </span>
                <button
                  type="button"
                  onClick={() => removeActivity(entry.activity)}
                  aria-label={`${strings.common.remove} ${labelFor(entry.activity)}`}
                  className="shrink-0 flex items-center justify-center w-9 h-9 -mr-1 rounded-full text-base-content/45 hover:bg-base-300 hover:text-error transition-colors duration-150"
                >
                  <HiX className="text-lg" />
                </button>
              </div>
              <SingleChoice
                variant="chips"
                ariaLabel={labelFor(entry.activity)}
                value={entry.skillLevel}
                setValue={(v) => setSkill(entry.activity, v)}
                options={skillOptions}
              />
            </div>
          ))}
        </section>
      )}

      {browseItems.length > 0 ? (
        <section className="flex flex-col gap-2.5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
            {strings.survey.preferences.activitiesBrowseTitle}
            <span className="ml-1.5 text-base-content/35 tabular-nums">
              {browseItems.length}
            </span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {browseItems.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => addActivity(option.value)}
                className={chipClass(false)}
              >
                <HiPlus className="text-base shrink-0 opacity-60" />
                {option.label}
              </button>
            ))}
          </div>
        </section>
      ) : (
        q && (
          <p className="text-center text-base-content/50 py-8">
            {strings.survey.preferences.activitiesEmpty}
          </p>
        )
      )}
    </div>
  );
}

export default ActivityRatingQuestion;
