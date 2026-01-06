
import React from 'react';

interface RewardsPageProps {
  onBack: () => void;
}

const RewardsPage: React.FC<RewardsPageProps> = ({ onBack }) => {
  const perks = [
    { title: 'Priority Dispatch', points: 500, status: 'Unlocked' },
    { title: 'Fee Waiver (3x)', points: 1200, status: '900 / 1200' },
    { title: 'Orion Pro Merch Bundle', points: 3000, status: 'Locked' },
    { title: '1-Year Insurance Credit', points: 10000, status: 'Locked' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <div className="flex items-center gap-6">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Orion Rewards</h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Unlock peak maintenance perks</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-600/20 via-orange-600/20 to-yellow-500/10 border border-amber-500/30 rounded-[64px] p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 -rotate-12 scale-150 pointer-events-none text-amber-500">
          <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4 text-center md:text-left">
            <p className="text-[11px] font-black text-amber-400 uppercase tracking-[0.4em]">Current Achievement Level</p>
            <h3 className="text-7xl font-black text-white tracking-tighter leading-none">4,280 <span className="text-2xl text-amber-500 font-black">PTS</span></h3>
            <div className="flex items-center gap-3 justify-center md:justify-start">
               <div className="px-4 py-1.5 bg-amber-500/20 rounded-xl text-[10px] font-black text-amber-400 uppercase tracking-widest border border-amber-500/30">Tier: Golden Link</div>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">720 pts to Next Rank</span>
            </div>
          </div>
          <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-3xl shadow-2xl hover:bg-amber-400 transition-all active:scale-95">
            Redeem Points
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-glass p-10 rounded-[56px] border border-white/5 space-y-8">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">Referral Protocol</h3>
          <p className="text-slate-400 font-medium leading-relaxed">Refer a fellow homeowner to the Orion Network. Upon their first AI scan, you both receive <span className="text-white font-black">500 PTS</span> and <span className="text-emerald-400 font-black">$50 Credit</span>.</p>
          <div className="relative">
             <input readOnly value="ORION-FELIX-99" className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 text-white font-mono text-xl focus:outline-none" />
             <button className="absolute right-4 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 rounded-xl text-[9px] font-black text-white uppercase tracking-widest shadow-xl">Copy Code</button>
          </div>
        </div>

        <div className="bg-glass p-10 rounded-[56px] border border-white/5 space-y-6">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">Active Perks</h3>
          <div className="space-y-3">
             {perks.map(perk => (
               <div key={perk.title} className="flex items-center justify-between p-5 bg-white/2 rounded-2xl border border-white/5">
                 <div className="space-y-1">
                   <p className="text-sm font-black text-white uppercase tracking-tight">{perk.title}</p>
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{perk.points} PTS Required</p>
                 </div>
                 <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${perk.status === 'Unlocked' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-slate-600 border border-white/10'}`}>{perk.status}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
