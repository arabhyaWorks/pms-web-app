import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Images, FolderOpen, AlertCircle, Milestone } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Images, label: 'Gallery', path: '/gallery' },
    { icon: FolderOpen, label: 'Projects', path: '/projects' },
    { icon: Milestone, label: 'Milestones', path: '/milestones' },
    { icon: AlertCircle, label: 'Issues', path: '/issues' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 w-full">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center py-2 ${
              location.pathname === item.path
                ? 'text-orange-500'
                : 'text-gray-600'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs mt-1 truncate max-w-[64px]">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}