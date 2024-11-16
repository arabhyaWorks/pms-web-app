import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const statusData = {
  labels: ['In Progress', 'Completed', 'On Hold', 'In Planning'],
  datasets: [{
    data: [45, 30, 15, 10],
    backgroundColor: [
      '#0ea5e9', // blue
      '#10b981', // green
      '#fbbf24', // yellow
      '#f97316'  // orange
    ],
    borderWidth: 0
  }]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
      }
    }
  }
};

export default function ProjectStatusChart() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">Project Status Distribution</h2>
      <Pie data={statusData} options={options} />
    </div>
  );
}