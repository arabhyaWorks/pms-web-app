import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';


const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7c43', '#f95d6a', 
  '#665191', '#2f4b7c', '#a05195', '#d45087', '#f95d6a',
  '#ff7c43', '#ffa600', '#003f5c', '#58508d', '#bc5090',
  '#ff6361', '#ffa600', '#488f31', '#de425b', '#69b3a2'
];

interface DepartmentData {
  name: string;
  value: number;
}

interface Props {
  data: DepartmentData[];
}

export function DepartmentPieChart({ data }: Props) {
  return (
    <div className="w-full h-[500px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              value,
              index
            }) => {
              const RADIAN = Math.PI / 180;
              const radius = outerRadius * 1.35;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="#374151"
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  fontSize="12"
                >
                  {`${data[index].name} (${value})`}
                </text>
              );
            }}
            outerRadius={160}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value} Projects`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}