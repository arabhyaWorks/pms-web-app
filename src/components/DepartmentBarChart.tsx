import React from "react";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DepartmentData {
  name: string;
  value: number;
}

interface Props {
  data: DepartmentData[];
}

export function DepartmentBarChart({ data }: Props) {
  const navigate = useNavigate();
  const getIssuesCount = (department: string) => {
    // Fetch issues count for the department
    return 0;
  };


  // Sort data by value in descending order
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="space-y-4 p-4">
      {/* Top Departments Summary */}
      <div
        style={{
          display: "none",
        }}
        className="grid grid-cols-2 gap-4 mb-6"
      >
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-1">
            Top Department
          </h4>
          <p className="text-lg font-semibold text-blue-700">
            {sortedData[0]?.name}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-600">
              {sortedData[0]?.value} Projects
            </span>
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-orange-900 mb-1">
            Total Departments
          </h4>
          <p className="text-lg font-semibold text-orange-700">{data.length}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-sm text-orange-600">Active Departments</span>
          </div>
        </div>
      </div>

      {/* Department List */}
      {/* disabled scroll view max-h-[400px] overflow-y-auto */}
      <div className="space-y-3 pr-2">
        {sortedData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:border-blue-200 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500">{item.value} Projects</p>
              </div>

              <button
                onClick={() => navigate('/issues')}
                className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium hover:bg-red-100 transition-colors"
              >
                <AlertCircle className="w-3 h-3" />
                {item.issues} Issues
              </button>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  index === 0
                    ? "bg-blue-100 text-blue-700"
                    : index === 1
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                #{index + 1}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
