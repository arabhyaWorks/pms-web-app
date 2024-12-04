import React from 'react';
import { Filter } from 'lucide-react';

interface AgencyFilterProps {
  selectedAgency: string;
  onAgencyChange: (agency: string) => void;
  onReset: () => void;
}

export default function AgencyFilter({ 
  selectedAgency, 
  onAgencyChange, 
  onReset 
}: AgencyFilterProps) {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-xs">
          <select
            value={selectedAgency}
            onChange={(e) => onAgencyChange(e.target.value)}
            className="w-full pl-3 pr-10 py-2 text-sm border rounded-lg appearance-none bg-white"
          >
            <option>All Executing Agencies</option>
            <option>Bandhi Prakhand</option>
            <option>PWD Chandauli</option>
          </select>
          <Filter className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 text-orange-600 border border-orange-600 rounded-lg text-sm"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}