import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  IndianRupee,
  Activity,
} from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    projectName: string;
    projectStatus: string;
    executingAgency: string;
    approvedProjectCost: string;
    completionDateAsPerContract: string;
    physicalProgress: string;
    projectUpdate: string;
    projectGallery: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'कार्य प्रगति पर':
        return 'bg-blue-100 text-blue-800';
      case 'प्रारंभिक चरण':
        return 'bg-yellow-100 text-yellow-800';
      case 'योजना निर्माण':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4">
        {/* Basic Info */}
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="text-sm font-medium text-gray-900 flex-1">
            {project.projectName}
          </h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              project.projectStatus
            )}`}
          >
            {project.projectStatus}
          </span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-3">
          <div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
              <IndianRupee className="w-3 h-3" />
              Budget
            </div>
            <p className="text-sm font-medium text-gray-900">
              {project.approvedProjectCost}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
              <Activity className="w-3 h-3" />
              Progress
            </div>
            <p className="text-sm font-medium text-gray-900">
              {project.physicalProgress}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
              <Calendar className="w-3 h-3" />
              Deadline
            </div>
            <p className="text-sm font-medium text-gray-900">
              {project.completionDateAsPerContract}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
          <div
            className="bg-orange-500 h-1.5 rounded-full"
            style={{ width: project.physicalProgress }}
          />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <button className="flex-1 px-2 py-2 text-xs font-medium rounded bg-blue-50 text-blue-600">
            {project.projectUpdate}
          </button>
          <button className="flex-1 px-2 py-1 text-xs font-medium rounded bg-orange-50 text-orange-600">
            {project.projectGallery}
          </button>
        </div>

        {/* Expand/Collapse */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-center w-full mt-3 pt-2 border-t text-sm text-gray-500"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show More
            </>
          )}
        </button>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-4 pb-4 border-t">
          <div className="space-y-3 pt-3">
            <div>
              <label className="text-xs text-gray-500">Executing Agency</label>
              <p className="text-sm text-gray-900">{project.executingAgency}</p>
            </div>
            {/* Add more details as needed */}
          </div>
        </div>
      )}
    </div>
  );
}
