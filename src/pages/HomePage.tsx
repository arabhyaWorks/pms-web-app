import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import { Building2, IndianRupee, Activity, Users } from "lucide-react";
import MobileHeader from "../components/MobileHeader";
import StatsCard from "../components/StatsCard";
import ProjectStatusChart from "../components/ProjectStatusChart";
import BudgetChart from "../components/BudgetChart";
import { endpoint } from "../utils/dataSet.ts";
import { useEntities } from "../context/EntityContext.tsx";
import { DepartmentPieChart } from "../components/dashboardPieChart.tsx";
import { DepartmentBarChart } from "../components/DepartmentBarChart.tsx";
import {Download} from "lucide-react";

const projectStatusLabels = [
  "In Planning",
  "In Progress",
  "On Hold",
  "Delayed",
  "Completed",
];

export default function HomePage() {
  const [stats, setStats] = useState({});
  const [projectStatus, setProjectStatus] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const {entities} = useEntities();
  // Fetch Overall Stats Data
  const fetchStatsData = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/api/stats/budget-overview`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      // console.log(response.data);
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

   // Export Chart as PNG
   const exportChartAsPNG = (ref, filename) => {
    if (ref.current) {
      html2canvas(ref.current, { useCORS: true }).then((canvas) => {
        const link = document.createElement("a");
        link.download = `${filename}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  const fetchDepartmentData = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/api/stats/department-count`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      console.log(response.data);
      setDepartmentData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };


  const fetchProjectStatus = async () => {
    try {
      const response = await axios.get(`${endpoint}/api/stats/project-status`);
      // console.log(response.data.data);
      // console.log(response.data.data.filter((item) => item.project_status !== null ).map((item) => item.count));
      const values = response.data.data
        .filter((item) => item.project_status !== null)
        .map((item) => item.count);

      setProjectStatus(values);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStatsData();
    fetchDepartmentData();
    fetchProjectStatus();
  }, []);

  return (
    <div className="pb-20 pt-16">
      <MobileHeader />

      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Project Overview
        </h1>

        <div className="grid grid-cols-1 gap-4 mb-6">
          <StatsCard
            label="Total Projects"
            value={stats.totalProjects}
            icon={Building2}
          />

          <StatsCard
            label="Total Budget (Crores)"
            value={"₹" + stats?.totalBudget?.approved}
            icon={IndianRupee}
          />

          <StatsCard
            label="In Progress Projects"
            value={stats?.activeProjects?.count}
            icon={Activity}
          />
          <StatsCard label="Executing Agencies" value={entities?.length} icon={Users} />
        </div>

        <div className="space-y-6">
          <ProjectStatusChart
            labels={["In Progress", "Completed", "On Hold", "In Planning"]}
            counts={projectStatus}
          />
          <BudgetChart />
        </div>
        {/* Department-wise Project Count - Pie Chart */}
      <div className="rounded-lg bg-white shadow mt-6">
        <div className="px-6 py-5 flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Department-wise Project Count
          </h3>
          <button
            onClick={() =>
              exportChartAsPNG(pieChartRef, "DepartmentWisePieChart")
            }
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-1" />
            Export as PNG
          </button>
          {/* <button
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
            onClick={() => exportChartAsPNG(pieChartRef, "DepartmentWisePieChart")}
          >
            Export as PNG
          </button> */}
        </div>
        <div ref={pieChartRef} className="p-6">
          <DepartmentPieChart data={departmentData} />
        </div>
      </div>
      {/* Department-wise Project Count - Bar Chart */}
      <div className="rounded-lg bg-white shadow mt-6">
        <div className="px-6 py-5 flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Department-wise Project Count (Bar Chart)
          </h3>
          <button
            onClick={() =>
              exportChartAsPNG(barChartRef, "DepartmentWiseBarChart")
            }
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-1" />
            Export as PNG
          </button>
        </div>
        <div ref={barChartRef} className="">
          <DepartmentBarChart data={departmentData} />
        </div>
      </div>
      </div>
      
    </div>
  );
}
