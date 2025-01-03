import React from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProjectStatusChart({ labels, counts }) {
  const navigate = useNavigate();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
    onClick: (event, elements, chart) => {
      // elements[0] contains the information about the clicked section
      console.log(elements[0].index);

      navigate("/projects", {
        state: {
          selectedProjectStatus: `${parseInt(elements[0].index) + 1}`,
          fromDashboard: true,
        },
      });
      if (elements && elements.length > 0) {
        
      }
    },
  };

  const statusData = {
    labels: labels,
    datasets: [
      {
        data: counts,
        backgroundColor: [
          "#10b981", // green
          "#0ea5e9", // blue
          "#FB1216", // red
          "#fbbf24", // yellow
          "#f97316", // orange
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">
        Project Status Distribution
      </h2>
      <Pie data={statusData} options={options} />
    </div>
  );
}
