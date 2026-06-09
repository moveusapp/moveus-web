import { Link } from "react-router-dom";
import { HiArrowRight, HiXMark } from "react-icons/hi2";
import duckDefault from "@/assets/duck/duck-default.svg";
import strings from "@/translations/strings";

/**
 * Nudges users who skipped the preferences survey to fill it in. Visibility and
 * priority (vs the feedback prompt) are owned by HomeReminders; this component
 * is purely presentational and calls `onDismiss` when closed.
 */
function PreferencesReminder({ onDismiss }: { onDismiss: () => void }) {
  return (
    <section className="relative rounded-2xl bg-primary/5 p-4">
      <button
        type="button"
        onClick={onDismiss}
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content/60"
        aria-label={strings.home.dismissPreferencesAria}
      >
        <HiXMark className="h-4 w-4" />
      </button>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        <img
          src={duckDefault}
          alt=""
          className="h-16 w-auto shrink-0 -rotate-3 select-none self-start sm:self-end"
          draggable={false}
        />
        <div className="min-w-0 flex-1 pr-6 sm:pr-0">
          <h2 className="text-base font-bold leading-snug text-base-content text-balance">
            {strings.home.preferencesTitle}
          </h2>
          <p className="mt-0.5 text-sm text-base-content/70">
            {strings.home.preferencesBody}
          </p>
        </div>
        <Link
          to="/survey/preferences"
          className="btn btn-primary btn-arrow w-full shrink-0 gap-2 sm:w-auto"
        >
          {strings.home.preferencesCta}
          <HiArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default PreferencesReminder;
