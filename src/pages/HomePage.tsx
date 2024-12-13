import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import { Building2, IndianRupee, Activity, Users } from "lucide-react";
import MobileHeader from "../components/MobileHeader";
import StatsCard from "../components/StatsCard";
import ProjectStatusChart from "../components/ProjectStatusChart";
import BudgetChart from "../components/BudgetChart";
import { endpoint } from "../utils/dataSet.ts";

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
          <StatsCard label="Executing Agencies" value="6" icon={Users} />
        </div>

        <div className="space-y-6">
          <ProjectStatusChart
            labels={["In Progress", "Completed", "On Hold", "In Planning"]}
            counts={projectStatus}
          />
          <BudgetChart />
        </div>
      </div>
    </div>
  );
}
