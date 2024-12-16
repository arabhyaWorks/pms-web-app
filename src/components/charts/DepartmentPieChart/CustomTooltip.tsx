import React from 'react';

export function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-sm text-gray-600">
          Projects: <span className="font-medium">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
}