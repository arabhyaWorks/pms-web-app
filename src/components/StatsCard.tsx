import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: {
    value: number;
    label: string;
  };
  iconColor?: string;
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  change = { value: Math.floor(Math.random() * 10) + 1, label: "from last month" },
  iconColor = "text-orange-600",
}: StatsCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${iconColor.replace("text", "bg")}/10`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm text-gray-600">{label}</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <span
                className={`text-xs ${
                  change.value > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {change.value > 0 ? "+" : ""}
                {change.value}% {change.label}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
