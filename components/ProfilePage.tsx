
import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center space-x-8">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-gradient rounded-[40px] blur-2xl opacity-30"></div>
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="User" 
            className="relative w-32 h-32 rounded-[40px] bg-glass border-2 border-white/10 shadow-2xl"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Felix Arvid</h2>
          <div className="flex items-center space-x-3">
             <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full uppercase tracking-widest">Premium Member</span>
             <span className="text-xs font-bold text-slate-500 uppercase">Joined 2024</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-glass p-8 rounded-[40px] border border-white/5 space-y-6">
          <h3 className="text-lg font-black text-white uppercase tracking-tight">Account Details</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-sm font-medium text-slate-500">Email</span>
              <span className="text-sm font-bold text-white">felix@fixitpro.ai</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-sm font-medium text-slate-500">Phone</span>
              <span className="text-sm font-bold text-white">+1 (555) 000-0000</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-sm font-medium text-slate-500">Address</span>
              <span className="text-sm font-bold text-white text-right">72nd St, NY, Manhattan</span>
            </div>
          </div>
        </div>

        <div className="bg-glass p-8 rounded-[40px] border border-white/5 space-y-6">
          <h3 className="text-lg font-black text-white uppercase tracking-tight">App Settings</h3>
          <div className="space-y-4">
            <button className="w-full flex justify-between items-center py-3 border-b border-white/5 group">
              <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">Payment Methods</span>
              <svg className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </button>
            <button className="w-full flex justify-between items-center py-3 border-b border-white/5 group">
              <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">Notifications</span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2 rounded">Active</span>
            </button>
            <button className="w-full flex justify-between items-center py-3 group">
              <span className="text-sm font-medium text-red-400 hover:text-red-300">Logout</span>
              <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
