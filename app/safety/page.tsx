
import React from 'react';

const SafetyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const guidelines = [
    { title: "Cut the Power", desc: "Always disable the main breaker before touching any electrical wiring.", icon: "⚡" },
    { title: "Main Water Valve", desc: "Locate and shut off your water main before attempting plumbing repairs.", icon: "💧" },
    { title: "Protective Gear", desc: "Wear safety goggles and gloves when handling chemicals or high-pressure systems.", icon: "🛡️" },
    { title: "Know Your Limits", desc: "If you smell gas or see arcing electricity, evacuate and call emergency services immediately.", icon: "🛑" }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Safety First</h2>
      </div>

      <div className="bg-red-950/20 border border-red-500/20 rounded-[40px] p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto border border-red-500/40">
           <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        </div>
        <h3 className="text-xl font-black text-white uppercase tracking-tight">Emergency Protocol</h3>
        <p className="text-red-200/60 text-sm">For immediate life-threatening emergencies, do not use the app. Call 911 immediately.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {guidelines.map((guide, i) => (
          <div key={i} className="bg-glass p-6 rounded-3xl border border-white/5 flex items-start space-x-6">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl shrink-0">
              {guide.icon}
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-white uppercase tracking-tight text-sm">{guide.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{guide.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyPage;
