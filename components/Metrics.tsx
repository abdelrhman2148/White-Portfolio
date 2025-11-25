import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Metric, Theme } from '../types';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface MetricsProps {
  metrics: Metric[];
  theme: Theme;
}

const data = [
  { name: 'Jan', mttr: 60, deploy: 10 },
  { name: 'Feb', mttr: 55, deploy: 15 },
  { name: 'Mar', mttr: 40, deploy: 20 },
  { name: 'Apr', mttr: 35, deploy: 28 },
  { name: 'May', mttr: 20, deploy: 35 },
  { name: 'Jun', mttr: 15, deploy: 45 },
  { name: 'Jul', mttr: 12, deploy: 52 },
];

const Metrics: React.FC<MetricsProps> = ({ metrics, theme }) => {
  const isTerminal = theme === 'terminal';
  const isAccent = theme === 'accent';

  const strokeColor = isTerminal ? '#00ff41' : isAccent ? '#2563EB' : '#000000';

  return (
    <section className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {metrics.map((metric, idx) => (
          <div 
            key={idx}
            className={`
              p-6 flex flex-col justify-between h-32
              ${isTerminal ? 'border-2 border-green-900 bg-black text-green-500' : ''}
              ${isAccent ? 'bg-white border border-slate-200 shadow-sm rounded-xl' : ''}
              ${theme === 'minimal' ? 'bg-gray-50 border border-gray-100 rounded-lg' : ''}
            `}
          >
            <div className="flex justify-between items-start">
              <span className={`text-xs uppercase tracking-wider opacity-70`}>{metric.name}</span>
              {metric.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            </div>
            <div>
              <div className="text-3xl font-bold font-mono tracking-tighter">{metric.value}</div>
              <div className={`text-sm mt-1 ${metric.positive ? (isTerminal ? 'text-green-400' : 'text-green-600') : 'text-red-500'}`}>
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className={`
        w-full h-80 p-6 
        ${isTerminal ? 'border-2 border-green-900 bg-black/50' : ''}
        ${isAccent ? 'bg-white border border-slate-200 shadow-lg rounded-2xl' : ''}
        ${theme === 'minimal' ? 'bg-gray-50 rounded-xl' : ''}
      `}>
        <div className="flex items-center gap-2 mb-6">
          <Activity size={20} className={isTerminal ? 'text-green-500' : isAccent ? 'text-blue-600' : 'text-gray-900'} />
          <h3 className={`font-medium ${isTerminal ? 'text-green-500' : 'text-gray-900'}`}>System Performance Velocity</h3>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorDeploy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={isTerminal ? 0.3 : 0.1}/>
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              stroke={isTerminal ? '#333' : '#e5e7eb'} 
              tick={{fill: isTerminal ? '#00ff41' : '#6b7280', fontSize: 12}}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              hide={true} 
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isTerminal ? '#000' : '#fff',
                borderColor: isTerminal ? '#00ff41' : '#e5e7eb',
                color: isTerminal ? '#00ff41' : '#000',
              }}
            />
            <Area 
              type="monotone" 
              dataKey="deploy" 
              stroke={strokeColor} 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorDeploy)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default Metrics;