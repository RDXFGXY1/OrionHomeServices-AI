
import React from 'react';

const LearningPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const articles = [
    { id: 1, title: 'How to Reset Your Circuit Breaker Safely', time: '5 min read', category: 'Electrical', img: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&fit=crop' },
    { id: 2, title: 'Identifying Common Plumbing Leaks', time: '8 min read', category: 'Plumbing', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&fit=crop' },
    { id: 3, title: 'Air Filter Maintenance 101', time: '4 min read', category: 'HVAC', img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&fit=crop' },
    { id: 4, title: 'Essential Tools Every Homeowner Needs', time: '12 min read', category: 'General', img: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&fit=crop' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
      <div className="flex items-center space-x-6">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Learning Center</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Master your home maintenance with Orion Pro Guides</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map(article => (
          <div key={article.id} className="group bg-glass rounded-[40px] border border-white/5 overflow-hidden hover:border-blue-500/30 transition-all cursor-pointer">
            <div className="h-56 overflow-hidden relative">
              <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-6 px-3 py-1 bg-black/60 rounded-lg text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                {article.category}
              </div>
            </div>
            <div className="p-8 space-y-4">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-blue-400 transition-colors">{article.title}</h3>
              <div className="flex items-center space-x-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>{article.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-glass p-10 rounded-[48px] border border-white/5 text-center space-y-6">
        <h4 className="text-xl font-black text-white uppercase">Subscribe to Pro Tips</h4>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">Get monthly maintenance checklists and deep-dive technical articles delivered to your inbox.</p>
        <div className="flex max-w-md mx-auto gap-3">
          <input type="email" placeholder="email@address.com" className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500/50" />
          <button className="px-6 py-4 bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-blue-500">Join</button>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
