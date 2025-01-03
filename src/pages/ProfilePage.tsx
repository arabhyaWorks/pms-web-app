import React, { useState, useEffect } from "react";
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
import { endpoint } from "../utils/dataSet";
import { useEntities } from "../context/EntityContext";
import { use } from "framer-motion/client";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const USER_ROLES = [
    "Super Admin",
    "Admin",
    "Project Manager",
    "Data Operator",
  ];

  const profileData = {
    name: user?.userName || "",
    email: user?.userEmail || "",
    phone: user?.userPhoneNumber || "",
    userRole: user?.userRole || "",
    designation: user?.userDesignation || "",
    agency: user?.entityName || "",
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

  const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  console.log("isIOS", isIOS);  


  useEffect(() => {
    console.log("User", user);
  }, [user]);

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

              {/* <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{profileData.phone}</span>
              </div> */}

              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span className="text-sm">
                  {USER_ROLES[parseInt(profileData.userRole) - 1]}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span className="text-sm">{profileData.designation}</span>
              </div>

              {
                !isIOS ? 
                <div className="flex items-center gap-2 text-gray-600">
                  <Building className="w-4 h-4" />
                  <span className="text-sm">{profileData.agency}</span>
                </div> : null
              }
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
