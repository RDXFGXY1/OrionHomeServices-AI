
import React from 'react';
import { ViewState } from '../types';

interface HeaderProps {
  setView: (v: ViewState) => void;
  currentView: ViewState;
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setView, currentView, searchTerm, onSearchChange }) => {
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setView('browse');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[120] bg-slate-950/60 backdrop-blur-3xl border-b border-white/5 px-4 md:px-10 h-20 flex items-center">
      <div className="w-full grid grid-cols-2 md:grid-cols-[280px_1fr_280px] items-center gap-6">
        
        {/* Brand Section: Left Aligned */}
        <div 
          className="flex items-center space-x-4 cursor-pointer shrink-0 group transition-all active:scale-95"
          onClick={() => setView('home')}
        >
          <div className="relative w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[14px] flex items-center justify-center shadow-[0_0_25px_rgba(37,99,235,0.3)] group-hover:shadow-[0_0_35px_rgba(37,99,235,0.5)] transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <svg className="w-6 h-6 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-black text-white tracking-tighter uppercase leading-none mb-0.5">
              Orion <span className="text-blue-500">Home Services</span>
            </h1>
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.25em] flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
              Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Gemini 3</span>
            </p>
          </div>
        </div>

        {/* Prominent Central Search Bar */}
        <form 
          onSubmit={handleSearchSubmit}
          className="relative group hidden md:flex items-center w-full max-w-xl mx-auto"
        >
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
            <svg className="w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <input 
            type="text"
            placeholder="Search verified experts or AI diagnostics..."
            value={searchTerm}
            onChange={(e) => {
              onSearchChange(e.target.value);
              if (currentView !== 'browse') setView('browse');
            }}
            className="w-full bg-white/5 border border-white/10 rounded-[20px] py-3.5 pl-12 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.08] focus:ring-8 focus:ring-blue-500/5 transition-all shadow-2xl"
          />
          
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-40 group-focus-within:opacity-100 transition-opacity">
            <div className="px-2 py-0.5 bg-slate-800 border border-white/10 rounded-md text-[9px] font-black text-slate-400 uppercase">
              Enter
            </div>
          </div>

          {/* Holographic Border Highlight */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[22px] opacity-0 group-focus-within:opacity-20 blur-sm transition-opacity -z-10" />
        </form>

        {/* Action Section: Right Aligned */}
        <div className="flex items-center justify-end space-x-4 shrink-0">
          <div className="hidden lg:flex items-center bg-white/5 border border-white/5 rounded-xl px-3 py-1.5 gap-3">
            <div className="flex -space-x-1.5">
               {[1,2].map(i => (
                 <div key={i} className="w-5 h-5 rounded-full border border-slate-900 bg-slate-800 ring-1 ring-white/5" />
               ))}
            </div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">4.2k Online</span>
          </div>
          
          <div className="h-8 w-px bg-white/10 hidden md:block" />

          <button 
            onClick={() => setView('profile')}
            className="w-11 h-11 rounded-[14px] bg-slate-900 border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden ring-2 ring-transparent hover:ring-blue-500/50 hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
