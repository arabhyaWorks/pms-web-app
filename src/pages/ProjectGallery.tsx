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

interface GalleryProps {
  isSidebarOpen: boolean;
}

export default function Gallery({ isSidebarOpen }: GalleryProps) {
  const { user, entities } = useEntities();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [executingAgencies, setExecutingAgencies] = useState(
    entities?.filter((entity) => entity.entity_type === 2)
  );

  const [selectedAgency, setSelectedAgency] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{ projectId?: number; projectName?: string }>({});
  const [projectGallery, setProjectGallery] = useState<any[]>([]);
  const [filterSelectedProject, setFilterSelectedProject] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null); // File state
  const [uploadData, setUploadData] = useState({
    imageDescription: "",
  });

  // Fetch Gallery Data
  const fetchProjectGallery = async () => {
    if (!user?.entityId || !user?.entityTypeId) {
      setError("Entity ID or Entity Type ID is missing.");
      return;
    }

    setLoading(true);
    setError("");

    const paramsData = {
      entityId: user.entityId,
      entityTypeId: user.entityTypeId,
    };

    try {
      const response = await axios.get(
        `${endpoint}/api/fetchGallery`,
        user.userRole === 3 || user.userRole === 4 ? { params: paramsData } : {}
      );

      if (response.data.success) {
        setProjectGallery(response.data.data);
      } else {
        setError("Failed to fetch gallery. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while fetching gallery."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const validTypes = ["image/png", "image/jpeg", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Please upload an image or PDF.");
        return;
      }
      setFile(file);
      setError(null);
    }
  };

  // Handle Upload Image with FormData
  const handleUploadImage = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append file
    formData.append("imageDescription", uploadData.imageDescription);
    formData.append("time", new Date().toISOString()); // Current time in ISO format

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        `${endpoint}/api/projects/${selectedProject.projectId}/gallery`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } } // Required for file uploads
      );

      setSuccessMessage("File uploaded successfully!");
      setShowUpdateModal(false);
      setFile(null);
      setUploadData({
        imageDescription: "",
      });
      fetchProjectGallery(); // Refresh the gallery after upload
    } catch (error) {
      setError(
        error.response?.data?.message || "Error uploading file. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProjectGallery();
    }
  }, [user]);

  const filteredProjects = projectGallery.filter((project) => {
    const matchesAgency =
      !selectedAgency || project.executiveAgencyId === parseInt(selectedAgency);

    const matchesProjectId =
      !filterSelectedProject ||
      project.projectId === parseInt(filterSelectedProject);
    return matchesAgency && matchesProjectId;
  });

  const handleUpdateProgress = (project: object) => {
    setSelectedProject(project);
    setShowUpdateModal(true);
  };

  return (
    <>
      <div className={`min-h-screen bg-gray-50 transition-all duration-300 m-0`}>
        <div className="max-w-7xl mx-auto py-6">
          <MobileHeader />
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
                  onChange={(e) => setFilterSelectedProject(parseInt(e.target.value))}
                >
                  <option value="">Project Names</option>
                  {projectGallery.map((project, index) => (
                    <option key={index} value={project.projectId}>
                      {project.projectName}
                    </option>
                  ))}
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
                  <div className="p-4 border-b flex justify-between gap-3">
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
                        className="w-[170px] px-4 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors"
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
            <div className="bg-white rounded-xl shadow-xl p-6 w-11/12">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Update Project Gallery
              </h2>

              {error && <p className="text-red-500 mb-4">{error}</p>}
              {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

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
                    Upload File
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:border-orange-500">
                      <Plus className="w-8 h-8 text-gray-400" />
                      <span className="mt-2 text-sm text-gray-500">
                        Click to upload or drag and drop
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
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
                  className={`px-4 py-2 ${
                    loading ? "bg-gray-400" : "bg-orange-500"
                  } text-white rounded-lg hover:bg-orange-600 transition-colors`}
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Update Gallery"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}