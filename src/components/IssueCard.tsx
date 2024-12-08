import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { Issue } from '../data/issues';

interface IssueCardProps {
  issue: Issue;
}

export default function IssueCard({ issue }: IssueCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return 'text-red-500';
      case 'high':
        return 'text-orange-500';
      case 'normal':
        return 'text-blue-500';
      case 'low':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-start gap-4 mb-3">
        <h3 className="text-sm font-medium text-gray-900">{issue.issue}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
          {issue.status}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1 text-xs">
          <AlertCircle className={`w-4 h-4 ${getPriorityColor(issue.priority)}`} />
          <span className="text-gray-600">{issue.priority}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{issue.raisedOn}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <label className="text-xs text-gray-500">Project</label>
          <p className="text-sm text-gray-900">{issue.project}</p>
        </div>
        <div>
          <label className="text-xs text-gray-500">Milestone</label>
          <p className="text-sm text-gray-900">{issue.milestone}</p>
        </div>
        <div>
          <label className="text-xs text-gray-500">Assigned To</label>
          <p className="text-sm text-gray-900">{issue.assignToDepartment}</p>
        </div>
      </div>

      {/* <div className="flex gap-2 mt-4 pt-4 border-t">
        <button className="flex-1 px-3 py-1.5 text-xs font-medium rounded bg-blue-50 text-blue-600">
          Change Status
        </button>
        <button className="flex-1 px-3 py-1.5 text-xs font-medium rounded bg-orange-50 text-orange-600">
          View Log
        </button>
      </div> */}
    </div>
  );
}