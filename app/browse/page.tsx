
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

  const filteredExperts = useMemo(() => {
    let result = [...experts];
    if (initialSearch) {
      const lowerSearch = initialSearch.toLowerCase();
      result = result.filter(e => 
        e.name.toLowerCase().includes(lowerSearch) || 
        e.description.toLowerCase().includes(lowerSearch) ||
        e.category.toLowerCase().includes(lowerSearch)
      );
    }
    if (selectedCategory !== 'All') {
      result = result.filter(e => e.category === selectedCategory);
    }
    result.sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerHour - b.pricePerHour;
      if (sortBy === 'price-high') return b.pricePerHour - a.pricePerHour;
      return b.rating - a.rating;
    });
    return result;
  }, [experts, initialSearch, selectedCategory, sortBy]);

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-1000 pb-32 w-full mx-auto">
      <section className="relative pt-4 px-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
              Elite <br className="hidden lg:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Discovery</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-xl font-medium max-w-2xl">
              Vetted 1% specialists synced via the Orion Neural Network.
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-20 md:top-24 z-50 px-2 md:px-4">
        <div className="bg-glass/80 backdrop-blur-3xl p-2 md:p-4 rounded-[28px] md:rounded-[36px] border border-white/10 flex flex-col md:flex-row items-center gap-3">
          <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar w-full py-1">
            <button 
              onClick={() => setSelectedCategory('All')}
              className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedCategory === 'All' ? 'bg-white text-black' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
            >
              All Disciplines
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border flex items-center gap-2 ${selectedCategory === cat.name ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-transparent text-slate-500 hover:text-white'}`}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4">
        {filteredExperts.length > 0 ? (
          <div 
            className="grid gap-6 md:gap-8"
            style={{ 
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))' 
            }}
          >
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
          <div className="py-24 text-center space-y-6 bg-glass rounded-[40px] border border-white/5 px-6">
            <h3 className="text-2xl font-black text-white uppercase">Query Terminated</h3>
            <button onClick={() => onSearchUpdate('')} className="px-8 py-4 bg-white text-black font-black uppercase text-[10px] rounded-[20px]">Reset Grid</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default BrowsePage;
