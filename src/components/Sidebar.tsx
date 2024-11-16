import React, { useState } from 'react';
import { 
  LayoutDashboard, Database, Calendar, ClipboardCheck, 
  PenTool, Receipt, FolderOpen, Milestone, AlertCircle, 
  BarChart2, Image, User, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import indiaLogo from '../assets/india-logo.png';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Database, label: 'Masters' },
  { icon: Calendar, label: 'Project Date Extend' },
  { icon: ClipboardCheck, label: 'Project Inspection' },
  { icon: PenTool, label: 'Project Essential Test' },
  { icon: Receipt, label: 'Budget & UC Upload' },
  { icon: FolderOpen, label: 'All Projects' },
  { icon: Milestone, label: 'Milestones' },
  { icon: AlertCircle, label: 'Issue Management' },
  { icon: BarChart2, label: 'Reports' },
  { icon: Image, label: 'Gallery' },
  { icon: User, label: 'Profile' },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <motion.div 
        className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white h-screen fixed left-0 top-0 border-r border-gray-200 flex flex-col transition-all duration-300 z-20`}
        animate={{ width: isCollapsed ? 80 : 256 }}
      >
        <div className="p-4 border-b border-gray-200">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <img src={indiaLogo} alt="India Logo" className="w-10 h-10" />
                <h1 className="text-xl font-bold text-gray-900">PMS Ayodhya</h1>
              </motion.div>
            )}
          </AnimatePresence>
          {isCollapsed && (
            <div className="flex justify-center">
              <img src={indiaLogo} alt="India Logo" className="w-10 h-10" />
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors ${
                    item.active ? 'bg-orange-50 text-orange-600' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </a>
        </div>
      </motion.div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed left-[256px] top-6 z-30 bg-white rounded-full p-1.5 shadow-lg border border-gray-200 hover:bg-orange-50 transition-all duration-300"
        style={{ 
          transform: isCollapsed ? 'translateX(-176px)' : 'none'
        }}
      >
        {isCollapsed ? (
          <ChevronRight className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        )}
      </button>
    </>
  );
}