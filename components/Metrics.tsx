import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { Metric, Theme } from '../types';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface MetricsProps {
  metrics: Metric[];
  theme: Theme;
}

// More dynamic data simulating a DevOps success story
// Velocity increasing while Load stabilizes/optimizes
const data = [
  { name: 'Sprint 1', velocity: 30, load: 85, stability: 40 },
  { name: 'Sprint 2', velocity: 45, load: 75, stability: 55 },
  { name: 'Sprint 3', velocity: 40, load: 80, stability: 60 },
  { name: 'Sprint 4', velocity: 55, load: 60, stability: 75 },
  { name: 'Sprint 5', velocity: 70, load: 55, stability: 85 },
  { name: 'Sprint 6', velocity: 65, load: 45, stability: 88 },
  { name: 'Current',  velocity: 88, load: 35, stability: 98 },
];

const Metrics: React.FC<MetricsProps> = ({ metrics, theme }) => {
  const isTerminal = theme === 'terminal';
  const isAccent = theme === 'accent';

  // Theme-specific colors
  const primaryColor = isTerminal ? '#00ff41' : isAccent ? '#2563EB' : '#111827';
  const secondaryColor = isTerminal ? '#004400' : isAccent ? '#93C5FD' : '#9CA3AF';
  const gridColor = isTerminal ? '#002200' : '#E2E8F0';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`
          p-3 border text-xs font-mono shadow-2xl backdrop-blur-md
          ${isTerminal ? 'bg-black/90 border-green-500 text-green-500' : ''}
          ${isAccent ? 'bg-white/90 border-blue-100 text-slate-800 rounded-lg' : ''}
          ${theme === 'minimal' ? 'bg-white border-gray-200 text-gray-900' : ''}
        `}>
          <div className="font-bold mb-2 uppercase tracking-wider border-b border-dashed border-current pb-1 opacity-70">
            {label} Stats
          </div>
          <div className="flex items-center gap-3 mb-1">
            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
            <span className="font-bold">VELOCITY:</span> {payload[0].value} pts
          </div>
          <div className="flex items-center gap-3 opacity-80">
            <span className="w-2 h-2 rounded-full border border-current"></span>
            <span>SYS_LOAD:</span> {payload[1]?.value}%
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="w-full">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {metrics.map((metric, idx) => (
          <div 
            key={idx}
            className={`
              p-6 flex flex-col justify-between h-32 transition-all duration-300 hover:-translate-y-1
              ${isTerminal ? 'border border-green-900 bg-black/60 text-green-500 hover:border-green-500 hover:shadow-[0_0_15px_rgba(0,255,65,0.2)]' : ''}
              ${isAccent ? 'bg-white border border-slate-100 shadow-sm hover:shadow-lg rounded-xl' : ''}
              ${theme === 'minimal' ? 'bg-gray-50 border border-gray-100 rounded-lg hover:border-gray-300' : ''}
            `}
          >
            <div className="flex justify-between items-start">
              <span className={`text-[10px] font-bold uppercase tracking-widest opacity-60`}>{metric.name}</span>
              {metric.positive ? <TrendingUp size={16} className="opacity-80"/> : <TrendingDown size={16} />}
            </div>
            <div>
              <div className="text-3xl font-bold font-mono tracking-tighter">{metric.value}</div>
              <div className={`text-xs font-bold mt-2 inline-block px-2 py-0.5 rounded-full ${
                metric.positive 
                  ? (isTerminal ? 'bg-green-900/30 text-green-400' : isAccent ? 'bg-green-100 text-green-700' : 'bg-black text-white') 
                  : 'bg-red-100 text-red-600'
              }`}>
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Chart */}
      <div className={`
        w-full h-96 p-6 relative overflow-hidden transition-all duration-500
        ${isTerminal ? 'border border-green-900 bg-black/80 shadow-[inset_0_0_50px_rgba(0,50,0,0.5)]' : ''}
        ${isAccent ? 'bg-white border border-slate-200 shadow-xl rounded-2xl' : ''}
        ${theme === 'minimal' ? 'bg-gray-50 rounded-xl border border-gray-200' : ''}
      `}>
        <div className="flex justify-between items-center mb-6 relative z-10">
           <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isTerminal ? 'bg-green-900/20' : isAccent ? 'bg-blue-50' : 'bg-gray-200'}`}>
              <Activity size={20} className={isTerminal ? 'text-green-500' : isAccent ? 'text-blue-600' : 'text-gray-900'} />
            </div>
            <div>
              <h3 className={`font-bold uppercase tracking-widest text-sm ${isTerminal ? 'text-green-500' : 'text-gray-900'}`}>
                Telemetry
              </h3>
              <p className="text-xs opacity-60 font-mono">Real-time Deployment Velocity vs Load</p>
            </div>
           </div>
           
           {/* Legend */}
           <div className="flex gap-4 text-xs font-mono opacity-70">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-1 ${isTerminal ? 'bg-green-500' : 'bg-blue-600'}`}></span> Velocity
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-1 border border-current border-dashed`}></span> Optimization
              </div>
           </div>
        </div>

        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={isTerminal ? 0.3 : 0.4}/>
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
              </linearGradient>
              
              {isTerminal && (
                 <filter id="neonGlow" height="130%">
                   <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
                   <feFlood floodColor="#00ff41" result="color"/>
                   <feComposite in="color" in2="blur" operator="in" result="glow"/>
                   <feMerge>
                     <feMergeNode in="glow"/>
                     <feMergeNode in="SourceGraphic"/>
                   </feMerge>
                 </filter>
              )}
            </defs>
            
            <CartesianGrid 
              strokeDasharray={isTerminal ? "2 10" : "3 3"} 
              vertical={isTerminal}
              horizontal={true}
              stroke={gridColor} 
              opacity={isTerminal ? 0.3 : 0.5}
            />
            
            <XAxis 
              dataKey="name" 
              stroke={isTerminal ? '#004400' : '#94a3b8'} 
              tick={{fill: isTerminal ? '#006622' : '#94a3b8', fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold'}}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            
            <YAxis 
              tick={{fill: isTerminal ? '#006622' : '#94a3b8', fontSize: 10, fontFamily: 'monospace'}}
              axisLine={false}
              tickLine={false}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: primaryColor, strokeWidth: 1, strokeDasharray: '4 4' }} />
            
            {/* Target Line */}
            <ReferenceLine y={90} label="" stroke={isTerminal ? '#004400' : '#e2e8f0'} strokeDasharray="3 3" />

            {/* Load Line (Secondary) */}
            <Area 
              type="monotone"
              dataKey="load" 
              stroke={secondaryColor} 
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="none" 
              animationDuration={2000}
              animationBegin={500}
            />

            {/* Velocity Line (Primary) */}
            <Area 
              type="monotone" 
              dataKey="velocity" 
              stroke={primaryColor} 
              strokeWidth={isTerminal ? 2 : 3}
              fill="url(#colorVelocity)" 
              filter={isTerminal ? "url(#neonGlow)" : ""}
              animationDuration={1500}
              activeDot={{ r: 6, strokeWidth: 0, fill: primaryColor }}
            />
            
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default Metrics;