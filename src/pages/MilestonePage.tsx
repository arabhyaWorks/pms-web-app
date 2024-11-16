import React, { useState } from 'react';
import { 
  Calendar, Search, Plus, Edit2, RefreshCw,
  ChevronDown, ChevronUp, FileText, Clock, CheckCircle
} from 'lucide-react';

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
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const handleSort = (key: string) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const handleUpdateProgress = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setShowUpdateModal(true);
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Milestone Management</h1>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors">
            <Plus className="w-4 h-4" />
            Create Milestone
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <select className="border border-gray-300 rounded-lg px-3 py-2">
              <option>10 entries</option>
              <option>25 entries</option>
              <option>50 entries</option>
            </select>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  <button className="flex items-center gap-1" onClick={() => handleSort('id')}>
                    Sr No.
                    <ChevronUp className="w-4 h-4" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Project Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Start Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">End Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Progress</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {milestoneData.map((milestone) => (
                <tr key={milestone.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-600">{milestone.id}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{milestone.projectName}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      milestone.status === 'Complete' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {milestone.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{milestone.startDate}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{milestone.endDate}</td>
                  <td className="px-4 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 mt-1">{milestone.progress}%</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleUpdateProgress(milestone)}
                        className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors"
                      >
                        Update Progress
                      </button>
                      <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showUpdateModal && selectedMilestone && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Update Milestone Progress</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <p className="text-sm text-gray-600">{selectedMilestone.projectName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="DD-MM-YYYY"
                    />
                    <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="DD-MM-YYYY"
                    />
                    <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  {Array.from({ length: 11 }, (_, i) => i * 10).map((value) => (
                    <option key={value} value={value}>{value}%</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Active</option>
                  <option>Complete</option>
                  <option>On Hold</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={4}
                  placeholder="Enter milestone description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                <div className="flex items-center justify-center w-full">
                  <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:border-orange-500">
                    <Plus className="w-8 h-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</span>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Update Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}