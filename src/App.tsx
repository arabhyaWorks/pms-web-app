import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
import { use } from "framer-motion/client";

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/gallery" element={<ProjectGallery />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/issues" element={<IssuesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/milestones" element={<MilestonePage />} />
      </Routes>
      {/* Only show BottomNav for authenticated routes */}
      <Routes>
        <Route path="/" element={null} />
        <Route path="/login" element={null} />
        <Route path="*" element={<BottomNav />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
