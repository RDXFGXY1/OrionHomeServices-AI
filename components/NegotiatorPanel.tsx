
import React, { useState, useEffect, useRef } from 'react';
import { Expert, NegotiationLog, NegotiationResult } from '../types';

interface NegotiatorPanelProps {
  logs: NegotiationLog[];
  result: NegotiationResult | null;
  isNegotiating: boolean;
  onClose: () => void;
  onBook: (expert: Expert, price: number) => void;
}

const NegotiatorPanel: React.FC<NegotiatorPanelProps> = ({ logs, result, isNegotiating, onClose, onBook }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl h-[80vh] bg-slate-900 border border-white/10 rounded-[64px] shadow-[0_50px_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
        
        {/* Header HUD */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/2">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl animate-pulse">
               <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Autonomous Negotiator</h3>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">AI-Agentic Personnel Dispatch v4.0</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-slate-500 hover:text-white transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* LOGS PANEL */}
          <div className="flex-1 p-8 overflow-y-auto font-mono text-xs space-y-3 bg-black/40 scroll-smooth no-scrollbar" ref={scrollRef}>
            <div className="flex items-center gap-2 mb-6">
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
               <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Live Sequence Active</span>
            </div>
            {logs.map((log, i) => (
              <div key={i} className={`flex gap-4 animate-in slide-in-from-left-2 duration-300 ${
                log.type === 'success' ? 'text-emerald-400' : 
                log.type === 'warning' ? 'text-blue-400' : 
                log.type === 'error' ? 'text-red-400' : 'text-slate-500'
              }`}>
                <span className="opacity-30 shrink-0">[{log.timestamp}]</span>
                <span className="leading-relaxed">{log.message}</span>
              </div>
            ))}
            {isNegotiating && (
              <div className="flex gap-4 text-blue-400 animate-pulse mt-4">
                 <span className="opacity-30">[_ _ : _ _]</span>
                 <span className="flex items-center gap-2">Analyzing market responses... <div className="w-1 h-3 bg-blue-400 animate-bounce" /></span>
              </div>
            )}
          </div>

          {/* RESULT PANEL */}
          <div className="w-full md:w-[400px] border-l border-white/5 p-8 space-y-8 bg-slate-900/50">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-32 h-32 rounded-full border-4 border-dashed border-white/5 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                   <svg className="w-12 h-12 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                </div>
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Awaiting Outcome</p>
              </div>
            ) : (
              <div className="animate-in zoom-in-95 fade-in duration-700 space-y-10">
                <div className="text-center space-y-4">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                      <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Optimal Match Secured</span>
                   </div>
                   <h4 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Terms <br/> <span className="text-emerald-400">Accepted</span></h4>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[40px] p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <img src={result.bestMatch.avatar} className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/40" />
                    <div>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Deployed Specialist</p>
                      <p className="text-xl font-black text-white uppercase tracking-tight">{result.bestMatch.name}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/2 rounded-2xl">
                      <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Contract Price</p>
                      <p className="text-2xl font-black text-white tracking-tighter">${result.negotiatedPrice}</p>
                    </div>
                    <div className="p-4 bg-white/2 rounded-2xl">
                      <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">ETA Secure</p>
                      <p className="text-2xl font-black text-blue-400 tracking-tighter">{result.negotiatedTime}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-500/10 rounded-2xl flex items-center justify-between border border-emerald-500/20">
                     <p className="text-[10px] font-black text-emerald-400 uppercase">Negotiated Savings</p>
                     <p className="text-lg font-black text-white tracking-tighter">-${result.savingsFound}</p>
                  </div>
                </div>

                <p className="text-slate-400 text-xs font-medium leading-relaxed italic px-2 text-center">
                  "{result.summary}"
                </p>

                <button 
                  onClick={() => onBook(result.bestMatch, result.negotiatedPrice)}
                  className="w-full py-6 bg-white text-black rounded-[28px] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl hover:bg-emerald-400 transition-all active:scale-95"
                >
                  Finalize Contract
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer HUD Decor */}
        <div className="px-8 py-3 bg-white/2 border-t border-white/5 flex items-center justify-between opacity-40">
           <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.5em]">Sector: NYC_METRO_09</span>
           <div className="flex gap-4">
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.5em]">Lat: 40.7128</span>
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.5em]">Long: 74.0060</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NegotiatorPanel;
