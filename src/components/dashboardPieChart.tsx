import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7c43",
  "#f95d6a",
  "#665191",
  "#2f4b7c",
  "#a05195",
  "#d45087",
  "#f95d6a",
  "#ff7c43",
  "#ffa600",
  "#003f5c",
  "#58508d",
  "#bc5090",
  "#ff6361",
  "#ffa600",
  "#488f31",
  "#de425b",
  "#69b3a2",
];

interface DepartmentData {
  name: string;
  value: number;
}

interface Props {
  data: DepartmentData[];
}

export function DepartmentPieChart({ data }: Props) {
  const CustomTooltip = ({ active, payload }: any) => {
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
  };

  // Custom legend
  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="grid grid-cols-2 gap-2 mt-4 max-h-[300px] overflow-y-auto">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span
              className="text-xs text-gray-600 truncate"
              title={entry.value}
            >
              {entry.value}{" "}
              <span className="text-xs font-semibold text-gray-800">
                ({entry.payload.value})
              </span>
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full" style={{ height: "600px" }}>
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
                fill={COLORS[index % COLORS.length]}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
