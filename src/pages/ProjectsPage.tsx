import React, { useState , useEffect } from 'react';
import { Search, Plus, Filter, ChevronDown } from 'lucide-react';
import MobileHeader from '../components/MobileHeader';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projects';
import { ProjectFilters } from "../components/ProjectFilters";

import axios from 'axios';


export default function ProjectsPage() {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [showFilters, setShowFilters] = useState(false);
  // const [projects, setProjects] = useState([]);
  // old code above and new code below
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedExecutiveAgency, setSelectedExecutiveAgency] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  // const [visibleColumns, setVisibleColumns] = useState(
  //   headers.hi.map((_, index) => index.toString())
  // ); 
  async function fetchProjects() {
    // const url = `${endpoint}/api/projects`;
    const url = "https://pradyogik.in/api/projects/";

    // const params = {
    //   department: "",
    //   status: "",
    // };

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true", // Add this header
        },
        // params: params,
      });

      console.log("Response Data:", response.data);
      // return response.data;

      return setProjects(response.data);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  const filteredProjects = projects.filter((project) => {
    console.log(project);
    
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.executingAgency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      !selectedDepartment || project.projectDepartment === selectedDepartment;
    const matchesStatus =
      !selectedStatus || project.projectStatus === selectedStatus;
    const matchesExecutiveAgency =
      !selectedExecutiveAgency || project.executingAgency === selectedExecutiveAgency
    return matchesSearch && matchesDepartment && matchesStatus && matchesExecutiveAgency;
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  console.log(projects);  
  
  return (
    <div className="pb-20 pt-16 bg-gray-50">
      <MobileHeader />

      <div className="px-4 py-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-900">Projects</h1>
          {/* <button className="bg-orange-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm">
            <Plus className="w-4 h-4" />
            New Project
          </button> */}
        </div>

        {/* Search and Filter */}
        {/* old code */}
        {/* <div className="space-y-3 mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-300 w-full"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className="w-4 h-4 ml-auto" />
          </button>
        </div> */}
        
        {/* new search and filter */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg overflow-hidden	">
        <div className="border-b border-gray-200 p-4">
          <ProjectFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            selectedExecutiveAgency={selectedExecutiveAgency}
            onSelectedExecutiveAgency={setSelectedExecutiveAgency}
            // columns={columns}
            // visibleColumns={visibleColumns}
            // onToggleColumn={handleToggleColumn}
          />
        </div>
        {/* <DataTable
          headers={headers}
          projects={filteredProjects}
          searchTerm={searchTerm}
          visibleColumns={visibleColumns}
        /> */}
      </div>

        {/* Projects List */}
        <div className="space-y-4">
        {filteredProjects.map((project , index) => (
            <ProjectCard key={index} project={project} />
          ))}
          {/* {projects.map((project) => (
            <ProjectCard key={1} project={project}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
}
