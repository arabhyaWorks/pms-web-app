import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, BarChart2, Clock, Share2 } from "lucide-react";
import image from "../assets/image.png";
import ProfileButton from "../components/ProfileButton";

export default function WelcomePage() {
  const navigate = useNavigate();



  useEffect(() => {
    // Redirect to login page if user is not authenticated
    if (!localStorage.getItem("userInfo")) {
      // navigate("/login");
    }else {
      navigate("/dashboard");
    }

  }, []);

  const features = [
    {
      icon: TrendingUp,
      title: "Track Projects",
    },
    {
      icon: BarChart2,
      title: "Informative Dashboard",
    },
    {
      icon: Clock,
      title: "Reports & Analytics",
    },
    {
      icon: Share2,
      title: "Milestone Tracking",
    },
  ];

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
        <div className="w-10 h-10" /> {/* Spacer for alignment */}
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
          tracked & managed as required. These parameters include, Project
          latest inspection report, Project essential test section, Budget
          installments received & UC of installments uploaded, Milestones
          achieved & Issues reported for project.
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

      {/* Sign In Button */}
      <div className="px-4 py-8">
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-[#FF4400] text-white text-xl font-medium py-4 rounded-xl hover:bg-[#E63E00] transition-colors"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}