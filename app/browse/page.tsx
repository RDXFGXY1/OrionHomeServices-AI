
import React, { useState, useMemo } from 'react';
import ExpertCard from '../../components/ExpertCard';
import { Expert } from '../../types';
import { CATEGORIES } from '../../data/mockData';

interface BrowsePageProps {
  experts: Expert[];
  onBookExpert: (expert: Expert) => void;
  onExpertClick: (expert: Expert) => void;
  initialSearch: string;
  onSearchUpdate: (val: string) => void;
}

const BrowsePage: React.FC<BrowsePageProps> = ({ experts, onBookExpert, onExpertClick, initialSearch, onSearchUpdate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  // Filter and Sort Logic
  const filteredExperts = useMemo(() => {
    let result = [...experts];

    if (initialSearch) {
      const lowerSearch = initialSearch.toLowerCase();
      result = result.filter(e => 
        e.name.toLowerCase().includes(lowerSearch) || 
        e.description.toLowerCase().includes(lowerSearch) ||
        e.skills.some(skill => skill.toLowerCase().includes(lowerSearch)) ||
        e.category.toLowerCase().includes(lowerSearch) ||
        e.location.toLowerCase().includes(lowerSearch)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(e => e.category === selectedCategory);
    }

    result.sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerHour - b.pricePerHour;
      if (sortBy === 'price-high') return b.pricePerHour - a.pricePerHour;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return 0;
    });

    return result;
  }, [experts, initialSearch, selectedCategory, sortBy]);

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-1000 pb-32 w-full max-w-[1800px] mx-auto">
      {/* Cinematic Header Section */}
      <section className="relative pt-4 md:pt-8 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-60 bg-blue-600/10 blur-[150px] rounded-full -z-10" />
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12">
          <div className="space-y-4 md:space-y-6 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 ring-2 ring-blue-500/20" />
                 ))}
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
                <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Network Active</span>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
              Elite <br className="hidden lg:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Discovery</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-xl font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Vetted 1% specialists synced via the Orion Neural Network.
            </p>
          </div>

          <div className="bg-glass px-5 md:px-10 py-5 md:py-8 rounded-[32px] md:rounded-[48px] border border-white/5 flex items-center justify-around md:justify-start gap-4 md:gap-12 shadow-2xl mx-auto lg:mx-0 w-full lg:w-auto">
            <div className="text-center">
              <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Wait Time</p>
              <p className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-none">Minimal</p>
            </div>
            <div className="w-px h-10 md:h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Verified</p>
              <p className="text-xl md:text-2xl font-black text-blue-400 uppercase tracking-tighter leading-none">{experts.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Filter Navigation */}
      <section className="sticky top-20 md:top-24 z-50 px-2 md:px-4">
        <div className="bg-glass/80 backdrop-blur-3xl p-2 md:p-4 rounded-[28px] md:rounded-[36px] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-3">
          <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar w-full py-1">
            <button 
              onClick={() => setSelectedCategory('All')}
              className={`px-5 md:px-8 py-2.5 md:py-4 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === 'All' ? 'bg-white text-black shadow-xl' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
            >
              All Disciplines
            </button>
            <div className="w-px h-6 md:h-8 bg-white/10 shrink-0 mx-1" />
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 md:px-6 py-2.5 md:py-4 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border flex items-center gap-2 md:gap-3 ${selectedCategory === cat.name ? 'bg-blue-600 border-blue-500 text-white shadow-xl' : 'bg-white/5 border-transparent text-slate-500 hover:text-white hover:border-white/20'}`}
              >
                <span className="text-sm md:text-base leading-none">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="h-8 w-px bg-white/10 hidden md:block" />

          <div className="shrink-0 flex items-center bg-white/5 p-1 rounded-xl md:rounded-2xl border border-white/5 w-full md:w-auto overflow-x-auto no-scrollbar">
            {[
              { id: 'rating', label: 'Rank' },
              { id: 'price-low', label: 'Rate ↑' },
              { id: 'price-high', label: 'Rate ↓' }
            ].map(sort => (
              <button 
                key={sort.id}
                onClick={() => setSortBy(sort.id)}
                className={`px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-tighter transition-all flex-1 md:flex-none whitespace-nowrap ${sortBy === sort.id ? 'bg-white/10 text-white shadow-lg' : 'text-slate-600 hover:text-slate-400'}`}
              >
                {sort.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery Feed Grid - Uses dynamic auto-fill for perfect responsiveness */}
      <section className="px-4">
        {filteredExperts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-6 md:gap-8">
            {filteredExperts.map((expert, idx) => (
              <div 
                key={expert.id} 
                className="animate-in fade-in slide-in-from-bottom-6 duration-700 h-full" 
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <ExpertCard 
                  expert={expert} 
                  onBook={() => onBookExpert(expert)} 
                  onClick={() => onExpertClick(expert)} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 md:py-48 text-center space-y-6 bg-glass rounded-[40px] md:rounded-[80px] border border-white/5 border-dashed relative overflow-hidden px-6">
            <div className="absolute inset-0 bg-blue-600/5 blur-[100px] -z-10" />
            <div className="w-20 h-20 md:w-32 md:h-32 bg-slate-900 rounded-full flex items-center justify-center mx-auto border border-white/5 shadow-inner">
              <svg className="w-10 h-10 md:w-16 md:h-16 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">Query Terminated</h3>
              <p className="text-slate-500 max-w-md mx-auto text-sm md:text-lg font-medium leading-relaxed">
                The Orion Neural Link couldn't find matches for your search.
              </p>
            </div>
            <button 
              onClick={() => { onSearchUpdate(''); setSelectedCategory('All'); setSortBy('rating'); }}
              className="px-8 md:px-12 py-4 md:py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] rounded-[20px] hover:bg-blue-600 hover:text-white transition-all active:scale-95"
            >
              Reset Search Grid
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default BrowsePage;
