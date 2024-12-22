import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
import ReportsPage from "./pages/ReportsPage";
import ProjectsPage from "./pages/ProjectsPage";
import IssuesPage from "./pages/IssuesPage";
import ProjectGallery from "./pages/ProjectGallery";
import ProfilePage from "./pages/ProfilePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import MilestonePage from "./pages/MilestonePage";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import HelpSupportPage from "./pages/HelpSupportPage";
import { EntitiesProvider } from "./context/EntityContext";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");

    const path = location.pathname;
    if (path === "/") {
      // Redirect to the dashboard if the user is already logged in
      if (user) {
        navigate("/dashboard");
      }
    }else{
      // Redirect to the login page if the user is not logged in
      if (!user) {
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <EntitiesProvider>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/gallery" element={<ProjectGallery />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/reports" element={<ReportsPage />} />

        <Route path="/issues" element={<IssuesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/milestones" element={<MilestonePage />} />
        <Route path="/help" element={<HelpSupportPage />} />
      </Routes>
      {/* Only show BottomNav for authenticated routes */}
      <Routes>
        <Route path="/" element={null} />
        <Route path="/login" element={null} />
        <Route path="*" element={<BottomNav />} />
      </Routes>
    </EntitiesProvider>
  );
}

function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default RootApp;
