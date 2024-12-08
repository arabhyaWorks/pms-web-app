import React from 'react';
import ProfileButton from './ProfileButton';

export default function MobileHeader() {
  return (
    <header className="bg-white px-4 py-3 flex items-center justify-between shadow-sm fixed top-0 left-0 right-0 z-50">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Seal_of_Uttar_Pradesh.svg"
        alt="UP Logo"
        className="w-10 h-10"
      />
      <h1 className="text-lg font-bold text-gray-900">PMS Bhadohi</h1>
      <ProfileButton />
    </header>
  );
}