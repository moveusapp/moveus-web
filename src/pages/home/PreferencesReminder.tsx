import { Link } from "react-router-dom";
import { HiArrowRight, HiXMark } from "react-icons/hi2";
import { useProfile } from "@/context/profile-context";
import useSessionDismissed from "@/hooks/use-session-dismissed";
import duckDefault from "@/assets/duck/duck-default.svg";
import strings from "@/translations/strings";

/**
 * Nudges users who skipped the preferences survey to fill it in. Shown only
 * while `profile.preferences` is unset, so it disappears the moment the survey
 * is completed. Dismissal is session-only (matches FeedbackReminder); the
 * permanent way in lives in Settings.
 */
function PreferencesReminder() {
  const { profile } = useProfile();
  const [dismissed, dismiss] = useSessionDismissed("preferences-reminder");

  if (dismissed || !profile || profile.preferences) return null;

  return (
    <section className="relative rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
      <button
        type="button"
        onClick={dismiss}
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
