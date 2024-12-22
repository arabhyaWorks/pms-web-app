import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image as ImageIcon } from "lucide-react";
import MobileHeader from "../components/MobileHeader";
import { endpoint } from "../utils/dataSet";
import { useEntities } from "../context/EntityContext";
import { convertToIST } from "../utils/function";
import { Project } from "../types/project";
import SearchBar from "../components/filters/SearchBar";
import ProjectFilterPanel from "../components/filters/ProjectFilterPanel";

export default function ReportsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedExecutiveAgency, setSelectedExecutiveAgency] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!user?.entityId || !user?.entityTypeId || !user?.userRole) {
        setError("User entity data is missing.");
        return;
      }

      const payload = {
        entityId: user.entityId,
        entityTypeId: user.entityTypeId,
      };

      const response = await axios.get(`${endpoint}/api/projects/`, {
        headers: { "Content-Type": "application/json" },
        params: user.userRole == 3 || user.userRole == 4 ? payload : {},
      });

      if (response.data.success) {
        setProjects(response.data.data);
      } else {
        setError("Failed to fetch projects. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while fetching projects."
      );
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = (projects: Project[]) => {
    return projects.filter((project) => {
      const matchesSearch =
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.executingAgency
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesDepartment =
        !selectedDepartment || project.projectDepartment === selectedDepartment;
      const matchesStatus =
        !selectedStatus || project.projectStatus === selectedStatus;
      const matchesExecutiveAgency =
        !selectedExecutiveAgency ||
        project.executingAgency === selectedExecutiveAgency;
      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus &&
        matchesExecutiveAgency
      );
    });
  };

  const filteredProjects = filterProjects(projects);

  const handleResetFilters = () => {
    setSelectedDepartment("");
    setSelectedStatus("");
    setSelectedExecutiveAgency("");
  };

  useEffect(() => {
    if (user) fetchProjects();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pb-20 pt-16 bg-gray-50">
        <MobileHeader />
        <div className="px-4 py-4">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
        </div>
      </div>
    );
  }

  const getStatusValue = (status: string) => {
    switch (status) {
      case "1":
        return "योजना चरण में";
      case "2":
        return "प्रगति पर है";
      case "3":
        return "रोक पर";
      case "4":
        return "विलंबित";
      case "5":
        return "पूर्ण हुआ";
      default:
        return "N/A";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "1":
        return "bg-yellow-100 text-yellow-800";
      case "2":
        return "bg-green-100 text-green-800";
      case "3":
        return "bg-gray-100 text-gray-800";
      case "4":
        return "bg-red-100 text-red-800";
      case "5":
        return "bg-green-100 text-green-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };
  return (
    <div className="pb-20 pt-16 bg-gray-50">
      <MobileHeader />
      <div className="px-4 py-4">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900 mb-6">
            Project Reports
          </h1>

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
                user={user}
              />
            )}

            <div className="flex gap-2 mt-1">
              {selectedExecutiveAgency && (
                <p className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {selectedExecutiveAgency}
                </p>
              )}
              {selectedDepartment && (
                <p className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {selectedDepartment}
                </p>
              )}
              {selectedStatus && (
                <p className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {getStatusValue(selectedStatus)}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm p-4">
              {/* Project Header */}
              <div className="border-b pb-4 mb-1">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h3 className="text-sm font-medium text-gray-900 flex-1">
                    {project.projectName}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      project.projectStatus
                    )}`}
                  >
                    {getStatusValue(project.projectStatus)}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  {project.executingAgency}
                </p>
              </div>

              {/* Project Details Table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">
                        कार्य स्वीकृति की तिथि
                      </td>
                      <td className="py-2 text-gray-900 font-medium">
                        {convertToIST(project.projectStartDate)}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">
                        स्वीकृत लागत (करोड़ ₹0 में)
                      </td>
                      <td className="py-2 text-gray-900 font-medium">
                        {project.approvedProjectCost}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">
                        अनुबंध गठन की लागत (करोड़ ₹0 में)
                      </td>
                      <td className="py-2 text-gray-900 font-medium">
                        {project.approvedProjectCost}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">कुल अवमुक्त धनराशि</td>
                      <td className="py-2 text-gray-900 font-medium">
                        {project.releasedAmount || "0"}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">व्यय धनराशि</td>
                      <td className="py-2 text-gray-900 font-medium">
                        {project.expenditureAmount || "0"}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">
                        वर्तमान की भौतिक प्रगति (प्रतिशत में)
                      </td>
                      <td className="py-2 text-gray-900 font-medium">
                        {project.currentMonthPhysicalProgress}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">
                        गत की भौतिक प्रगति (प्रतिशत में)
                      </td>
                      <td className="py-2 text-gray-900 font-medium">
                        {project.lastMonthPhysicalProgress}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-600">
                        कार्य पूर्ण करने की तिथि
                      </td>
                      <td className="py-2 text-gray-900 font-medium">
                        {convertToIST(project.projectCompletionDate)}
                      </td>
                    </tr>
                    {/* <tr>
                      <td className="py-2 text-gray-600">अभ्यूक्ति</td>
                      <td className="py-2 text-gray-900 font-medium">
                        {project.meetingfeedback}
                      </td>
                    </tr> */}
                  </tbody>
                </table>
                <p className="py-2 text-gray-600 text-sm">अभ्यूक्ति :</p>
                <p className="py-2 text-gray-900 text-xs font-medium">
                  {project.meetingfeedback}
                </p>
              </div>

              {/* Project Images */}
              <div className="grid grid-cols-2 gap-4 ">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  {project.geoTaggedPhotosLastMonth ? (
                    <img
                      src={project.geoTaggedPhotosLastMonth}
                      alt="Project Gallery"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        गत माह की जियोटैग युक्त फोटोग्राफ
                      </p>
                    </div>
                  )}
                </div>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  {project.geoTaggedPhotosCurrentMonth ? (
                    <img
                      src={project.geoTaggedPhotosCurrentMonth}
                      alt="Project Gallery"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        वर्तमान माह की जियोटैग युक्त फोटोग्राफ
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
