
import React, { useState } from 'react';
import { optimizePartnerProfile } from '../../geminiService';

interface PartnerPageProps {
  onBack: () => void;
}

const PartnerOnboardingPage: React.FC<PartnerPageProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Plumbing',
    bio: '',
    skills: [] as string[]
  });
  
  const [optimization, setOptimization] = useState<{
    polishedBio: string;
    suggestedSkills: string[];
    marketAnalysis: string;
  } | null>(null);

  const handleOptimize = async () => {
    if (!formData.bio || !formData.name) return;
    setLoading(true);
    try {
      const result = await optimizePartnerProfile(formData);
      setOptimization(result);
      setStep(2);
    } catch (e) {
      console.error(e);
      alert("AI Calibration failed. Please check your data.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = () => {
    setStep(3);
  };

  return (
    <div className="min-h-screen py-12 px-4 max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <header className="flex items-center justify-between border-b border-white/10 pb-10">
        <div className="space-y-4">
           <button onClick={onBack} className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.3em] flex items-center gap-2 transition-all">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/></svg>
             Return to Hub
           </button>
           <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.85]">
             Sector <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Recruitment</span>
           </h1>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-2">
           <div className="px-4 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Network Tier: Tier 1 Entry</span>
           </div>
           <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Current Openings: NYC Metropolitan Area</p>
        </div>
      </header>

      <main className="relative">
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-8 bg-glass p-10 rounded-[48px] border border-white/5 shadow-2xl">
                <div className="space-y-6">
                   <h2 className="text-3xl font-black text-white uppercase tracking-tight">Personnel Dossier</h2>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Professional Name</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="John Carter"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-blue-500 transition-all shadow-inner"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Category Discipline</label>
                        <select 
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                        >
                          <option value="Plumbing">Plumbing</option>
                          <option value="Electrical">Electrical</option>
                          <option value="HVAC">HVAC</option>
                          <option value="General Maintenance">General Maintenance</option>
                        </select>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Expertise Narrative</label>
                      <textarea 
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        placeholder="I have 10 years experience fixing leaks and boilers..."
                        className="w-full h-40 bg-white/5 border border-white/10 rounded-[32px] py-6 px-8 text-white focus:outline-none focus:border-blue-500 transition-all resize-none shadow-inner"
                      />
                   </div>
                </div>

                <button 
                  onClick={handleOptimize}
                  disabled={loading || !formData.bio || !formData.name}
                  className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-[32px] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-30 group"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                      Initialize Neural Optimization
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <div className="bg-glass p-8 rounded-[48px] border border-white/5 space-y-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                </div>
                <div className="space-y-2">
                   <h3 className="text-xl font-black text-white uppercase tracking-tight">Clearance Requirements</h3>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Orion Partner Standards</p>
                </div>
                <div className="space-y-4">
                  {[
                    "Verified NYC Business License",
                    "Minimum 5 Years Field Experience",
                    "Certified General Liability Insurance",
                    "Successful Neural Background Sync"
                  ].map((req, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/2 rounded-2xl border border-white/5">
                       <div className="w-6 h-6 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                       </div>
                       <span className="text-xs font-bold text-slate-400">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && optimization && (
          <div className="space-y-12 animate-in slide-in-from-bottom-12 duration-1000">
            <div className="bg-slate-900 border-2 border-blue-500/40 rounded-[64px] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
              <div className="bg-blue-600/10 p-8 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 bg-blue-600 rounded-[24px] flex items-center justify-center text-white shadow-2xl animate-pulse">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none">AI Optimized Clearance</h3>
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-1">Profile Calibrated for NYC Hub {formData.category} Sector</p>
                   </div>
                </div>
                <button onClick={() => setStep(1)} className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest">Edit Raw Data</button>
              </div>

              <div className="p-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
                 <div className="space-y-10">
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Optimized Professional Bio</h4>
                       <div className="p-8 bg-white/2 rounded-[40px] border border-white/10 relative group">
                          <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                             <div className="px-2 py-0.5 bg-blue-500 text-[8px] font-black text-white rounded">AI ENHANCED</div>
                          </div>
                          <p className="text-white text-xl font-medium leading-relaxed italic">
                            "{optimization.polishedBio}"
                          </p>
                       </div>
                    </div>

                    <div className="p-8 bg-blue-500/5 rounded-[40px] border border-blue-500/10 space-y-4">
                       <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Neural Market Analysis</h4>
                       <p className="text-slate-300 text-sm font-medium leading-relaxed">
                          {optimization.marketAnalysis}
                       </p>
                    </div>
                 </div>

                 <div className="space-y-10">
                    <div className="space-y-6">
                       <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Suggested Skill Matrix</h4>
                       <div className="grid grid-cols-1 gap-4">
                          {optimization.suggestedSkills.map((skill, i) => (
                            <div key={i} className="flex items-center justify-between p-5 bg-white/2 rounded-2xl border border-white/5 hover:border-blue-500/40 transition-all group">
                               <span className="text-slate-400 font-bold group-hover:text-white transition-colors">{skill}</span>
                               <button className="text-[8px] font-black text-blue-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Add to License</button>
                            </div>
                          ))}
                       </div>
                    </div>

                    <button 
                      onClick={handleFinalSubmit}
                      className="w-full py-6 bg-white text-black rounded-[32px] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:bg-emerald-500 hover:text-white transition-all active:scale-95"
                    >
                      Authenticate & Submit Dossier
                    </button>
                 </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-2xl mx-auto py-24 text-center space-y-10 animate-in zoom-in-95 duration-1000">
             <div className="relative inline-block">
                <div className="absolute inset-0 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse" />
                <div className="relative w-32 h-32 bg-white/5 border border-white/10 rounded-[48px] flex items-center justify-center shadow-2xl mx-auto">
                   <svg className="w-16 h-16 text-emerald-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                </div>
             </div>
             <div className="space-y-4">
                <h2 className="text-5xl font-black text-white uppercase tracking-tighter">Transmission Complete</h2>
                <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm mx-auto">Your optimized dossier has been received by the Sector Commander. Identity validation is now in progress.</p>
             </div>
             <div className="flex flex-col items-center gap-6">
                <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full">
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Est. Response Time: 24-48 Hours</span>
                </div>
                <button 
                  onClick={onBack}
                  className="px-12 py-5 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/5 transition-all"
                >
                  Return to Control Hub
                </button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PartnerOnboardingPage;
