import React from 'react';

interface LegendProps {
  data: Array<{ name: string; value: number }>;
  colors: string[];
}

export function DepartmentLegend({ data, colors }: LegendProps) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Department Distribution</h3>
      <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-3 group">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <p className="text-sm text-gray-600 truncate" title={entry.name}>
                  {entry.name}
                </p>
                <span className="text-sm font-medium text-gray-900 ml-2">
                  {entry.value}
                </span>
              </div>
              <div className="mt-1 w-full bg-gray-100 rounded-full h-1">
                <div
                  className="h-1 rounded-full transition-all"
                  style={{
                    width: `${(entry.value / Math.max(...data.map(d => d.value))) * 100}%`,
                    backgroundColor: colors[index % colors.length]
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}