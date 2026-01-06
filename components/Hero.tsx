
import React from 'react';

interface HeroProps {
  onScanClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScanClick }) => {
  return (
    <div className="relative pt-10 pb-20 px-6 overflow-visible preserve-3d">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div className="lg:col-span-7 space-y-12 text-center lg:text-left z-20">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-2xl shadow-2xl float">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Autonomous Network Live</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-7xl md:text-9xl font-black text-white leading-[0.8] uppercase tracking-tighter preserve-3d">
              <span className="block transform translate-z-10 text-shadow-lg">Orion</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 block mt-2 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                Infrastructure
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-xl font-medium leading-relaxed mx-auto lg:mx-0 opacity-80">
              Deploy the world's most advanced AI agent to diagnose, negotiate, and manage your home’s structural integrity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <button className="w-full sm:w-auto px-16 py-8 bg-white text-black font-black uppercase tracking-[0.3em] text-xs rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-[0_30px_60px_-12px_rgba(255,255,255,0.15)] active:scale-95 group overflow-hidden relative">
              <span className="relative z-10">Secure Access</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button 
              onClick={onScanClick}
              className="w-full sm:w-auto px-16 py-8 bg-blue-600/10 text-blue-400 border border-blue-500/30 font-black uppercase tracking-[0.3em] text-xs rounded-full backdrop-blur-xl hover:bg-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-4 shadow-2xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/></svg>
              AI Scan
            </button>
          </div>
        </div>

        {/* Right Side: 3D Visualization */}
        <div className="lg:col-span-5 relative hidden lg:block perspective-1000">
          <div className="relative w-full h-[600px] preserve-3d transition-transform duration-1000 hover:rotate-Y-12 hover:rotate-X-6 group">
            {/* Background Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[80px] blur-[100px] animate-pulse -z-10" />
            
            {/* Main Floating Image Container */}
            <div className="absolute inset-0 bg-slate-900/40 rounded-[64px] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-sm transform -translate-z-10 group-hover:translate-z-0 transition-transform duration-700">
               <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1000&fit=crop" 
                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000"
                alt="Infrastructure"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </div>

            {/* Middle Layer: Data HUD */}
            <div className="absolute top-10 -left-10 w-64 p-6 bg-glass rounded-[32px] transform translate-z-20 border-glow shadow-2xl animate-in slide-in-from-left-10 duration-1000">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Active Node 09</p>
               </div>
               <div className="space-y-4">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[85%] animate-[shimmer_2s_infinite]" />
                  </div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase">Structural integrity: 98.4%</p>
               </div>
            </div>

            {/* Front Layer: Floating Expert Tag */}
            <div className="absolute -bottom-10 -right-10 w-72 p-8 bg-blue-600 rounded-[40px] transform translate-z-40 shadow-[0_32px_64px_-12px_rgba(37,99,235,0.6)] border border-white/20 group-hover:translate-y-[-20px] transition-transform duration-700">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-blue-100 uppercase tracking-widest">Specialist ETA</p>
                    <p className="text-2xl font-black text-white tracking-tighter">04m 12s</p>
                  </div>
               </div>
            </div>

            {/* Viewfinder Decorative Corners */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-blue-500/40 rounded-tl-2xl transform translate-z-50" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-blue-500/40 rounded-br-2xl transform translate-z-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
