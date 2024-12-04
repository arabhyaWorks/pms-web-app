import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, BarChart2, Clock, Share2 } from 'lucide-react';

export default function WelcomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: TrendingUp,
      title: 'Track Projects',
    },
    {
      icon: BarChart2,
      title: 'Informative Dashboard',
    },
    {
      icon: Clock,
      title: 'Reports & Analytics',
    },
    {
      icon: Share2,
      title: 'Milestone Tracking',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Seal_of_Uttar_Pradesh.svg"
            alt="UP Logo"
            className="w-10 h-10"
          />
          <h1 className="text-xl font-bold">PMS Bhadohi</h1>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[300px] bg-gray-900 text-white flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
          alt="Building"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative text-center px-4">
          <h1 className="text-3xl font-bold mb-2">Program Management</h1>
          <h2 className="text-3xl font-bold">System Bhadohi</h2>
        </div>
      </div>

      {/* About Section */}
      <div className="px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">About PMS</h2>
        <p className="text-gray-600 leading-relaxed">
          Project Management System is an online platform where organization can monitor the health status of ongoing development projects in a city/division on a one-click basis. This system has multiple parameters through which both the quality & the progress can be tracked & managed as required. These parameters include, Project latest inspection report, Project essential test section, Budget installments received & UC of installments uploaded, Milestones achieved & Issues reported for project.
        </p>
      </div>

      {/* Features Section */}
      <div className="px-4 py-8 bg-gray-50">
        <h2 className="text-2xl font-bold mb-6">Our Features</h2>
        <div className="grid grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-2">
                <feature.icon className="w-8 h-8 text-orange-500" />
              </div>
              <span className="text-sm text-center font-medium">{feature.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sign In Button */}
      <div className="px-4 py-8">
        <button
          onClick={() => navigate('/login')}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}