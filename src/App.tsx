import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./components/routes/ProtectedRoutes";
import { NavRoutes } from "./components/routes/nav/NavRoutes";
import { AuthRoutes } from "./components/routes/AuthRoutes";
import LandingPage from "./pages/start/LandingPage";

// LandingPage stays eager — it's the unauthenticated entry point and lazy-loading
// it would add a blank flash on first visit.
const HomePage = lazy(() => import("./pages/home/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const VerifyEmailPage = lazy(() => import("./pages/VerifyEmailPage"));
const SurveyPage = lazy(() => import("./pages/survey/SurveyPage"));
const ProfileRedirect = lazy(() => import("./pages/user/ProfileRedirect"));
const SettingsPage = lazy(() => import("./pages/settings/SettingsPage"));
const EventPage = lazy(() => import("./pages/event/EventPage"));
const UserPage = lazy(() => import("./pages/user/UserPage"));
const ChatPage = lazy(() => import("./pages/chat/ChatPage"));
const NotificationsPage = lazy(() => import("./pages/notifications/NotificationsPage"));
const SearchPage = lazy(() => import("./pages/search/SearchPage"));
const CreateEventPage = lazy(() => import("./pages/create-event/CreateEventPage"));
const EditEventPage = lazy(() => import("./pages/edit-event/EditEventPage"));
const WelcomePage = lazy(() => import("./pages/onboarding/WelcomePage"));
const CalendarPage = lazy(() => import("./pages/calendar/CalendarPage"));
const PostPage = lazy(() => import("./pages/post/PostPage"));
const InfoPageLayout = lazy(() => import("./pages/info/InfoPageLayout"));
const AboutPage = lazy(() => import("./pages/info/AboutPage"));
const TermsPage = lazy(() => import("./pages/info/TermsPage"));
const PrivacyPage = lazy(() => import("./pages/info/PrivacyPage"));
const CookiesPage = lazy(() => import("./pages/info/CookiesPage"));

function App() {
  return (
    <main>
      <Router>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<InfoPageLayout />}>
              <Route path="/about" element={<AboutPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route element={<NavRoutes />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/profile" element={<ProfileRedirect />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/calendar" element={<CalendarPage />} />

                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/create-event" element={<CreateEventPage />} />
                <Route path="/event/:eventId/edit" element={<EditEventPage />} />
              </Route>
              <Route path="/survey/:id" element={<SurveyPage />} />
              <Route path="/welcome" element={<WelcomePage />} />
            </Route>
            <Route element={<NavRoutes />}>
              <Route path="/user/:username" element={<UserPage />} />
              <Route path="/event/:eventId" element={<EventPage />} />
              <Route path="/post/:postId" element={<PostPage />} />
            </Route>
            <Route element={<AuthRoutes />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </main>
  );
}

export default App;
