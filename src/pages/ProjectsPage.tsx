import React, { useState , useEffect } from 'react';
import { Search, Plus, Filter, ChevronDown } from 'lucide-react';
import MobileHeader from '../components/MobileHeader';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projects';
import axios from 'axios';


export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [projects, setProjects] = useState([]);

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
        <div className="space-y-3 mb-4">
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
{/* 
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-300 w-full"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className="w-4 h-4 ml-auto" />
          </button> */}
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard key={1} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
