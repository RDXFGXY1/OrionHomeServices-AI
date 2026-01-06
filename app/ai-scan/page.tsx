
import React, { useState } from 'react';
import FileUpload from '../../components/FileUpload';
import LoadingState from '../../components/LoadingState';
import DiagnosticCard from '../../components/DiagnosticCard';
import ExpertCard from '../../components/ExpertCard';
import NegotiatorPanel from '../../components/NegotiatorPanel';
import { DiagnosticResult, Expert, ProBrief, NegotiationLog, NegotiationResult } from '../../types';
import { generateTechnicalBrief, runAgenticNegotiation } from '../../geminiService';
import { MOCK_EXPERTS } from '../../data/mockData';

interface ScanPageProps {
  loading: boolean;
  diagnosticResult: DiagnosticResult | null;
  previewUrl: string | null;
  onFileUpload: (file: File) => void;
  onReset: () => void;
  getRecommendedExpert: (category: string) => Expert | null;
  onBookExpert: (expert: Expert) => void;
  onExpertClick: (expert: Expert) => void;
  onBackToHome: () => void;
  onBookingWithNegotiation: (expert: Expert, price: number) => void;
}

const ScanPage: React.FC<ScanPageProps> = ({
  loading,
  diagnosticResult,
  previewUrl,
  onFileUpload,
  onReset,
  getRecommendedExpert,
  onBookExpert,
  onExpertClick,
  onBackToHome,
  onBookingWithNegotiation
}) => {
  const [proBrief, setProBrief] = useState<ProBrief | null>(null);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);

  // Negotiator State
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [negLogs, setNegLogs] = useState<NegotiationLog[]>([]);
  const [negResult, setNegResult] = useState<NegotiationResult | null>(null);
  const [showNegotiator, setShowNegotiator] = useState(false);

  const expert = diagnosticResult ? getRecommendedExpert(diagnosticResult.expertCategory) : null;

  const handleGenerateBrief = async () => {
    if (!diagnosticResult || !expert) return;
    setIsGeneratingBrief(true);
    try {
      const brief = await generateTechnicalBrief(diagnosticResult, expert);
      setProBrief(brief);
    } catch (err) {
      console.error("Failed to generate brief", err);
    } finally {
      setIsGeneratingBrief(false);
    }
  };

  const handleStartNegotiation = async () => {
    if (!diagnosticResult || !proBrief) return;
    
    setShowNegotiator(true);
    setIsNegotiating(true);
    setNegLogs([]);
    setNegResult(null);

    const addLog = (msg: string, type: NegotiationLog['type']) => {
      setNegLogs(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        message: msg,
        type: type
      }]);
    };

    addLog("Initializing Sector Agent...", "info");
    addLog(`Target Category: ${diagnosticResult.expertCategory}`, "info");

    try {
      // Pass the actual network list for the agent to use
      const result = await runAgenticNegotiation(
        diagnosticResult, 
        proBrief, 
        MOCK_EXPERTS, 
        diagnosticResult.costBreakdown.totalEstimate, 
        addLog
      );
      setNegResult(result);
    } catch (err) {
      addLog("Agentic cycle interrupted by timeout.", "error");
    } finally {
      setIsNegotiating(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center py-6 px-2 animate-in fade-in duration-700">
      {!diagnosticResult && !loading && (
        <div className="w-full max-w-4xl space-y-12 my-auto px-4">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Vision Node Online</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.8] mb-2">
              Orion <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Scan</span>
            </h2>
            <p className="text-slate-500 text-lg md:text-xl max-w-xl mx-auto font-medium">
              Real-time structural failure analysis powered by proprietary vision models.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-10 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-[80px] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <FileUpload onFileSelect={onFileUpload} />
          </div>
          <button 
            onClick={onBackToHome}
            className="w-full text-center text-slate-600 hover:text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:tracking-[0.4em] py-4"
          >
            ← Return to Hub
          </button>
        </div>
      )}

      {loading && <div className="my-auto w-full"><LoadingState /></div>}

      {diagnosticResult && (
        <div className="w-full max-w-7xl space-y-10 animate-in zoom-in-95 fade-in duration-1000 px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between bg-glass p-4 rounded-[32px] border border-white/10 gap-4">
             <button 
                onClick={() => { onReset(); setProBrief(null); }}
                className="flex items-center space-x-3 px-6 py-2.5 bg-white/5 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all group border border-white/5"
             >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
                <span className="text-[10px] font-black uppercase tracking-widest">Restart Diagnosis</span>
             </button>
             <div className="flex items-center gap-3">
                <button className="px-6 py-2.5 bg-blue-600 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-95">
                  Share Findings
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-8">
              <div className="relative group aspect-[4/5] rounded-[48px] overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
                {previewUrl && (
                  <img src={previewUrl} alt="Analysis Target" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-1000" />
                )}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-12 left-12 w-16 h-16 border-t-2 border-l-2 border-blue-500/40 rounded-tl-2xl" />
                  <div className="absolute top-12 right-12 w-16 h-16 border-t-2 border-r-2 border-blue-500/40 rounded-tr-2xl" />
                  <div className="absolute bottom-12 left-12 w-16 h-16 border-b-2 border-l-2 border-blue-500/40 rounded-bl-2xl" />
                  <div className="absolute bottom-12 right-12 w-16 h-16 border-b-2 border-r-2 border-blue-500/40 rounded-br-2xl" />
                </div>
              </div>
              <div className="bg-glass p-8 rounded-[48px] border border-white/5 space-y-8 shadow-xl">
                <div className="flex items-center space-x-4 border-b border-white/5 pb-6">
                  <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 00-2 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Resolution Protocol</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  {diagnosticResult.steps.map((step, i) => (
                    <div key={i} className="flex items-start space-x-4 p-5 bg-white/2 rounded-3xl border border-white/5 group hover:bg-white/5 transition-all">
                      <span className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-xs font-black text-white shrink-0">{i+1}</span>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed group-hover:text-white transition-colors">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <DiagnosticCard result={diagnosticResult} />
              
              {expert ? (
                <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-1000">
                  <div className="flex items-center justify-between px-4">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Elite Recommendation</h3>
                  </div>
                  
                  <ExpertCard 
                    expert={expert} 
                    onBook={() => onBookExpert(expert)}
                    onClick={() => onExpertClick(expert)}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {!proBrief ? (
                      <button 
                        onClick={handleGenerateBrief}
                        disabled={isGeneratingBrief}
                        className="w-full py-6 bg-white/5 border border-white/10 text-white rounded-[32px] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all flex items-center justify-center gap-4 group"
                      >
                        {isGeneratingBrief ? "Synthesizing Brief..." : "1. Generate Pro-Brief"}
                      </button>
                    ) : (
                      <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-[32px] flex items-center justify-between">
                         <div className="flex items-center gap-4">
                           <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                           <span className="text-[10px] font-black text-white uppercase tracking-widest">Brief Locked</span>
                         </div>
                         <button onClick={() => setProBrief(null)} className="text-[8px] font-black text-slate-500 uppercase">Clear</button>
                      </div>
                    )}

                    <button 
                      onClick={handleStartNegotiation}
                      disabled={!proBrief}
                      className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-[32px] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-20 group"
                    >
                      <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                      2. Auto-Negotiate
                    </button>
                  </div>

                  {proBrief && (
                    <div className="bg-glass p-8 rounded-[48px] border border-white/5 space-y-6">
                      <h4 className="text-sm font-black text-blue-400 uppercase tracking-widest">Technical Brief Payload</h4>
                      <p className="text-slate-300 text-sm font-medium leading-relaxed font-mono bg-black/20 p-6 rounded-3xl border border-white/5">
                        {proBrief.technicalSummary}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-glass p-16 rounded-[60px] border border-white/5 text-center space-y-8">
                  <h4 className="text-2xl font-black text-white uppercase tracking-tight">Manual Triage Required</h4>
                  <p className="text-slate-500 text-base max-w-sm mx-auto font-medium leading-relaxed">The anomaly detected exceeds automatic matching protocols.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showNegotiator && (
        <NegotiatorPanel 
          logs={negLogs} 
          result={negResult} 
          isNegotiating={isNegotiating} 
          onClose={() => setShowNegotiator(false)} 
          onBook={(exp, price) => {
            setShowNegotiator(false);
            onBookingWithNegotiation(exp, price);
          }}
        />
      )}
    </div>
  );
};

export default ScanPage;
