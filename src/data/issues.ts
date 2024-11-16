export interface Issue {
  id: string;
  project: string;
  issue: string;
  milestone: string;
  priority: string;
  status: string;
  assignToDepartment: string;
  raisedBy: string;
  raisedOn: string;
  reportedOn: string;
}

export const issuesData: Issue[] = [
  {
    id: "1",
    project: "Central Public Works Department (CPWD)",
    issue: "health",
    milestone: "Piling",
    priority: "Normal",
    status: "New",
    assignToDepartment: "Central Public Works Department (CPWD)",
    raisedBy: "admin",
    raisedOn: "14-12-2023",
    reportedOn: "14-12-2023"
  },
  {
    id: "2",
    project: "Central Public Works Department (CPWD)",
    issue: "TEST DATA002",
    milestone: "TEST002",
    priority: "Urgent",
    status: "New",
    assignToDepartment: "Central Public Works Department (CPWD)",
    raisedBy: "admin",
    raisedOn: "14-12-2023",
    reportedOn: "13-12-2023"
  }
];