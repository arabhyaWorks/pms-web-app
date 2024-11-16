import React from 'react';
import { BarChart3, Users, AlertTriangle } from 'lucide-react';

export default function DashboardHeader() {
  const totalProjects = 95;
  const totalDepartments = 16;
  const totalIssues = 0;

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg mb-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg">
          <div className="bg-white/20 p-3 rounded-lg">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm opacity-90">Total Projects</p>
            <p className="text-2xl font-bold">{totalProjects}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg">
          <div className="bg-white/20 p-3 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm opacity-90">Departments</p>
            <p className="text-2xl font-bold">{totalDepartments}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg">
          <div className="bg-white/20 p-3 rounded-lg">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm opacity-90">Total Issues</p>
            <p className="text-2xl font-bold">{totalIssues}</p>
          </div>
        </div>
      </div>
    </div>
  );
}