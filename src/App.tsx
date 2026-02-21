import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./components/routes/ProtectedRoutes";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import { NavRoutes } from "./components/routes/nav/NavRoutes";
import ProfileRedirect from "./pages/user/ProfileRedirect";
import SettingsPage from "./pages/settings/SettingsPage";
import CreateEventPage from "./pages/create-event/CreateEventPage";
import EventPage from "./pages/event/EventPage";
import CreatePostPage from "./pages/create-post/CreatePostPost";
import UserPage from "./pages/user/UserPage";
import ChatListPage from "./pages/chat/MessagesPage";
import ChatPage from "./pages/chat/ChatPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import SearchPage from "./pages/search/SearchPage";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route element={<NavRoutes />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/chat" element={<ChatListPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile" element={<ProfileRedirect />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/chat/:userId" element={<ChatPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route path="/profile-setup" element={<ProfileSetupPage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/create-post/:eventId" element={<CreatePostPage />} />
          </Route>
          <Route element={<NavRoutes />}>
            <Route path="/user/:userId" element={<UserPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/event/:eventId" element={<EventPage />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
