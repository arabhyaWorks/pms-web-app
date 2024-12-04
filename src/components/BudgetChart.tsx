import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const budgetData = {
  labels: ['Total'],
  datasets: [
    {
      label: 'Sanctioned Budget',
      data: [220000],
      backgroundColor: '#0ea5e9',
    },
    {
      label: 'Released Budget',
      data: [20000],
      backgroundColor: '#10b981',
    },
    {
      label: 'Pending Budget',
      data: [180000],
      backgroundColor: '#f97316',
    }
  ]
};

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Amount (in Lacs)'
      }
    }
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: 'Budget Overview (in Lacs)'
    }
  }
};

export default function BudgetChart() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <Bar data={budgetData} options={options} />
    </div>
  );
}