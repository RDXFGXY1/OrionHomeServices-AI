
import React from 'react';

interface AnalyticsPageProps {
  onBack: () => void;
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ onBack }) => {
  const stats = [
    { label: 'Asset Value Impact', value: '+$12.4k', trend: 'Maintenance ROI', color: 'text-emerald-400' },
    { label: 'Market Price Index', value: 'Stable', trend: 'Local Avg', color: 'text-blue-400' },
    { label: 'Service Reliability', value: '99.8%', trend: 'Expert Vetting', color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <div className="flex items-center gap-6">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Market Analytics</h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Home Equity & Service Valuation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map(stat => (
          <div key={stat.label} className="bg-glass p-8 rounded-[40px] border border-white/5 space-y-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-baseline justify-between">
              <h3 className={`text-4xl font-black ${stat.color} tracking-tighter`}>{stat.value}</h3>
              <span className="text-[10px] font-bold text-slate-400">{stat.trend}</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-current opacity-40 w-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-[56px] p-12 relative overflow-hidden">
        <div className="relative z-10 space-y-8">
           <div className="flex justify-between items-end">
              <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none">Regional Service Costs</h3>
              <div className="flex gap-4">
                 <span className="text-[9px] font-black text-slate-500 uppercase">NYC Average</span>
                 <span className="text-[9px] font-black text-blue-400 uppercase">Your Projects</span>
              </div>
           </div>
           <div className="aspect-[21/9] w-full bg-white/2 rounded-3xl border border-white/5 flex items-end p-8 gap-4">
              {[60, 40, 85, 30, 55, 90, 45, 75, 20, 95, 65, 50].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-600/20 border-t-2 border-blue-500 group relative cursor-pointer" style={{ height: `${h}%` }}>
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[8px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Sector {i+1}</div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
