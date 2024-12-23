import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, BarChart2, Clock, Share2, Building2, IndianRupee, Activity, Users } from "lucide-react";
import image from "../assets/image.png";
import StatsCard from "../components/StatsCard";
import ProjectStatusChart from "../components/ProjectStatusChart";
import BudgetChart from "../components/BudgetChart";
import { DepartmentPieChart } from "../components/dashboardPieChart";
import { DepartmentBarChart } from "../components/DepartmentBarChart";
import axios from "axios";
import { endpoint } from "../utils/dataSet";

export default function WelcomePage() {
  const navigate = useNavigate();
  const [dashboardStats, setDashboardStats] = useState({});
  const [departmentData, setDepartmentData] = useState([]);
  const pieChartRef = useRef(null);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${endpoint}/api/entity-overview`);
      if (response.data.success) {
        setDashboardStats(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    }
  };

  const fetchDepartmentData = async () => {
    try {
      const response = await axios.get(`${endpoint}/api/stats/department-count`);
      setDepartmentData(response.data.data || []);
    } catch (error) {
      console.error(error);
      setDepartmentData([]);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchDepartmentData();
  }, []);

  const features = [
    { icon: TrendingUp, title: "Track Projects" },
    { icon: BarChart2, title: "Informative Dashboard" },
    { icon: Clock, title: "Reports & Analytics" },
    { icon: Share2, title: "Milestone Tracking" },
  ];

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center justify-between shadow-sm fixed top-0 left-0 right-0 z-50">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Seal_of_Uttar_Pradesh.svg"
          alt="UP Logo"
          className="w-10 h-10"
        />
        <h1 className="text-lg font-bold text-gray-900">PMS Bhadohi</h1>
        <button
          onClick={() => navigate("/login")}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
        >
          <Users className="w-5 h-5 text-gray-600" />
        </button>
      </header>

      {/* Hero Section */}
      <img
        src={image}
        alt="Building"
        className="w-full h-auto object-cover mt-[60px]"
      />

      {/* About Section */}
      <div className="px-4 py-4">
        <h2 className="text-[20px] font-bold text-black mb-4">About PMS</h2>
        <p className="text-[17px] text-[#666666] leading-[1.6]">
          Project Monitoring System is an online platform where organization can
          monitor the health status of ongoing development projects in a
          city/division on a one-click basis. This system has multiple
          parameters through which both the quality & the progress can be
          tracked & managed as required.
        </p>
      </div>

      {/* Features Section */}
      <div className="px-4 py-4">
        <h2 className="text-[20px] font-bold text-black mb-8">Our Features</h2>
        <div className="grid grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-[50px] h-[50px] bg-[#F8F8F8] rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-[#363636]" />
              </div>
              <span className="text-center text-[15px] font-medium text-black">
                {feature.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Stats Section */}
      <div className="px-4 py-6 bg-gray-50">
        <h2 className="text-[20px] font-bold text-black mb-6">Project Overview</h2>

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
            value={dashboardStats?.totalRelatedEntities || 0}
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
        <div ref={pieChartRef} className="p-6">
          <DepartmentPieChart data={departmentData} />
        </div>
      </div>

      {/* Sign In Button */}
      <div className="px-4 py-8">
        {/* <button
          onClick={() => navigate("/login")}
          className="w-full bg-[#FF4400] text-white text-xl font-medium py-4 rounded-xl hover:bg-[#E63E00] transition-colors"
        >
          Sign In
        </button> */}
      </div>
    </div>
  );
}