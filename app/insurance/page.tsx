
import React from 'react';

const InsurancePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
      <div className="flex items-center space-x-6">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Orion Protection</h2>
      </div>

      <div className="bg-gradient-to-br from-emerald-600/10 to-blue-600/10 border border-emerald-500/20 rounded-[48px] p-10 space-y-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-tight">Total Structural Integrity Shield.</h3>
            <p className="text-slate-400 text-lg">Orion Protection provides elite coverage for major home systems. By keeping a verified maintenance record through the Orion marketplace, your structural integrity score remains high, lowering your yearly premiums.</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <p className="text-2xl font-black text-white">$2.5M</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Coverage</p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <p className="text-2xl font-black text-emerald-400">Audited</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">History Status</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-80 p-8 bg-glass rounded-[40px] border border-white/10 text-center space-y-6">
             <div className="space-y-1">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Next Audit</p>
               <p className="text-2xl font-black text-white">Jan 2025</p>
             </div>
             <button className="w-full py-4 bg-emerald-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-emerald-500 transition-all shadow-xl">Initiate New Claim</button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-black text-white uppercase px-2">Policy Domains</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Electrical Systems', desc: 'Panel failure, wiring replacement, and catastrophic surge protection.', status: 'Active' },
            { title: 'Structural Core', desc: 'Coverage for foundation shifts, roof leaks, and framing issues.', status: 'Active' },
            { title: 'Major Appliances', desc: 'Protection for boilers, furnaces, and custom residential HVAC units.', status: 'Standard' },
            { title: 'Plumbing Main', desc: 'Complete main line coverage and catastrophic water damage repair.', status: 'Active' },
          ].map((item, i) => (
            <div key={i} className="bg-glass p-8 rounded-[32px] border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
              <div className="space-y-1 pr-4">
                <h4 className="font-bold text-white uppercase tracking-tight">{item.title}</h4>
                <p className="text-xs text-slate-500 max-w-xs">{item.desc}</p>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap ${item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-slate-400 border border-white/10'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsurancePage;
