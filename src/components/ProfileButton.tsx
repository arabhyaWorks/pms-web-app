import React from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfileButton() {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/profile')}
      className="p-2 hover:bg-gray-100 rounded-full relative"
    >
      <User className="w-6 h-6 text-gray-600" />
    </button>
  );
}