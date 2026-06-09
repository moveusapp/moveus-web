import { useProfile } from "@/context/profile-context";
import useSessionDismissed from "@/hooks/use-session-dismissed";
import PreferencesReminder from "./PreferencesReminder";
import FeedbackReminder from "./FeedbackReminder";

/**
 * Shows at most one home nudge at a time so the top of the feed never stacks
 * competing cards. Preferences setup takes priority; once it's set (or the nudge
 * is dismissed) the feedback prompt takes over. FeedbackReminder still owns its
 * own query and dismissal, and renders null when there's nothing to rate.
 */
function HomeReminders() {
  const { profile } = useProfile();
  const [prefsDismissed, dismissPrefs] = useSessionDismissed(
    "preferences-reminder",
  );

  const showPreferences =
    !!profile && !profile.preferences && !prefsDismissed;

  if (showPreferences) {
    return <PreferencesReminder onDismiss={dismissPrefs} />;
  }

  return <FeedbackReminder />;
}

export default HomeReminders;
