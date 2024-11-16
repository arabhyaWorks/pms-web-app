import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart2, Images, FolderOpen, AlertCircle } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Images, label: 'Gallery', path: '/gallery' },
    { icon: FolderOpen, label: 'Projects', path: '/projects' },
    { icon: AlertCircle, label: 'Issues', path: '/issues' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center py-3 px-5 ${
              location.pathname === item.path
                ? 'text-orange-500'
                : 'text-gray-600'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}