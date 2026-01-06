
import React from 'react';
import Icon from '../../components/Icon';

interface SmartHomePageProps {
  onBack: () => void;
}

const SmartHomePage: React.FC<SmartHomePageProps> = ({ onBack }) => {
  const sensors = [
    { id: '1', name: 'Main Water Inlet', status: 'Optimal', value: '14 PSI', icon: 'droplets', health: 98 },
    { id: '2', name: 'Panel B Breaker', status: 'Normal', value: '110V', icon: 'zap', health: 94 },
    { id: '3', name: 'Air Scrubber Z', status: 'Active', value: 'AQI 12', icon: 'wind', health: 88 },
    { id: '4', name: 'Nexus Hub V1', status: 'Online', value: 'v4.2', icon: 'satellite', health: 100 },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Home Health</h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Global infrastructure monitor</p>
          </div>
        </div>
        <div className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">96% Status</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sensors.map(sensor => (
          <div key={sensor.id} className="bg-glass p-8 rounded-[40px] border border-white/5 space-y-6 group hover:border-blue-500/40 transition-all">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                <Icon name={sensor.icon} className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{sensor.status}</p>
                <p className="text-xl font-black text-white tracking-tighter">{sensor.value}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                <span className="text-slate-500">Integrity</span>
                <span className="text-blue-400">{sensor.health}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-1000" 
                  style={{ width: `${sensor.health}%` }} 
                />
              </div>
            </div>
            <p className="text-xs font-black text-white uppercase tracking-tight truncate">{sensor.name}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-[56px] p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 -rotate-12 pointer-events-none">
          <Icon name="droplets" className="w-64 h-64 text-white" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 text-center lg:text-left">
            <h3 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">Neural Leak Detection</h3>
            <p className="text-slate-400 text-lg max-w-xl font-medium">Your home is currently 100% dry. Our AI vision nodes are scanning for moisture anomalies every 4 hours.</p>
            <div className="flex gap-4 justify-center lg:justify-start">
               <span className="px-4 py-1.5 bg-blue-500/10 rounded-xl text-[10px] font-black text-blue-400 uppercase tracking-widest border border-blue-500/20">Zonal Scan Active</span>
               <span className="px-4 py-1.5 bg-white/5 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest border border-white/10">Next Scan: 2:00 PM</span>
            </div>
          </div>
          <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-3xl shadow-2xl hover:bg-blue-600 hover:text-white transition-all active:scale-95">
            Recalibrate Sensors
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartHomePage;
