
import React, { useState } from 'react';

interface MembershipPageProps {
  currentTier: 'Standard' | 'Plus' | 'Pro';
  onUpgrade: (tier: 'Standard' | 'Plus' | 'Pro') => void;
  onBack: () => void;
}

const MembershipPage: React.FC<MembershipPageProps> = ({ currentTier, onUpgrade, onBack }) => {
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState<'none' | 'Plus' | 'Pro'>('none');

  const tiers = [
    { id: 'Standard', name: 'Standard', price: 'Free', features: ['AI Basic Diagnostics', 'Standard Support', 'Public Expert Feed'], cta: 'Current Active', active: currentTier === 'Standard' },
    { id: 'Plus', name: 'Plus', price: '$19.99/mo', features: ['24/7 Priority Booking', '10% Discount on Experts', 'Premium AI Vision Engine', 'Free Material Delivery'], cta: 'Upgrade Access', active: currentTier === 'Plus', highlight: true },
    { id: 'Pro', name: 'Pro', price: '$49.99/mo', features: ['Unlimited AI Scans', 'Dedicated Orion Concierge', 'Insurance Coverage included', 'Advanced Home Health Dashboard'], cta: 'Get Pro Clearance', active: currentTier === 'Pro' },
  ];

  const handleUpgrade = (tier: string) => {
    if (tier === currentTier) return;
    
    setIsUpgrading(true);
    
    // Cinematic upgrade simulation
    setTimeout(() => {
      setIsUpgrading(false);
      setUpgradeSuccess(tier as 'Plus' | 'Pro');
      onUpgrade(tier as 'Standard' | 'Plus' | 'Pro');
      
      setTimeout(() => {
        setUpgradeSuccess('none');
      }, 4000);
    }, 4000);
  };

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 relative">
      
      {/* UPGRADE OVERLAY SIMULATION */}
      {isUpgrading && (
        <div className="fixed inset-0 z-[250] bg-slate-950 flex flex-col items-center justify-center p-12 text-center overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[150px] rounded-full animate-pulse" />
           
           <div className="relative z-10 space-y-12">
              <div className="w-40 h-40 mx-auto relative">
                <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <div className="absolute inset-4 border-4 border-indigo-500 border-b-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <svg className="w-16 h-16 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
              </div>
              <div className="space-y-4">
                 <h2 className="text-6xl font-black text-white uppercase tracking-tighter leading-none animate-bounce">Calibrating <br/> <span className="text-blue-400">Identity Link</span></h2>
                 <p className="text-slate-500 text-xl font-medium max-w-lg mx-auto leading-relaxed">The Orion Neural Hub is reconfiguring your account clearance. This takes a moment of peak concentration...</p>
              </div>
              <div className="w-full max-w-md mx-auto h-2 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 animate-[shimmer_2s_infinite] origin-left" style={{ width: '100%' }} />
              </div>
           </div>
        </div>
      )}

      {upgradeSuccess !== 'none' && (
        <div className="fixed inset-0 z-[260] bg-blue-600 flex flex-col items-center justify-center p-12 text-center animate-in zoom-in-95 duration-700">
           <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white rounded-full animate-ping" />
              <div className="absolute top-2/3 right-1/4 w-6 h-6 bg-white rounded-full animate-ping [animation-delay:1s]" />
              <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-white rounded-full animate-ping [animation-delay:0.5s]" />
           </div>
           <div className="space-y-10 relative z-10">
              <div className="w-32 h-32 bg-white rounded-[40px] flex items-center justify-center shadow-2xl mx-auto rotate-12 animate-bounce">
                 <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7"/></svg>
              </div>
              <div className="space-y-4">
                 <h2 className="text-7xl font-black text-white uppercase tracking-tighter leading-none">Access <br/> Granted</h2>
                 <p className="text-blue-100 text-2xl font-black uppercase tracking-widest">Welcome to Orion {upgradeSuccess}</p>
              </div>
              <p className="text-blue-200/60 font-medium max-w-sm mx-auto">Your premium perks are now active across the entire NYC service network. Enjoy the new speed of home maintenance.</p>
           </div>
        </div>
      )}

      <div className="flex items-center gap-6">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all hover:scale-110 active:scale-90">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Identity Clearance</h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Configure your network status & priority level</p>
        </div>
      </div>

      <div className="text-center space-y-6 max-w-3xl mx-auto py-10">
        <h3 className="text-6xl md:text-8xl font-black text-white leading-[0.85] uppercase tracking-tighter">
          Master your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Environment</span>
        </h3>
        <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed">Join the top 5% of homeowners who leverage the Orion Neural Hub for predictive maintenance and elite expert access.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {tiers.map(tier => (
          <div 
            key={tier.id} 
            className={`relative flex flex-col p-10 rounded-[64px] border-2 transition-all duration-700 ${tier.active ? 'bg-white/5 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.1)] opacity-60 pointer-events-none' : tier.highlight ? 'bg-blue-600/5 border-blue-500 shadow-[0_0_60px_rgba(37,99,235,0.2)] scale-105' : 'bg-glass border-white/5 hover:border-white/20'}`}
          >
            {tier.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-blue-600 rounded-full text-[10px] font-black text-white uppercase tracking-[0.3em] shadow-2xl">
                Nexus Pick
              </div>
            )}
            
            <div className="space-y-2">
              <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-none">{tier.name}</h4>
              <p className="text-4xl font-black text-white tracking-tighter">{tier.price}<span className="text-sm text-slate-600 ml-1">/mo</span></p>
            </div>

            <div className="mt-10 flex-1 space-y-5">
              {tier.features.map(feat => (
                <div key={feat} className="flex items-start gap-4 text-base text-slate-400 font-medium">
                  <div className="w-5 h-5 bg-white/5 rounded-md flex items-center justify-center text-blue-400 shrink-0">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span className="leading-tight">{feat}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleUpgrade(tier.id)}
              className={`mt-12 w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95 shadow-2xl ${tier.active ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : tier.highlight ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-white text-black hover:bg-slate-200'}`}
            >
              {tier.active ? 'Cleared & Active' : tier.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-glass p-12 rounded-[64px] border border-white/5 text-center space-y-8 max-w-4xl mx-auto shadow-2xl">
        <div className="inline-flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-2">
           <div className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,1)]" />
           <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Enterprise Clearance</span>
        </div>
        <div className="space-y-4">
          <h4 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Global Network Node</h4>
          <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto">Managing multiple luxury residences or a commercial portfolio? Our Enterprise solution provides fleet-wide AI monitoring and a dedicated response officer.</p>
        </div>
        <button className="text-blue-400 font-black uppercase tracking-[0.3em] text-[11px] hover:text-white transition-all flex items-center gap-3 mx-auto group">
          Contact Sector Sales
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
        </button>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.5); opacity: 0.8; }
          100% { transform: scaleX(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default MembershipPage;
