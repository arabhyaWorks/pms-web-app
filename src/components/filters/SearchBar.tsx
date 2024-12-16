import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  showFilters,
  onToggleFilters,
}: SearchBarProps) {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
      </div>
      <button
        onClick={onToggleFilters}
        className={`px-4 py-2 rounded-lg border ${
          showFilters 
            ? 'bg-orange-50 border-orange-200 text-orange-600' 
            : 'bg-white border-gray-300 text-gray-600'
        } flex items-center gap-2`}
      >
        <Filter className="w-5 h-5" />
        Filters
      </button>
    </div>
  );
}