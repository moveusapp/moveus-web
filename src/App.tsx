import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./components/routes/ProtectedRoutes";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SurveyPage from "./pages/survey/SurveyPage";
import { NavRoutes } from "./components/routes/nav/NavRoutes";
import ProfileRedirect from "./pages/user/ProfileRedirect";
import SettingsPage from "./pages/settings/SettingsPage";
import EventPage from "./pages/event/EventPage";
import UserPage from "./pages/user/UserPage";
import ChatPage from "./pages/chat/ChatPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import SearchPage from "./pages/search/SearchPage";
import { AuthRoutes } from "./components/routes/AuthRoutes";
import CreateEventPage from "./pages/create-event/CreateEventPage";
import EditEventPage from "./pages/edit-event/EditEventPage";
import LandingPage from "./pages/start/LandingPage";
import WelcomePage from "./pages/onboarding/WelcomePage";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<NavRoutes />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile" element={<ProfileRedirect />} />
              <Route path="/notifications" element={<NotificationsPage />} />

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
          </Route>
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
