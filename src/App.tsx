import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import { UserProvider } from "./context/profile-context";
import WelcomePage from "./pages/WelcomePage";
import { ProtectedRoutes } from "./components/routes/ProtectedRoutes";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import { NavRoutes } from "./components/routes/NavRoutes";
import ProfilePage from "./pages/profile/ProfilePage";
import SettingsPage from "./pages/settings/SettingsPage";
import CreateEventPage from "./pages/create-event/CreateEventPage";
import EventPage from "./pages/event/EventPage";
import CreatePostPage from "./pages/create-post/CreatePostPost";
import UserPage from "./pages/user/UserPage";
import ChatListPage from "./pages/chat/ChatListPage";
import HeaderRoutes from "./components/routes/HeaderRoutes";
import ChatPage from "./pages/chat/ChatPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import SearchPage from "./pages/search/SearchPage";
import FeedPage from "./pages/feed/FeedPage";

function App() {
  return (
    <UserProvider>
      <main>
        <Router>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route element={<NavRoutes />}>
                <Route element={<HeaderRoutes />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/chat" element={<ChatListPage />} />
                  <Route path="/feed" element={<FeedPage />} />
                </Route>
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              <Route path="/profile-setup" element={<ProfileSetupPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/create-event" element={<CreateEventPage />} />
              <Route path="/chat/:userId" element={<ChatPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Route>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/event/:eventId" element={<EventPage />} />
            <Route path="/create-post/:eventId" element={<CreatePostPage />} />
            <Route path="/user/:userId" element={<UserPage />} />
          </Routes>
        </Router>
      </main>
    </UserProvider>
  );
}

export default App;
