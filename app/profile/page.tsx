
import React from 'react';
import { ViewState, Expert } from '../../types';

interface ProfilePageProps {
  onNavigate: (view: ViewState) => void;
  tier: 'Standard' | 'Plus' | 'Pro';
  balance: number;
  favoriteExperts: Expert[];
  onExpertClick: (expert: Expert) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate, tier, balance, favoriteExperts, onExpertClick }) => {
  const getTierStyles = () => {
    switch(tier) {
      case 'Pro': return 'from-purple-600 to-amber-500 shadow-[0_0_30px_rgba(168,85,247,0.4)]';
      case 'Plus': return 'from-blue-600 to-indigo-600 shadow-[0_0_30px_rgba(37,99,235,0.4)]';
      default: return 'from-slate-700 to-slate-900 shadow-xl';
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="relative group">
          <div className={`absolute inset-0 bg-gradient-to-br ${getTierStyles()} rounded-[56px] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700`}></div>
          <div className="relative">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="User" 
              className="w-44 h-44 rounded-[56px] bg-slate-900 p-1 border-2 border-white/10 shadow-2xl object-cover"
            />
            <div className={`absolute -bottom-2 -right-2 px-6 py-2 bg-gradient-to-r ${getTierStyles()} rounded-2xl border-4 border-slate-950 shadow-2xl`}>
               <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">{tier} Level</span>
            </div>
          </div>
        </div>
        <div className="space-y-4 text-center md:text-left flex-1">
          <div>
            <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-[0.85]">Felix Arvid</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
               <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full uppercase tracking-widest">Premium User</span>
               <span className="text-[10px] font-black text-slate-500 border border-white/5 px-4 py-1.5 rounded-full uppercase tracking-widest">NYC HUB #0421</span>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-8 pt-4">
            <div className="space-y-1">
               <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Available Credit</p>
               <p className="text-3xl font-black text-white tracking-tighter">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="w-px h-10 bg-white/5" />
            <div className="space-y-1">
               <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Expert Network Reach</p>
               <p className="text-3xl font-black text-emerald-400 tracking-tighter">Global</p>
            </div>
          </div>
        </div>
      </div>

      {/* Favorited Experts Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-4">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">Saved Specialists</h3>
          <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{favoriteExperts.length} Total</span>
        </div>
        
        {favoriteExperts.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
            {favoriteExperts.map(expert => (
              <div 
                key={expert.id}
                onClick={() => onExpertClick(expert)}
                className="flex-shrink-0 w-64 bg-glass p-6 rounded-[32px] border border-white/5 hover:border-blue-500/40 transition-all cursor-pointer group shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <img src={expert.avatar} alt={expert.name} className="w-14 h-14 rounded-2xl object-cover border border-white/10" />
                  <div className="min-w-0">
                    <h4 className="font-black text-white text-sm uppercase tracking-tight truncate group-hover:text-blue-400 transition-colors">{expert.name}</h4>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{expert.category}</p>
                    <div className="flex items-center gap-1 text-yellow-400 mt-1">
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <span className="text-[10px] font-black tracking-tighter">{expert.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-glass p-10 rounded-[40px] border border-white/5 border-dashed text-center">
            <p className="text-slate-500 font-medium text-sm">No experts favorited yet. Explore the marketplace to save your preferred specialists.</p>
            <button 
              onClick={() => onNavigate('browse')}
              className="mt-4 text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors"
            >
              Browse Experts →
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div onClick={() => onNavigate('wallet')} className="cursor-pointer bg-glass p-8 rounded-[48px] border border-white/5 space-y-8 group hover:border-blue-500/40 transition-all shadow-xl">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
               <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Financial Node</span>
          </div>
          <div className="space-y-1">
             <h4 className="text-2xl font-black text-white uppercase tracking-tight">Digital Wallet</h4>
             <p className="text-slate-500 text-sm font-medium">Manage assets and transaction logs.</p>
          </div>
        </div>

        <div onClick={() => onNavigate('history')} className="cursor-pointer bg-glass p-8 rounded-[48px] border border-white/5 space-y-8 group hover:border-purple-500/40 transition-all shadow-xl">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
               <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Sync Log</span>
          </div>
          <div className="space-y-1">
             <h4 className="text-2xl font-black text-white uppercase tracking-tight">Service History</h4>
             <p className="text-slate-500 text-sm font-medium">Review your historical expert matches.</p>
          </div>
        </div>

        <div onClick={() => onNavigate('safety')} className="cursor-pointer bg-glass p-8 rounded-[48px] border border-white/5 space-y-8 group hover:border-emerald-500/40 transition-all shadow-xl">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
               <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04a11.352 11.352 0 00-1.42 14.055 11.955 11.955 0 0010.038 5.944 11.955 11.955 0 0010.038-5.944 11.352 11.352 0 00-1.42-14.055z" /></svg>
            </div>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Safety Link</span>
          </div>
          <div className="space-y-1">
             <h4 className="text-2xl font-black text-white uppercase tracking-tight">Safety Center</h4>
             <p className="text-slate-500 text-sm font-medium">Expert guidelines and protocols.</p>
          </div>
        </div>
      </div>

      <button className="w-full py-6 bg-red-600/5 hover:bg-red-600 border border-red-500/20 text-red-500 hover:text-white rounded-[32px] font-black uppercase tracking-[0.3em] text-[10px] transition-all active:scale-95 flex items-center justify-center gap-4">
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
         Terminate User Session
      </button>
    </div>
  );
};

export default ProfilePage;
