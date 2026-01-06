
import React, { useState, useEffect } from 'react';

const PROCESSING_STEPS = [
  "Initializing Vision Engine...",
  "Analyzing Structural Integrity...",
  "Scanning for Safety Hazards...",
  "Cross-referencing Material Databases...",
  "Synthesizing Repair Protocols...",
  "Calculating Professional Estimates...",
  "Finalizing Diagnosis..."
];

const LoadingState: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % PROCESSING_STEPS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-16 animate-in fade-in duration-1000">
      {/* Central Holographic AI Core */}
      <div className="relative">
        {/* Outer Glow Rings */}
        <div className="absolute inset-0 -m-8 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute inset-0 -m-4 border border-purple-500/20 rounded-full animate-[ping_3s_linear_infinite]" />
        
        {/* Rotating Geometric Rings */}
        <div className="relative w-48 h-48">
          <svg className="w-full h-full animate-[spin_10s_linear_infinite] opacity-40" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" className="text-purple-400" />
          </svg>
          <svg className="absolute inset-0 w-full h-full animate-[spin_6s_linear_infinite_reverse] opacity-60" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" className="text-indigo-400" />
          </svg>
          
          {/* Central AI Orb */}
          <div className="absolute inset-0 m-10 bg-purple-gradient rounded-3xl shadow-[0_0_40px_rgba(124,58,237,0.5)] flex items-center justify-center overflow-hidden border border-white/20">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
            
            {/* Scanning Beam Animation inside the orb */}
            <div className="absolute inset-x-0 h-1 bg-white/40 blur-[2px] shadow-[0_0_15px_white] animate-[scan_2s_ease-in-out_infinite]" />
            
            <svg className="w-12 h-12 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        
        {/* Holographic "Scanning" Markers */}
        <div className="absolute -top-4 -left-4 w-6 h-6 border-t-2 border-l-2 border-purple-500 rounded-tl-lg" />
        <div className="absolute -top-4 -right-4 w-6 h-6 border-t-2 border-r-2 border-purple-500 rounded-tr-lg" />
        <div className="absolute -bottom-4 -left-4 w-6 h-6 border-b-2 border-l-2 border-purple-500 rounded-bl-lg" />
        <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b-2 border-r-2 border-purple-500 rounded-br-lg" />
      </div>
      
      {/* Dynamic Status Display */}
      <div className="text-center space-y-4 max-w-sm px-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20 mb-2">
          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em]">Gemini 3 Multimodal</span>
        </div>
        
        <h3 className="text-2xl font-black text-white tracking-tighter uppercase min-h-[1.5em] transition-all duration-500">
          {PROCESSING_STEPS[stepIndex]}
        </h3>
        
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          The AI is currently processing visual patterns and cross-referencing millions of professional repair datasets.
        </p>
      </div>

      {/* Modern Progress Visualization */}
      <div className="w-full max-w-xs space-y-4">
        <div className="flex justify-between text-[10px] text-slate-500 uppercase font-black tracking-widest">
          <span>System Load</span>
          <span className="text-purple-400">Optimal</span>
        </div>
        <div className="relative h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
          {/* Background Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          
          {/* Active Progress */}
          <div 
            className="h-full bg-purple-gradient transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(124,58,237,0.5)]" 
            style={{ width: `${((stepIndex + 1) / PROCESSING_STEPS.length) * 100}%` }}
          />
        </div>
        
        {/* Micro-data indicators */}
        <div className="grid grid-cols-4 gap-2 pt-2">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`h-1 rounded-full transition-colors duration-500 ${i <= stepIndex % 4 ? 'bg-purple-500' : 'bg-slate-800'}`} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-20px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(100px); opacity: 0; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingState;
