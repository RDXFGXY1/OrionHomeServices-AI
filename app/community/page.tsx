
import React from 'react';

interface CommunityPageProps {
  onBack: () => void;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ onBack }) => {
  const localHeroes = [
    { name: 'Sarah Jennings', jobs: 1240, rank: '#1 Plumbing', district: 'Manhattan' },
    { name: 'James Chen', jobs: 940, rank: '#2 Electrical', district: 'Queens' },
    { name: 'Elena Rodriguez', jobs: 820, rank: '#1 Cleaning', district: 'Brooklyn' },
  ];

  const recentReviews = [
    { user: 'Mark T.', project: 'Bathroom Revive', rating: 5, comment: 'Sarah was professional and finished the repiping 2 hours early.' },
    { user: 'Sienna R.', project: 'Panel Upgrade', rating: 5, comment: 'The AI diagnostic was spot on for my circuit issue.' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <div className="flex items-center gap-6">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Local Community</h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Neighborhood Verified Network</p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-black text-white uppercase tracking-tight px-2">Top Specialists in your Zip</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {localHeroes.map(hero => (
            <div key={hero.name} className="bg-glass p-8 rounded-[40px] border border-white/5 space-y-4 hover:border-blue-500/20 transition-all">
              <div>
                <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest">{hero.rank}</p>
                <h4 className="text-xl font-black text-white uppercase tracking-tight">{hero.name}</h4>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <span>{hero.jobs} Projects</span>
                <span>{hero.district}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-glass p-10 rounded-[56px] border border-white/5 space-y-8">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">Recent Feedback</h3>
          <div className="space-y-6">
             {recentReviews.map((rev, i) => (
               <div key={i} className="space-y-2 border-b border-white/5 pb-6 last:border-0 last:pb-0">
                 <div className="flex justify-between items-center">
                   <p className="text-xs font-black text-white uppercase">{rev.user} <span className="text-slate-600 mx-2">•</span> {rev.project}</p>
                   <div className="flex text-yellow-400 gap-0.5">
                     {[...Array(rev.rating)].map((_, i) => <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                   </div>
                 </div>
                 <p className="text-slate-400 text-sm italic font-medium leading-relaxed">"{rev.comment}"</p>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-10 rounded-[56px] border border-white/10 space-y-6 flex flex-col justify-center text-center">
           <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Share Your Success</h3>
           <p className="text-slate-400 text-lg font-medium leading-relaxed">Post your recent Orion repair to the community feed and help neighbors find the right pros. Earn verified status for your home asset profile.</p>
           <button className="px-8 py-5 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-[28px] shadow-2xl hover:scale-105 active:scale-95 transition-all mt-4 mx-auto w-fit">Submit Case Study</button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
