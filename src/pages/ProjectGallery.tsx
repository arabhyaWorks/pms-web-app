import React, { useState } from 'react';
import AgencyFilter from '../galleryComponents/AgencyFilter';
import ProjectCard from '../galleryComponents/ProjectCard';
import UploadModal from '../galleryComponents/UploadModal';
import MobileHeader from '../components/MobileHeader';

interface Project {
  id: string;
  title: string;
  agency: string;
  images: string[];
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Project Estimate for construction of crated stone Boulder cutter to prevent of erosion in 450 meter length at right bank of river Ganga in village- Mahuji, Block- Dhanapur Tahsil- Sakaldiha, Distt- Chandauli.',
    agency: 'Bandhi Prakhand',
    images: [
      'https://images.unsplash.com/photo-1553434320-e9f5757140b1',
      'https://images.unsplash.com/photo-1553434320-a4114f211e48'
    ]
  },
  {
    id: '2',
    title: 'R.O.B. IN LIEU OF LC No.-102B/3E ON CHANDAULI- SAKALDIHA ROAD BETWEEN KUCHAMAN-SAKALDIHA RAILWAY STATION OF ECR RAIL SECTION IN DISTT. CHANDAULI',
    agency: 'PWD Chandauli',
    images: [
      'https://images.unsplash.com/photo-1545119743-a8f1710a3a6d',
      'https://images.unsplash.com/photo-1545119743-cf503f1b5c7c'
    ]
  }
];

export default function ProjectGallery() {
  const [selectedAgency, setSelectedAgency] = useState('All Executing Agencies');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleAgencyChange = (agency: string) => {
    setSelectedAgency(agency);
  };

  const handleResetFilters = () => {
    setSelectedAgency('All Executing Agencies');
  };

  const handleUploadClick = (project: Project) => {
    setSelectedProject(project);
    setUploadModalOpen(true);
  };

  const handleUploadSubmit = (image: File, description: string) => {
    // Here you would typically handle the image upload to your backend
    console.log('Uploading image:', image, 'with description:', description);
    setUploadModalOpen(false);
  };

  const filteredProjects = selectedAgency === 'All Executing Agencies'
    ? mockProjects
    : mockProjects.filter(project => project.agency === selectedAgency);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* <Header /> */}

      <MobileHeader />

      
      <AgencyFilter
        selectedAgency={selectedAgency}
        onAgencyChange={handleAgencyChange}
        onReset={handleResetFilters}
      />

      <div className="space-y-6 p-4">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onUploadClick={() => handleUploadClick(project)}
          />
        ))}
      </div>

      {uploadModalOpen && (
        <UploadModal
          project={selectedProject}
          onClose={() => setUploadModalOpen(false)}
          onSubmit={handleUploadSubmit}
        />
      )}
    </div>
  );
}