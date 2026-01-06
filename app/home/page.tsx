
import React from 'react';
import Hero from '../../components/Hero';
import CategoryGrid from '../../components/CategoryGrid';
import ExpertCard from '../../components/ExpertCard';
import Icon from '../../components/Icon';
import { Expert, ServiceCategory } from '../../types';

interface HomePageProps {
  categories: ServiceCategory[];
  experts: Expert[];
  onScanClick: () => void;
  onBrowseClick: () => void;
  onBookExpert: (expert: Expert) => void;
  onExpertClick: (expert: Expert) => void;
  onPartnerClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  categories, 
  experts, 
  onScanClick, 
  onBrowseClick, 
  onBookExpert, 
  onExpertClick,
  onPartnerClick
}) => {
  const topExperts = [...experts].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <div className="space-y-48 animate-in fade-in duration-1000 pb-32">
      <Hero onScanClick={onScanClick} />
      
      {/* 3D FEATURE NODES */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 perspective-1000">
          {[
            { 
              title: "Multimodal Vision", 
              desc: "Gemini 3 vision identifies failure points at the pixel level.",
              icon: "eye",
              gradient: "from-blue-600 to-cyan-500" 
            },
            { 
              title: "Agentic Negotiation", 
              desc: "Orion's agent autonomous pings pros to find the best deal for you.",
              icon: "handshake",
              gradient: "from-indigo-600 to-purple-500" 
            },
            { 
              title: "Capital Escrow", 
              desc: "Your funds are protected by biometric project-completion verification.",
              icon: "shield",
              gradient: "from-purple-600 to-pink-500" 
            }
          ].map((node, i) => (
            <div key={i} className="hover-3d group p-12 bg-glass rounded-[56px] border border-white/5 transition-all duration-700 shadow-2xl relative overflow-hidden preserve-3d">
              <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${node.gradient} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity`} />
              <div className="mb-8 group-hover:scale-125 transition-transform duration-500 transform translate-z-20">
                <Icon name={node.icon} className="w-12 h-12 text-blue-400" />
              </div>
              <div className="space-y-4 relative z-10 transform translate-z-10">
                 <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-none">{node.title}</h4>
                 <p className="text-slate-500 text-sm font-medium leading-relaxed">{node.desc}</p>
                 <div className="h-1 w-0 bg-white/20 rounded-full group-hover:w-full transition-all duration-1000" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DISCIPLINE MATRIX */}
      <section className="space-y-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
               <div className="w-12 h-1 bg-blue-600 rounded-full" />
               <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Sector Navigation</p>
            </div>
            <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.8]">Expert <br/><span className="text-blue-500">Domains</span></h3>
          </div>
          <button onClick={onBrowseClick} className="px-12 py-6 bg-white/5 border border-white/10 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:text-white hover:border-white/30 transition-all group">
            Browse All <span className="ml-2 group-hover:translate-x-2 inline-block transition-transform">→</span>
          </button>
        </div>
        <div className="max-w-7xl mx-auto">
          <CategoryGrid categories={categories} onCategoryClick={(id) => onBrowseClick()} />
        </div>
      </section>

      {/* SPECIALIST NEXUS */}
      <section className="space-y-20 px-6">
        <div className="max-w-7xl mx-auto text-center md:text-left">
            <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.8]">Specialist <br/><span className="text-indigo-500">Nexus</span></h3>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-[0.3em] mt-6">Vetted professionals currently broadcasting in NYC Metropolitan Hub</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {topExperts.map((expert, idx) => (
            <div key={expert.id} className="animate-in fade-in slide-in-from-bottom-12 duration-1000" style={{ animationDelay: `${idx * 150}ms` }}>
              <ExpertCard 
                expert={expert} 
                onBook={() => onBookExpert(expert)} 
                onClick={() => onExpertClick(expert)} 
              />
            </div>
          ))}
        </div>
      </section>

      {/* PARTNER CTA: 3D PANEL */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto relative group preserve-3d">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[80px] blur-2xl opacity-10 group-hover:opacity-30 transition duration-1000" />
          <div className="relative bg-[#050a14] rounded-[72px] p-16 md:p-24 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-20 overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.9)]">
            
            <div className="space-y-10 flex-1 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-3 bg-blue-500/10 px-6 py-2 rounded-full border border-blue-500/20">
                 <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Recruitment Node Open</span>
              </div>
              <h4 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.8]">Expand <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">The Network</span></h4>
              <p className="text-slate-400 max-w-xl font-medium text-xl leading-relaxed mx-auto lg:mx-0">Scale your brand with NYC's most advanced service architecture. AI-led diagnostics and direct capital node settlement.</p>
            </div>
            
            <div className="z-10 w-full lg:w-auto">
              <button 
                onClick={onPartnerClick}
                className="w-full lg:w-auto px-20 py-10 bg-blue-600 text-white font-black uppercase tracking-[0.3em] text-sm rounded-[40px] shadow-[0_30px_60px_-15px_rgba(37,99,235,0.6)] hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all group/cta border border-white/10"
              >
                 Join The Hub
              </button>
            </div>

            {/* 3D Decorative Orb */}
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] group-hover:bg-blue-600/20 transition-all duration-1000" />
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 opacity-30 flex flex-col items-center gap-6">
         <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.6em]">Orion Home Industries • Sector Zero • 2024</p>
      </footer>
    </div>
  );
};

export default HomePage;
