// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// import MobileHeader from "../components/MobileHeader";
// import ProjectCard from "../components/ProjectCard";
// import SearchBar from "../components/filters/SearchBar";
// import ProjectFilterPanel from "../components/filters/ProjectFilterPanel";
// // import { useProjects } from "../hooks/useProjects";
// import { Project } from "../types/project";
// import { endpoint } from "../utils/dataSet";
// import { useEntities } from "../context/EntityContext";

// export default function ProjectsPage() {
//   const { entities, reloadEntities } = useEntities();
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
//   const location = useLocation();

//   const { state } = location;

//   const [projects, setProjects] = useState<Project[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [selectedExecutiveAgency, setSelectedExecutiveAgency] = useState("");

//   // const { projects, isLoading, error } = useProjects();

//   useEffect(() => {
//     console.log("state", state);
//     // Check if navigating from dashboard with department filter
//     if (state?.fromDashboard && state?.selectedDepartment) {
//       setSelectedDepartment(state.selectedDepartment);
//       // Clear the state to prevent filter from persisting on manual navigation
//       window.history.replaceState({}, document.title);
//     }

//     if (state?.fromDashboard && state?.selectedProjectStatus) {
//       setSelectedStatus(state.selectedProjectStatus);
//       // Clear the state to prevent filter from persisting on manual navigation
//       window.history.replaceState({}, document.title);
//     }
//   }, [state]);

//   const filterProjects = (projects: Project[]) => {
//     return projects.filter((project) => {
//       const matchesSearch =
//         project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         project.executingAgency
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase());
//       const matchesDepartment =
//         !selectedDepartment || project.projectDepartment === selectedDepartment;
//       const matchesStatus =
//         !selectedStatus || project.projectStatus === selectedStatus;
//       const matchesExecutiveAgency =
//         !selectedExecutiveAgency ||
//         project.executingAgency === selectedExecutiveAgency;
//       return (
//         matchesSearch &&
//         matchesDepartment &&
//         matchesStatus &&
//         matchesExecutiveAgency
//       );
//     });
//   };

//   const fetchProjects = async () => {
//     setIsLoading(true);
//     setError("");
//     try {
//       if (!user?.entityId || !user?.entityTypeId || !user?.userRole) {
//         setError("User entity data is missing.");
//         return;
//       }

//       const payload = {
//         entityId: user.entityId,
//         entityTypeId: user.entityTypeId,
//       };

//       const response = await axios.get(`${endpoint}/api/projects/`, {
//         headers: { "Content-Type": "application/json" },
//         params: user.userRole == 3 || user.userRole == 4 ? payload : {},
//       });

//       if (response.data.success) {
//         console.log(response.data.data);
//         setProjects(response.data.data);
//       } else {
//         setError("Failed to fetch projects. Please try again.");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "An error occurred while fetching projects."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchProjects();
//   }, [user]);

//   const filteredProjects = filterProjects(projects);

//   const handleResetFilters = () => {
//     setSelectedDepartment("");
//     setSelectedStatus("");
//     setSelectedExecutiveAgency("");
//   };

//   if (error) {
//     return (
//       <div className="pb-20 pt-16 bg-gray-50">
//         <MobileHeader />
//         <div className="px-4 py-4">
//           <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
//         </div>
//       </div>
//     );
//   }



//   const getStatusValue = (status: string) => {
//     switch (status) {
//       case "1":
//         return "योजना चरण में";
//       case "2":
//         return "प्रगति पर है";
//       case "3":
//         return "रोक पर";
//       case "4":
//         return "विलंबित";
//       case "5":
//         return "पूर्ण हुआ";
//       default:
//         return "N/A";
//     }
//   };
  

//   return (
//     <div className="pb-20 pt-16 bg-gray-50">
//       <MobileHeader />

//       <div className="px-4 py-4">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-xl font-bold text-gray-900">Projects</h1>
//         </div>

//         <div className="relative mb-4">
//           <SearchBar
//             searchTerm={searchTerm}
//             onSearchChange={setSearchTerm}
//             showFilters={showFilters}
//             onToggleFilters={() => setShowFilters(!showFilters)}
//           />

//           {showFilters && (
//             <ProjectFilterPanel
//               selectedDepartment={selectedDepartment}
//               onDepartmentChange={setSelectedDepartment}
//               selectedStatus={selectedStatus}
//               onStatusChange={setSelectedStatus}
//               selectedExecutiveAgency={selectedExecutiveAgency}
//               onExecutiveAgencyChange={setSelectedExecutiveAgency}
//               onClose={() => setShowFilters(false)}
//               onReset={handleResetFilters}
//               user={user}
//             />
//           )}

//           <div className="flex gap-2 mt-1">
//             {selectedExecutiveAgency && (
//               <p className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                 {selectedExecutiveAgency}
//               </p>
//             )}
//             {
//               selectedDepartment && (
//                 <p className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                   {selectedDepartment}
//                 </p>
//               )
//             }
//             {
//               selectedStatus && (
//                 <p className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                   {getStatusValue(selectedStatus)}
//                 </p>
//               )
//             }
//           </div>
//         </div>

//         <div className="space-y-4">
//           {isLoading ? (
//             <div className="flex justify-center py-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
//             </div>
//           ) : filteredProjects.length > 0 ? (
//             filteredProjects.map((project) => (
//               <ProjectCard key={project.id} project={project} />
//             ))
//           ) : (
//             <div className="text-center py-8 text-gray-500">
//               No projects found
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import MobileHeader from "../components/MobileHeader";
import ProjectCard from "../components/ProjectCard";
import SearchBar from "../components/filters/SearchBar";
import ProjectFilterPanel from "../components/filters/ProjectFilterPanel";
import { Project } from "../types/project";
import { endpoint } from "../utils/dataSet";
import { useEntities } from "../context/EntityContext";

export default function ProjectsPage() {
  const { entities, reloadEntities } = useEntities();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const location = useLocation();
  const { state } = location;

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedExecutiveAgency, setSelectedExecutiveAgency] = useState("");

  const getFilteredCount = (filterType: string) => {
    return filteredProjects.filter(project => {
      switch (filterType) {
        case 'department':
          return project.projectDepartment === selectedDepartment;
        case 'status':
          return project.projectStatus === selectedStatus;
        case 'agency':
          return project.executingAgency === selectedExecutiveAgency;
        default:
          return false;
      }
    }).length;
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

  const fetchProjects = async () => {
    setIsLoading(true);
    setError("");
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
      setIsLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSelectedDepartment("");
    setSelectedStatus("");
    setSelectedExecutiveAgency("");
  };

  useEffect(() => {
    if (user) fetchProjects();
  }, [user]);

  useEffect(() => {
    if (state?.fromDashboard) {
      if (state.selectedDepartment) {
        setSelectedDepartment(state.selectedDepartment);
      }
      if (state.selectedProjectStatus) {
        setSelectedStatus(state.selectedProjectStatus);
      }
      window.history.replaceState({}, document.title);
    }
  }, [state]);

  const filteredProjects = filterProjects(projects);

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
      case "1": return "योजना चरण में";
      case "2": return "प्रगति पर है";
      case "3": return "रोक पर";
      case "4": return "विलंबित";
      case "5": return "पूर्ण हुआ";
      default: return "N/A";
    }
  };

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
              user={user}
            />
          )}

          <div className="flex gap-2 mt-1">
            {selectedExecutiveAgency && (
              <p className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {selectedExecutiveAgency} ({getFilteredCount('agency')})
              </p>
            )}
            {selectedDepartment && (
              <p className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {selectedDepartment} ({getFilteredCount('department')})
              </p>
            )}
            {selectedStatus && (
              <p className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {getStatusValue(selectedStatus)} ({getFilteredCount('status')})
              </p>
            )}
          </div>
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