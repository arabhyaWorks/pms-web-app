import React, { useState } from 'react';
import { Search, Plus, Filter, ChevronDown, Calendar, Clock, CheckCircle } from 'lucide-react';
import MobileHeader from '../components/MobileHeader';

interface Milestone {
  id: number;
  projectName: string;
  status: 'Complete' | 'In Progress';
  startDate: string;
  endDate: string;
  progress: number;
}

const milestoneData: Milestone[] = [
  {
    id: 1,
    projectName: 'Project Estimate for construction of crated stone Boulder cutter to prevent of erosion in 450 meter length at right bank of river Ganga in village- Mahuji, Block- Dhanapur Tahsil- Sakaldiha, Distt- Chandauli.',
    status: 'Complete',
    startDate: '29-12-2022',
    endDate: '-',
    progress: 100
  },
  {
    id: 2,
    projectName: 'R.O.B. IN LIEU OF LC No.-102B/3E ON CHANDAULI- SAKALDIHA ROAD BETWEEN KUCHAMAN-SAKALDIHA RAILWAY STATION OF ECR RAIL SECTION IN DISTT. CHANDAULI',
    status: 'In Progress',
    startDate: '10-07-2023',
    endDate: '-',
    progress: 65
  }
];

export default function MilestonePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [entriesCount, setEntriesCount] = useState('10');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="pb-20 pt-16 bg-gray-50 min-h-screen">
      <MobileHeader />
      
      <div className="px-4 py-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-900">Milestone Management</h1>
          {/* <button className="bg-orange-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm">
            <Plus className="w-4 h-4" />
            Create Milestone
          </button> */}
        </div>

        {/* Search and Filter */}
        <div className="space-y-3 mb-4">
          <select 
            value={entriesCount}
            onChange={(e) => setEntriesCount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
          >
            <option value="10">10 entries</option>
            <option value="25">25 entries</option>
            <option value="50">50 entries</option>
          </select>

          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>

          {/* <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-300 w-full"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className="w-4 h-4 ml-auto" />
          </button> */}
        </div>

        {/* Milestones List */}
        <div className="space-y-4">
          {milestoneData.map((milestone) => (
            <div key={milestone.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex justify-between items-start gap-2 mb-3">
                <span className="text-sm text-gray-500">#{milestone.id}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                  {milestone.status}
                </span>
              </div>

              <h3 className="text-sm font-medium text-gray-900 mb-3">
                {milestone.projectName}
              </h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Start: {milestone.startDate}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>End: {milestone.endDate}</span>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{milestone.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* <div className="flex gap-2 mt-4 pt-4 border-t">
                <button className="flex-1 px-3 py-1.5 text-xs font-medium rounded bg-orange-50 text-orange-600">
                  Update Progress
                </button>
                <button className="flex-1 px-3 py-1.5 text-xs font-medium rounded bg-blue-50 text-blue-600">
                  Edit Details
                </button>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}