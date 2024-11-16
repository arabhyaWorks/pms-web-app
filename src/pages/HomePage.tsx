import React from 'react';
import { Building2, IndianRupee, Activity, Users } from 'lucide-react';
import MobileHeader from '../components/MobileHeader';
import StatsCard from '../components/StatsCard';
import ProjectStatusChart from '../components/ProjectStatusChart';
import BudgetChart from '../components/BudgetChart';

export default function HomePage() {
  const stats = [
    {
      icon: Building2,
      label: 'Total Projects',
      value: '156',
      change: { value: 12, label: 'from last month' },
      iconColor: 'text-blue-500',
    },
    {
      icon: IndianRupee,
      label: 'Total Budget (Lacs)',
      value: '₹209,040.72',
      iconColor: 'text-green-500',
    },
    {
      icon: Activity,
      label: 'Active Projects',
      value: '45',
      change: { value: 8, label: 'from last month' },
      iconColor: 'text-orange-500',
    },
    {
      icon: Users,
      label: 'Executing Agencies',
      value: '6',
      iconColor: 'text-purple-500',
    },
  ];

  return (
    <div className="pb-20 pt-16">
      <MobileHeader />

      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 gap-4 mb-6">
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="space-y-6">
          <ProjectStatusChart />
          <BudgetChart />
        </div>
      </div>
    </div>
  );
}
