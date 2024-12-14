import React, { useState, useEffect } from "react";
import {
  Search,
  Image as ImageIcon,
  Filter,
  Calendar,
  Plus,
} from "lucide-react";
import MobileHeader from "../components/MobileHeader";
import axios from "axios";
import { endpoint } from "../utils/dataSet";
import { useEntities } from "../context/EntityContext";
import { parse } from "date-fns";

interface GalleryProps {
  isSidebarOpen: boolean;
}

export default function Gallery({ isSidebarOpen }: GalleryProps) {
  const { entities, reloadEntities } = useEntities();
  const [executingAgencies, setExecutingAgencies] = useState(
    entities?.filter((entity) => entity.entity_type === 2)
  );

  const [selectedAgency, setSelectedAgency] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  const [projectGallery, setProjectGallery] = useState([]);
  const [filterSelectedProject, setFilterSelectedProject] = useState(null);
  const [uploadData, setUploadData] = useState({
    image: "",
    imageDescription: "",
  });

  const fetchProjectGallery = async () => {
    const url = `${endpoint}/api/fetchGallery`;

    try {
      const response = await axios.get(url, {});

      console.log("Response Data:", response.data.data);

      return setProjectGallery(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  // Handle Upload Image
  const handleUploadImage = async () => {
    // console.log("Selected Project:", selectedProject);
    const url = `${endpoint}/api/projects/${selectedProject.projectId}/gallery`;
    try {
      const response = await axios.post(
        url,
        { ...uploadData, ...{ time: new Date() } },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Image uploaded successfully:", response.data);
      setShowUpdateModal(false);
      fetchProjectGallery(); // Refresh gallery after upload
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchProjectGallery();
  }, []);

  const filteredProjects = projectGallery.filter((project) => {
    const matchesAgency =
      !selectedAgency || project.executiveAgencyId === parseInt(selectedAgency);

    const matchesProjectId =
      !filterSelectedProject ||
      project.projectId === parseInt(filterSelectedProject);
    // const matchesSearch = project.projectName
    //   .toLowerCase()
    //   .includes(searchQuery.toLowerCase());
    return matchesAgency && matchesProjectId;
    // const matchesAgency = !selectedAgency || project.agency === selectedAgency;
    // const matchesSearch = project.title
    //   .toLowerCase()
    //   .includes(searchQuery.toLowerCase());
    // return matchesAgency && matchesSearch;
    // return project;
  });

  const handleUpdateProgress = (project: object) => {
    setSelectedProject(project);
    setShowUpdateModal(true);
  };

  return (<>
  
    <div className={`min-h-screen bg-gray-50 transition-all duration-300 m-0`}>
    

      <div className="max-w-7xl mx-auto py-6">
        <MobileHeader/>
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={selectedAgency}
                onChange={(e) => setSelectedAgency(e.target.value)}
              >
                <option value="">All Executing Agencies</option>
                <>
                  {entities
                    ?.filter((entity) => entity.entity_type === 2)
                    .map((entity) => (
                      <option key={entity.id} value={entity.id}>
                        {entity.entity_name}
                      </option>
                    ))}
                </>
              </select>
            </div>
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={filterSelectedProject}
                onChange={(e) => setFilterSelectedProject(e.target.value)}
              >
                <option value="">Project Names</option>
                {projectGallery.map((project, index) => {
                  if (!selectedAgency) {
                    return (
                      <option key={index} value={project.projectId}>
                        {project.projectName}
                      </option>
                    );
                  } else {
                    if (
                      project.executiveAgencyId === parseInt(selectedAgency)
                    ) {
                      return (
                        <option key={index} value={project.projectId}>
                          {project.projectName}
                        </option>
                      );
                    }
                  }
                })}
              </select>
            </div>

            <button
              className="px-4 py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
              onClick={() => {
                setSelectedAgency("");
                setFilterSelectedProject(null);
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="space-y-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-4 border-b flex justify-between	gap-3 ">
                  <div className="">
                    <h2 className="text-sm font-semibold text-gray-900">
                      {project.projectName}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {project.executiveAgencyName}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {project.departmentName}
                    </p>
                  </div>

                  <div className="">
                    <button
                      onClick={() => handleUpdateProgress(project)}
                      className=" w-[170px] px-4 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors"
                    >
                      <ImageIcon size={20} />
                      Upload Images
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {project.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="group relative aspect-[948/592] overflow-hidden rounded-lg"
                    >
                      <img
                        src={image.image}
                        alt={image.imageDescription}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                          <p className="text-sm font-medium">
                            {image.imageDescription}
                          </p>
                          <p className="text-xs opacity-75 mt-1">
                            Uploaded:{" "}
                            {new Date(image.uploadedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No project found</div>
          )}
        </div>
      </div>

      {showUpdateModal && selectedProject && (
        <div
          style={{
            zIndex: 9999,
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white rounded-xl shadow-xl  p-6 w-11/12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Update Project Gallery
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <p className="text-sm text-gray-600">
                  {selectedProject.projectName}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter the link
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={1}
                  value={uploadData.image}
                  onChange={(e) =>
                    setUploadData({ ...uploadData, image: e.target.value })
                  }
                  placeholder="Enter the link of the image"
                />
              </div>

              {/* 
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:border-orange-500">
                    <Plus className="w-8 h-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">
                      Click to upload or drag and drop
                    </span>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div> */}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
                Description
              </label>
              <textarea
                value={uploadData.imageDescription}
                onChange={(e) => {
                  setUploadData({
                    ...uploadData,
                    imageDescription: e.target.value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={4}
                placeholder="Enter image description..."
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleUploadImage();
                }}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Update Gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>);
}

// old code below.
// import React, { useState } from 'react';
// import AgencyFilter from '../galleryComponents/AgencyFilter';
// import ProjectCard from '../galleryComponents/ProjectCard';
// import UploadModal from '../galleryComponents/UploadModal';
// import MobileHeader from '../components/MobileHeader';

// interface Project {
//   id: string;
//   title: string;
//   agency: string;
//   images: string[];
// }

// const mockProjects: Project[] = [
//   {
//     id: '1',
//     title: 'Project Estimate for construction of crated stone Boulder cutter to prevent of erosion in 450 meter length at right bank of river Ganga in village- Mahuji, Block- Dhanapur Tahsil- Sakaldiha, Distt- Bhadohi.',
//     agency: 'Bandhi Prakhand',
//     images: [
//       'https://pmschandauli.com/upload/project/9/main/240108045338.png',
//       'https://pmschandauli.com/upload/project/9/main/240108045216.jpg'
//     ]
//   },
//   {
//     id: '2',
//     title: 'R.O.B. IN LIEU OF LC No.-102B/3E ON CHANDAULI- SAKALDIHA ROAD BETWEEN KUCHAMAN-SAKALDIHA RAILWAY STATION OF ECR RAIL SECTION IN DISTT. Bhadohi',
//     agency: 'PWD Chandauli',
//     images: [
//       'https://pmschandauli.com/upload/project/26/main/231220123642.jpg',
//       'https://pmschandauli.com/upload/project/26/main/231220123543.jpg'
//     ]
//   }
// ];

// export default function ProjectGallery() {
//   const [selectedAgency, setSelectedAgency] = useState('All Executing Agencies');
//   const [uploadModalOpen, setUploadModalOpen] = useState(false);
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);

//   const handleAgencyChange = (agency: string) => {
//     setSelectedAgency(agency);
//   };

//   const handleResetFilters = () => {
//     setSelectedAgency('All Executing Agencies');
//   };

//   const handleUploadClick = (project: Project) => {
//     setSelectedProject(project);
//     setUploadModalOpen(true);
//   };

//   const handleUploadSubmit = (image: File, description: string) => {
//     // Here you would typically handle the image upload to your backend
//     console.log('Uploading image:', image, 'with description:', description);
//     setUploadModalOpen(false);
//   };

//   const filteredProjects = selectedAgency === 'All Executing Agencies'
//     ? mockProjects
//     : mockProjects.filter(project => project.agency === selectedAgency);

//   return (
//     <div className="min-h-screen bg-gray-50 pb-20">
//       {/* <Header /> */}

//       <MobileHeader />

      
//       <AgencyFilter
//         selectedAgency={selectedAgency}
//         onAgencyChange={handleAgencyChange}
//         onReset={handleResetFilters}
//       />

//       <div className="space-y-6 p-4">
//         {filteredProjects.map((project) => (
//           <ProjectCard
//             key={project.id}
//             project={project}
//             onUploadClick={() => handleUploadClick(project)}
//           />
//         ))}
//       </div>

//       {uploadModalOpen && (
//         <UploadModal
//           project={selectedProject}
//           onClose={() => setUploadModalOpen(false)}
//           onSubmit={handleUploadSubmit}
//         />
//       )}
//     </div>
//   );
// }