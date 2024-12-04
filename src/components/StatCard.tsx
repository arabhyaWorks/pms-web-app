import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Folder } from 'lucide-react';

interface StatCardProps {
  title: string;
  projectCount: number;
  issuesCount: number;
}

export default function StatCard({ title, projectCount, issuesCount }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg p-6 transition-all duration-200 border border-gray-100 hover:border-orange-100"
    >
      <h3 className="text-sm font-medium text-gray-700 mb-4 h-12 line-clamp-2">{title}</h3>
      
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Folder className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-gray-600">Projects</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{projectCount}</p>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-gray-600">Issues</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{issuesCount}</p>
        </div>
      </div>
    </motion.div>
  );
}