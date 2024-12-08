import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Milestone,
  Shield,
  LogOut,
  Trash2,
  ChevronRight,
  Phone,
  Mail,
  Building,
} from "lucide-react";
import MobileHeader from "../components/MobileHeader";
import DeleteAccountModal from "../components/DeleteAccountModal";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const profileData = {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@gov.in",
    phone: "+91 9876543210",
    designation: "Project Manager",
    agency: "Central Public Works Department (CPWD)",
  };

  const handleLogout = () => {
    // Add logout logic here
    localStorage.clear();

    navigate("/");
  };

  const handleDeleteAccount = () => {
    // Add account deletion logic here

    // Store token in localStorage
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    {
      icon: Milestone,
      label: "Project Milestones",
      onClick: () => navigate("/milestones"),
      showChevron: true,
    },
    {
      icon: Shield,
      label: "Privacy Policy",
      onClick: () => navigate("/privacy"),
      showChevron: true,
    },
    {
      icon: Trash2,
      label: "Delete Account",
      onClick: () => setShowDeleteModal(true),
      className: "text-red-600",
      showChevron: false,
    },
    {
      icon: LogOut,
      label: "Logout",
      onClick: handleLogout,
      className: "text-orange-600",
      showChevron: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-16">
      <MobileHeader />

      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-orange-600" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-center text-gray-900">
              {profileData.name}
            </h2>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{profileData.email}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{profileData.phone}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span className="text-sm">{profileData.designation}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Building className="w-4 h-4" />
                <span className="text-sm">{profileData.agency}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`w-full flex items-center gap-3 p-4 text-gray-700 hover:bg-gray-50 ${
                index !== menuItems.length - 1 ? "border-b border-gray-100" : ""
              } ${item.className || ""}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.showChevron && (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}
