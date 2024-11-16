import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import ReportsPage from './pages/ReportsPage';
import ProjectsPage from './pages/ProjectsPage';
import IssuesPage from './pages/IssuesPage';
import ProjectGallery from './pages/ProjectGallery';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<ProjectGallery />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/issues" element={<IssuesPage />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;