import React, { useState } from 'react';
import MobileHeader from '../components/MobileHeader';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/filters/SearchBar';
import ProjectFilterPanel from '../components/filters/ProjectFilterPanel';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../types/project';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedExecutiveAgency, setSelectedExecutiveAgency] = useState("");
  
  const { projects, isLoading, error } = useProjects();

  const filterProjects = (projects: Project[]) => {
    return projects.filter((project) => {
      const matchesSearch =
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.executingAgency.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment =
        !selectedDepartment || project.projectDepartment === selectedDepartment;
      const matchesStatus =
        !selectedStatus || project.projectStatus === selectedStatus;
      const matchesExecutiveAgency =
        !selectedExecutiveAgency || project.executingAgency === selectedExecutiveAgency;
      return matchesSearch && matchesDepartment && matchesStatus && matchesExecutiveAgency;
    });
  };

  const filteredProjects = filterProjects(projects);

  const handleResetFilters = () => {
    setSelectedDepartment("");
    setSelectedStatus("");
    setSelectedExecutiveAgency("");
  };

  if (error) {
    return (
      <div className="pb-20 pt-16 bg-gray-50">
        <MobileHeader />
        <div className="px-4 py-4">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 pt-16 bg-gray-50">
      <MobileHeader />

      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-900">Projects</h1>
        </div>

        <div className="relative mb-4">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />

          {showFilters && (
            <ProjectFilterPanel
              selectedDepartment={selectedDepartment}
              onDepartmentChange={setSelectedDepartment}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              selectedExecutiveAgency={selectedExecutiveAgency}
              onExecutiveAgencyChange={setSelectedExecutiveAgency}
              onClose={() => setShowFilters(false)}
              onReset={handleResetFilters}
            />
          )}
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
            </div>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No projects found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}