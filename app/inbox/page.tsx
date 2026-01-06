
import React, { useMemo } from 'react';
import { Expert, Message } from '../../types';

interface InboxPageProps {
  onBack: () => void;
  chatMessages: Record<string, Message[]>;
  experts: Expert[];
  onExpertClick: (expert: Expert) => void;
}

const InboxPage: React.FC<InboxPageProps> = ({ onBack, chatMessages, experts, onExpertClick }) => {
  
  const conversations = useMemo(() => {
    return Object.entries(chatMessages).map(([expertId, messages]) => {
      const expert = experts.find(e => e.id === expertId);
      if (!expert || messages.length === 0) return null;
      
      const lastMessage = messages[messages.length - 1];
      const unreadCount = messages.filter(m => m.sender === 'expert' && m.status !== 'read').length;

      return {
        expert,
        lastMessage,
        unreadCount
      };
    }).filter(c => c !== null).sort((a, b) => b!.lastMessage.timestamp.getTime() - a!.lastMessage.timestamp.getTime());
  }, [chatMessages, experts]);

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <div className="flex items-center gap-6">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Neural Inbox</h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Real-time sync with experts & hubs</p>
        </div>
      </div>

      <div className="space-y-4">
        {conversations.length > 0 ? conversations.map(conv => (
          <div 
            key={conv!.expert.id} 
            onClick={() => onExpertClick(conv!.expert)}
            className={`group bg-glass p-6 rounded-[32px] border transition-all cursor-pointer flex items-center justify-between ${conv!.unreadCount > 0 ? 'border-blue-500/30 bg-blue-500/5' : 'border-white/5 hover:border-white/10'}`}
          >
            <div className="flex items-center gap-5">
              <div className="relative">
                <img src={conv!.expert.avatar} className="w-14 h-14 rounded-2xl object-cover border border-white/10" alt={conv!.expert.name} />
                {conv!.unreadCount > 0 && <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-slate-950 animate-pulse" />}
              </div>
              <div className="min-w-0">
                <h3 className={`font-black text-white uppercase tracking-tight ${conv!.unreadCount > 0 ? 'text-blue-400' : ''}`}>{conv!.expert.name}</h3>
                <p className="text-sm text-slate-400 font-medium line-clamp-1 truncate pr-4">
                  {conv!.lastMessage.sender === 'user' ? 'You: ' : ''}{conv!.lastMessage.text}
                </p>
              </div>
            </div>
            <div className="text-right space-y-2 shrink-0">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{getTimeAgo(conv!.lastMessage.timestamp)}</p>
              {conv!.unreadCount > 0 && <span className="text-[8px] font-black text-blue-400 uppercase tracking-[0.2em] bg-blue-500/10 px-2 py-0.5 rounded">New Message</span>}
            </div>
          </div>
        )) : (
          <div className="py-24 text-center space-y-6 bg-glass rounded-[40px] border border-white/5 border-dashed px-6">
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto border border-white/5">
              <svg className="w-10 h-10 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">No transmissions found</h3>
              <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium">When you initiate a live consultation with a specialist, your conversation thread will appear here.</p>
            </div>
            <button 
              onClick={onBack}
              className="px-8 py-3 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
            >
              Explore Specialists
            </button>
          </div>
        )}
      </div>

      <div className="bg-glass p-8 rounded-[40px] border border-white/5 space-y-4">
         <div className="flex items-center gap-4 text-blue-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span className="text-[10px] font-black uppercase tracking-widest">Neural Link Security</span>
         </div>
         <p className="text-xs text-slate-500 font-medium leading-relaxed">All transmissions are end-to-end encrypted within the NYC Metropolitan Hub. Expert advice is strictly for the identified asset and should be verified against site safety protocols.</p>
      </div>
    </div>
  );
};

export default InboxPage;
