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
import { Download } from "lucide-react";

export default function HomePage() {
  const { entities, reloadEntities } = useEntities();
  // const user = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [dashboardStats, setDashboardStats] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [departmentData, setDepartmentData] = useState([]);

  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  // Fetch Overall Stats Data

  const fetchDashboardStats = async () => {
    if (!user?.entityId || !user?.entityTypeId) {
      setError("Entity ID or Entity Type ID is missing.");
      return;
    }

    setLoading(true);
    setError("");

    const paramsData = {
      entityId: user.entityId,
      entityTypeId: user.entityTypeId,
    };
    // console.log("paramsData", paramsData);
    try {
      const response = await axios.get(
        `${endpoint}/api/entity-overview`,
        user.userRole == 1 ? {} : { params: paramsData }
      );

      if (response.data.success) {
        console.log("response.data.data", response.data.data);
        setDashboardStats(response.data.data);
      } else {
        setError("Failed to fetch data. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while fetching data."
      );
      console.error("Error fetching dashboard stats:", err);
    } finally {
      setLoading(false);
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
      setDepartmentData(response.data.data || []);
    } catch (error) {
      console.error(error);
      setDepartmentData([]);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardStats();
    }
    fetchDepartmentData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const projectStatusLabels = dashboardStats?.projectStatusDistribution?.map(
    (data) => data.status
  );

  const projectStatusCounts = dashboardStats?.projectStatusDistribution?.map(
    (data) => data.count
  );
  const budgetData = {
    labels: ["Total"],
    datasets: [
      {
        label: "Sanctioned Budget",
        data: [dashboardStats?.totalApprovedBudget || 0],
        backgroundColor: "#0ea5e9",
      },
      {
        label: "Released Budget",
        data: [dashboardStats?.totalReleasedFunds || 0],
        backgroundColor: "#10b981",
      },
      {
        label: "Expenditure",
        data: [dashboardStats?.totalExpenditure || 0],
        backgroundColor: "#FB1216",
      },
      {
        label: "Pending Budget",
        data: [dashboardStats?.totalPendingBudget || 0],
        backgroundColor: "#f97316",
      },
    ],
  };

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
            value={dashboardStats?.totalProjects || 0}
            icon={Building2}
          />

          <StatsCard
            label="Total Budget (Crores)"
            value={`₹${dashboardStats?.cumulativeTotalBudget || 0}`}
            icon={IndianRupee}
          />

          <StatsCard
            label="In Progress Projects"
            value={dashboardStats?.inProgressProjects || 0}
            icon={Activity}
          />
          <StatsCard
            label="Executing Agencies"
            value={
              user?.userRole == 3 || user?.userRole == 4
                ? dashboardStats?.totalRelatedEntities || 0
                : entities?.filter((entity) => entity.entity_type === 2)
                    .length || 0
            }
            icon={Users}
          />
        </div>

        <div className="space-y-6">
          <ProjectStatusChart
            labels={projectStatusLabels}
            counts={projectStatusCounts}
          />
          <BudgetChart budgetData={budgetData} />
        </div>

        {user?.userRole == 1 && (
          <>
            {/* Department-wise Project Count - Pie Chart */}
            <div className="rounded-lg bg-white shadow mt-6">
              <div className="px-6 py-5 flex justify-between items-center">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Department-wise Project Count
                </h3>
              </div>
              <div ref={pieChartRef} className="p-6">
                <DepartmentPieChart data={departmentData} />
              </div>
            </div>
            {/* Department-wise Project Count - Bar Chart */}
            <div className="rounded-lg bg-white shadow mt-6">
              <div className="px-6 py-5 flex justify-between items-center">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Department-wise Project Count <br /> (Bar Chart)
                </h3>
              </div>
              <div ref={barChartRef} className="">
                <DepartmentBarChart data={departmentData} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
