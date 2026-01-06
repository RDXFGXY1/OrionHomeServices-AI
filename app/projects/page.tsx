
import React from 'react';

const ProjectsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const stories = [
    { id: 1, title: 'Bathroom Revive', user: 'Alex M.', time: '2 days ago', before: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?w=600&fit=crop', after: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&fit=crop', expert: 'Sarah J.', tags: ['Plumbing', 'Modern'] },
    { id: 2, title: 'Smart Panel Upgrade', user: 'David K.', time: '1 week ago', before: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&fit=crop', after: 'https://images.unsplash.com/photo-1621905231727-07a9a5a7667e?w=600&fit=crop', expert: 'Marcus T.', tags: ['Electrical', 'AI'] },
    { id: 3, title: 'Zen Garden', user: 'Maya L.', time: '3 days ago', before: 'https://images.unsplash.com/photo-1592150621344-82d43b4a230c?w=600&fit=crop', after: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&fit=crop', expert: 'Elena R.', tags: ['Gardening', 'Landscape'] },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-left-4 duration-500 pb-12">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Showcase</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Real results by real Orion Experts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {stories.map(story => (
          <div key={story.id} className="space-y-6">
            <div className="relative group overflow-hidden rounded-[40px] border border-white/10 bg-glass shadow-2xl">
              <div className="grid grid-cols-2 h-80">
                <div className="relative overflow-hidden border-r border-white/5">
                  <img src={story.before} className="w-full h-full object-cover opacity-60 grayscale" alt="Before" />
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 rounded-lg text-[8px] font-black text-white uppercase tracking-widest">Before</div>
                </div>
                <div className="relative overflow-hidden">
                  <img src={story.after} className="w-full h-full object-cover" alt="After" />
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-blue-600 rounded-lg text-[8px] font-black text-white uppercase tracking-widest shadow-[0_0_10px_rgba(37,99,235,0.5)]">After</div>
                </div>
              </div>
              
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight">{story.title}</h3>
                    <p className="text-slate-500 text-sm">Completed by <span className="text-blue-400 font-bold">{story.expert}</span> for {story.user}</p>
                  </div>
                  <div className="flex space-x-2">
                    {story.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center space-x-2 text-slate-500 text-xs">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/></svg>
                    <span>124 Likes</span>
                  </div>
                  <button className="text-xs font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors">View Project Details</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
