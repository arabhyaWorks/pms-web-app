import React from 'react';
import { User, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfileButton() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={() => navigate('/help')}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <HelpCircle className="w-6 h-6 text-gray-600" />
      </button>
      <button 
        onClick={() => navigate('/profile')}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <User className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
}