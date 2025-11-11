import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#34d399', '#f87171']; // healthy, bleached

const renderCustomizedLabel = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const pct = Math.round(percent * 100);

  if (pct === 0) return null;

  return (
    <text x={x} y={y} fill="#111827" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-sm">
      {payload.name}: {pct}%
    </text>
  );
};

const HealthChart = ({ healthyPercent, data }) => {
  const healthy = Math.max(0, Math.min(100, typeof healthyPercent === 'number' ? healthyPercent : data?.healthy ?? 0));
  const bleached = 100 - healthy;

  const chartData = [
    { name: 'Healthy', value: healthy },
    { name: 'Bleached', value: bleached },
  ];

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-4">
        <h4 className="text-xl font-semibold text-gray-900">Coral Health Distribution</h4>
      </div>
      <div className="rounded-2xl bg-green-50 p-4 shadow-sm">
        <div className="w-full" style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.15" />
                </filter>
              </defs>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                innerRadius={0}
                startAngle={90}
                endAngle={-270}
                labelLine={false}
                label={renderCustomizedLabel}
                isAnimationActive={true}
                animationBegin={100}
                animationDuration={800}
                style={{ filter: 'url(#shadow)' }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HealthChart;


