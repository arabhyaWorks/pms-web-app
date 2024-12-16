import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { DepartmentLegend } from './DepartmentLegend';
import { CustomTooltip } from './CustomTooltip';
import { CHART_COLORS } from './constants';

interface DepartmentData {
  name: string;
  value: number;
}

interface Props {
  data: DepartmentData[];
}

export function DepartmentPieChart({ data }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2" style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full md:w-1/2">
        <DepartmentLegend data={data} colors={CHART_COLORS} />
      </div>
    </div>
  );
}