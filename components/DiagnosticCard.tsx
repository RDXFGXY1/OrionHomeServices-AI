
import React, { useState } from 'react';
import { DiagnosticResult, SeverityLevel } from '../types';

interface DiagnosticCardProps {
  result: DiagnosticResult;
}

const DiagnosticCard: React.FC<DiagnosticCardProps> = ({ result }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const getSeverityStyles = (level: string) => {
    switch (level) {
      case SeverityLevel.EMERGENCY: return 'text-red-400 bg-red-500/10 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
      case SeverityLevel.HIGH: return 'text-orange-400 bg-orange-500/10 border-orange-500/20 shadow-[0_0_15px_rgba(251,146,60,0.2)]';
      case SeverityLevel.MEDIUM: return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20 shadow-[0_0_15px_rgba(250,204,21,0.2)]';
      default: return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.2)]';
    }
  };

  return (
    <div className="bg-glass rounded-[48px] border border-white/10 shadow-2xl overflow-hidden flex flex-col transition-all duration-500 hover:border-white/20">
      {/* Primary Report Header */}
      <div className="p-8 md:p-10 space-y-10 relative flex-1">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none select-none">
           <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        </div>

        <div className="space-y-8 relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-500 ${getSeverityStyles(result.severity)}`}>
              {result.severity} Priority
            </span>
            <span className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20">
              {result.expertCategory}
            </span>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest hidden sm:block">
              Scan ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}
            </span>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.85]">{result.issueName}</h2>
            
            <div className="flex gap-6 group">
               <div className="w-1.5 bg-gradient-to-b from-blue-600 to-transparent rounded-full shrink-0" />
               <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Field Observation Log</span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>
                  <p className="text-slate-300 text-xl font-medium leading-relaxed">
                    {result.description}
                  </p>
               </div>
            </div>
          </div>
        </div>

        {/* FINANCIAL MATRIX AREA - RE-ENGINEERED FOR BREAKDOWN */}
        <div className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="cursor-pointer p-8 bg-white/5 rounded-[40px] border border-white/5 space-y-6 transition-all group hover:bg-white/10 overflow-hidden relative"
            >
               <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Fair Price Estimate</span>
                  <div className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[8px] font-black uppercase tracking-widest animate-pulse">Live Market Data</div>
               </div>
               <div>
                  <h3 className="text-6xl font-black text-white tracking-tighter leading-none">
                    ${result.costBreakdown.totalEstimate.toFixed(0)}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                    Click to view technical breakdown 
                    <svg className={`w-3 h-3 transition-transform ${showBreakdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7"/></svg>
                  </p>
               </div>
               <div className="space-y-2">
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500 group-hover:scale-x-105 origin-left transition-transform" style={{ width: '70%' }} />
                  </div>
                  <div className="flex justify-between text-[8px] font-black text-slate-600 uppercase tracking-widest">
                     <span>Estimated Parts</span>
                     <span>Specialist Labor</span>
                  </div>
               </div>
            </div>

            <div className="p-8 bg-emerald-500/5 rounded-[40px] border border-emerald-500/10 flex flex-col justify-between space-y-4">
               <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-emerald-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04a11.352 11.352 0 00-1.42 14.055 11.955 11.955 0 0010.038 5.944 11.955 11.955 0 0010.038-5.944 11.352 11.352 0 00-1.42-14.055z" /></svg>
                      <span className="text-xs font-black uppercase tracking-widest">Membership Advantage</span>
                  </div>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed">
                      As an <span className="text-white">Orion Pro</span> user, you save <span className="text-emerald-400 font-bold">15%</span> on this service via network-wide fee waivers.
                  </p>
               </div>
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-600 uppercase">You Save</p>
                    <p className="text-3xl font-black text-emerald-400 tracking-tighter">-${result.costBreakdown.savingsWithMembership.toFixed(2)}</p>
                  </div>
               </div>
            </div>
          </div>

          {/* HOLOGRAPHIC QUOTE BREAKDOWN */}
          {showBreakdown && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500 bg-slate-900/40 border border-white/5 rounded-[40px] p-8 space-y-6 font-mono">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Line Item Description</span>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest text-right">Market Valuation</span>
              </div>
              
              <div className="space-y-3">
                {result.costBreakdown.parts.map((item, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-slate-700 rounded-full group-hover:bg-blue-400" />
                      <span className="text-xs text-slate-400 group-hover:text-white transition-colors">{item.item}</span>
                    </div>
                    <span className="text-xs font-bold text-white">${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center group pt-3 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-slate-700 rounded-full group-hover:bg-purple-400" />
                    <span className="text-xs text-slate-400 group-hover:text-white transition-colors">{result.costBreakdown.labor.item}</span>
                  </div>
                  <span className="text-xs font-bold text-white">${result.costBreakdown.labor.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end pt-6 border-t-2 border-white/10">
                <div className="space-y-1">
                   <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em]">Gross Service Valuation</p>
                   <p className="text-sm font-black text-slate-400">MARKET AVERAGE</p>
                </div>
                <p className="text-4xl font-black text-white tracking-tighter">${result.costBreakdown.totalEstimate.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Intelligence Warnings */}
        {result.safetyWarnings.length > 0 && (
          <div className="p-8 bg-red-500/5 rounded-[40px] border border-red-500/20 space-y-6 relative z-10 overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
               <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            </div>
            <div className="flex items-center space-x-3 text-red-400">
              <span className="text-sm font-black uppercase tracking-[0.2em]">Safety Protocol Alert</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.safetyWarnings.map((warning, i) => (
                <div key={i} className="flex items-start space-x-4 bg-red-500/10 p-4 rounded-2xl border border-red-500/10 hover:border-red-500/30 transition-colors">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                   <p className="text-xs text-red-100/70 font-bold leading-tight">{warning}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Structural Footer */}
      <div className="px-10 py-6 bg-white/5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
         <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${result.requiresExpert ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'bg-slate-700'}`} />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
               {result.requiresExpert ? 'On-Site Specialist Required' : 'Manual Maintenance Mode'}
            </span>
         </div>
         <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em]">
            Cost Analysis Engine v2.4 Active
         </span>
      </div>
    </div>
  );
};

export default DiagnosticCard;
