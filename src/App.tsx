import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { UserProvider } from "./context/profile-context";
import WelcomePage from "./pages/WelcomePage";
import { ProtectedRoutes } from "./components/routes/ProtectedRoutes";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import { NavRoutes } from "./components/routes/NavRoutes";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import CreateEventPage from "./pages/CreateEventPage";
import EventPage from "./pages/EventPage";
import CreatePostPage from "./pages/CreatePostPost";
import UserPage from "./pages/UserPage";
import ChatPage from "./pages/ChatPage";
import HeaderRoutes from "./components/routes/HeaderRoutes";
import UserChatPage from "./pages/UserChatPage";
import NotificationsPage from "./pages/NotificationsPage";
import SearchPage from "./pages/SearchPage";
import FeedPage from "./pages/FeedPage";

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
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/feed" element={<FeedPage />} />
                </Route>
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              <Route path="/profile-setup" element={<ProfileSetupPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/create-event" element={<CreateEventPage />} />
              <Route path="/chat/:userId" element={<UserChatPage />} />
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
