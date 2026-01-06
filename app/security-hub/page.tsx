
import React from 'react';
import Icon from '../../components/Icon';

interface SecurityHubPageProps {
  onBack: () => void;
}

const SecurityHubPage: React.FC<SecurityHubPageProps> = ({ onBack }) => {
  const protocols = [
    { name: 'Expert Vetting', status: 'Verified', icon: 'user', desc: 'Background & License' },
    { name: 'Payment Escrow', status: 'Active', icon: 'shield', desc: 'Funds Protected' },
    { name: 'Project Integrity', status: 'Standard', icon: 'hard-hat', desc: 'On-site Safety' },
    { name: 'Identity Sync', status: 'Encrypted', icon: 'key', desc: 'Two-Factor Entry' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Security Center</h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Network Trust & Safety Protocols</p>
          </div>
        </div>
        <div className="px-6 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest">Escrow Active</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {protocols.map(node => (
          <div key={node.name} className="bg-glass p-8 rounded-[40px] border border-white/5 space-y-6 hover:border-blue-500/30 transition-all group">
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                <Icon name={node.icon} className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-right">
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Status</p>
                <p className="text-sm font-black text-emerald-400 uppercase tracking-tighter">{node.status}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-black text-white uppercase tracking-tight">{node.name}</p>
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">{node.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-black p-12 rounded-[56px] border border-white/10 relative overflow-hidden">
         <div className="relative z-10 space-y-8 max-w-2xl">
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-tight">Orion Protection Shield</h3>
            <p className="text-slate-400 text-lg leading-relaxed">We protect every project with a $1M Guarantee. All experts are manually interviewed and their physical licenses are verified quarterly to ensure the highest standard of structural safety for your home.</p>
            <div className="flex gap-4">
               <button className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">Download Safety Charter</button>
               <button className="px-8 py-4 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">Verify a Pro ID</button>
            </div>
         </div>
         <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-blue-600/5 blur-3xl rounded-full" />
      </div>
    </div>
  );
};

export default SecurityHubPage;
