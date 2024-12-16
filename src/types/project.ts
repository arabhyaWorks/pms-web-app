export interface Project {
    id: string;
    projectName: string;
    projectStatus: string;
    projectDepartment: string;
    executingAgency: string;
    approvedProjectCost: string;
    projectCompletionDate: Date;
    currentMonthPhysicalProgress: string;
  }
  
  export interface ProjectsResponse {
    data: Project[];
    success: boolean;
    message: string;
  }