// components/dashboard/DepartmentBarChart.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function DepartmentBarChart({ data }) {
  return (
    <div className="w-full" style={{ height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 40,
            bottom: 120
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
            tick={{fontSize: 12}}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4f46e5" name="Projects" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}