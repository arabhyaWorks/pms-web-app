export interface Project {
  id: string;
  projectName: string;
  projectStatus: string;
  executingAgency: string;
  approvedProjectCost: string;
  completionDateAsPerContract: string;
  physicalProgress: string;
  projectUpdate: string;
  projectGallery: string;
}

export const projectsData: Project[] = [
  {
    id: "1",
    projectName: "कारपेट सिटी-2 विकास",
    projectStatus: "कार्य प्रगति पर",
    executingAgency: "भदोही औद्योगिक विकास प्राधिकरण (BIDA)",
    approvedProjectCost: "₹100 करोड़",
    completionDateAsPerContract: "31-12-2025",
    physicalProgress: "45%",
    projectUpdate: "अद्यतन",
    projectGallery: "गैलरी",
  },
  // Add more projects as needed
];