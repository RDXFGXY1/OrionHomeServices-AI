
import React, { useState, useRef, useEffect } from 'react';
import { Expert, Message } from '../types';
import { getExpertResponse, getQuickReplySuggestions } from '../geminiService';

interface ExpertDetailPageProps {
  expert: Expert;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onBook: () => void;
  onBack: () => void;
  chatHistory: Message[];
  onAddMessage: (msg: Message) => void;
}

const ExpertDetailPage: React.FC<ExpertDetailPageProps> = ({ 
  expert, 
  isFavorited, 
  onToggleFavorite, 
  onBook, 
  onBack,
  chatHistory,
  onAddMessage
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message if history is empty
  useEffect(() => {
    if (chatHistory.length === 0) {
      const welcome: Message = {
        id: 'welcome-' + expert.id,
        text: `Hi! I'm ${expert.name.split(' ')[0]}. I see you're looking for help in ${expert.location}. How can I assist you today?`,
        sender: 'expert',
        timestamp: new Date(),
        status: 'read'
      };
      onAddMessage(welcome);
    }
  }, [expert.id, chatHistory.length]);

  // Initial suggestions generation based on last message
  useEffect(() => {
    const fetchInitialSuggestions = async () => {
      if (chatHistory.length === 0) return;
      try {
        const lastMsg = chatHistory[chatHistory.length - 1];
        const initial = await getQuickReplySuggestions(expert, [
          { role: lastMsg.sender === 'user' ? 'user' : 'model', text: lastMsg.text }
        ]);
        if (initial && initial.length > 0) setSuggestions(initial);
      } catch (e) {
        console.error("Failed to fetch suggestions", e);
      }
    };
    fetchInitialSuggestions();
  }, [expert.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  const handleShare = async () => {
    const shareData = {
      title: `Orion Home Services - ${expert.name}`,
      text: `Check out ${expert.name}, a top-tier ${expert.category} specialist on Orion. Verified expertise and instant booking available.`,
      url: window.location.href,
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Expert profile link copied to clipboard!');
      }
    } catch (err) {
      console.debug('Share cancelled or failed', err);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text: text,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    const currentHistory: { role: 'user' | 'model'; text: string }[] = chatHistory.map(m => ({
      role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
      text: m.text
    }));

    onAddMessage(userMsg);
    setIsTyping(true);
    setSuggestions([]);

    try {
      const responseText = await getExpertResponse(expert, text, currentHistory);
      
      const expertMsg: Message = {
        id: Math.random().toString(36).substr(2, 9),
        text: responseText,
        sender: 'expert',
        timestamp: new Date(),
        status: 'read'
      };
      
      onAddMessage(expertMsg);
      setIsTyping(false);

      setIsGeneratingSuggestions(true);
      const updatedHistory: { role: 'user' | 'model'; text: string }[] = [
        ...currentHistory, 
        { role: 'user', text: text },
        { role: 'model', text: responseText }
      ];
      const nextSuggestions = await getQuickReplySuggestions(expert, updatedHistory);
      setSuggestions(nextSuggestions);
      setIsGeneratingSuggestions(false);
    } catch (error) {
      console.error("Chat error:", error);
      setIsTyping(false);
      setSuggestions(["Can we try again?", "I need help with something else", "How much do you charge?"]);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="relative space-y-12 animate-in fade-in slide-in-from-right-8 duration-500 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <button 
          onClick={onBack}
          className="w-fit flex items-center space-x-2 text-slate-500 hover:text-white transition-all group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          <span className="font-bold text-sm uppercase tracking-widest">Return to Explore</span>
        </button>
        <div className="flex items-center gap-3">
          {expert.badges.map(badge => (
            <span key={badge} className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded-lg">
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Profile Card Sidebar */}
        <div className="w-full lg:w-[380px] space-y-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-600 blur-[80px] opacity-20 transition-opacity group-hover:opacity-40"></div>
            <img src={expert.avatar} alt={expert.name} className="relative w-full aspect-square rounded-[56px] object-cover border border-white/10 shadow-2xl" />
            
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-glass backdrop-blur-3xl border border-white/10 p-5 rounded-[32px] shadow-2xl flex items-center justify-between">
              <div className="text-center flex-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Rating</p>
                <div className="flex items-center justify-center gap-1 text-yellow-400 font-black">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  <span>{expert.rating}</span>
                </div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center flex-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Reviews</p>
                <p className="text-white font-black">{expert.reviews}</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center flex-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Rate</p>
                <p className="text-white font-black">${expert.pricePerHour}</p>
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-4">
             <button onClick={onBook} className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-3xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95">
               Instant Booking
             </button>
             <button onClick={() => setIsChatOpen(true)} className="w-full py-5 bg-blue-500/10 text-blue-400 font-black uppercase tracking-widest text-xs rounded-3xl border border-blue-500/20 hover:bg-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-3">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
               Live Consultation
             </button>
             <div className="grid grid-cols-2 gap-4">
               <button 
                onClick={onToggleFavorite}
                className={`w-full py-5 bg-white/5 font-black uppercase tracking-widest text-[10px] rounded-3xl border transition-all active:scale-95 flex items-center justify-center gap-3 group/fav ${isFavorited ? 'border-red-500/40 text-red-400 bg-red-500/5' : 'border-white/10 text-white hover:bg-white/10'}`}
               >
                 <svg className={`w-5 h-5 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'text-slate-400 group-hover/fav:text-white'}`} fill={isFavorited ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                 </svg>
                 {isFavorited ? 'Favorited' : 'Favorite'}
               </button>
               <button 
                onClick={handleShare}
                className="w-full py-5 bg-white/5 text-white font-black uppercase tracking-widest text-[10px] rounded-3xl border border-white/10 hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center gap-3 group/share"
               >
                 <svg className="w-5 h-5 text-slate-400 group-hover/share:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                 </svg>
                 Share
               </button>
             </div>
          </div>

          <div className="bg-glass p-8 rounded-[40px] border border-white/5 space-y-6">
            <h4 className="text-sm font-black text-white uppercase tracking-widest">Performance Matrix</h4>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-xs text-slate-500 font-bold uppercase">Experience</span>
                <span className="text-xs text-white font-black">{expert.yearsOfExperience} Years</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-xs text-slate-500 font-bold uppercase">Response Time</span>
                <span className="text-xs text-blue-400 font-black">{expert.responseTime}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-xs text-slate-500 font-bold uppercase">Jobs Done</span>
                <span className="text-xs text-white font-black">{expert.completedJobs}+</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-slate-500 font-bold uppercase">Languages</span>
                <span className="text-xs text-white font-black">{expert.languages.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="flex-1 space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">{expert.name}</h2>
              {expert.isVerified && (
                <div className="p-1.5 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.6)]">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-slate-400">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998(1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span className="font-bold text-lg">{expert.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04a11.352 11.352 0 00-1.42 14.055 11.955 11.955 0 0010.038 5.944 11.955 11.955 0 0010.038-5.944 11.352 11.352 0 00-1.42-14.055z"/></svg>
                <span className="font-bold text-lg uppercase tracking-tight">{expert.category} Professional</span>
              </div>
              <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-black text-slate-500 uppercase tracking-widest">
                Service Radius: {expert.serviceRadius} miles
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Biography</h3>
            <p className="text-slate-400 text-xl leading-relaxed font-medium">
              {expert.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Schedule</h3>
              <div className="grid grid-cols-7 gap-2">
                {allDays.map(day => {
                  const isActive = expert.availability.includes(day);
                  return (
                    <div key={day} className="flex flex-col items-center gap-2">
                      <div className={`w-full aspect-square rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-tighter transition-all ${isActive ? 'bg-blue-600 text-white shadow-xl' : 'bg-white/5 text-slate-600 border border-white/5 opacity-40'}`}>
                        {day[0]}
                      </div>
                      <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-blue-400' : 'text-slate-700'}`}>{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Certifications</h3>
              <div className="space-y-3">
                {expert.certifications.map(cert => (
                  <div key={cert} className="flex items-center gap-4 p-4 bg-white/2 rounded-2xl border border-white/5 group hover:bg-white/5 transition-all">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <span className="text-slate-300 font-bold text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Panel */}
      <div className={`fixed inset-y-0 right-0 z-[150] w-full max-w-md bg-slate-900/95 backdrop-blur-3xl border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 ease-out ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 ring-2 ring-blue-500/20">
                <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-black text-white uppercase tracking-tight leading-none">{expert.name}</h4>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Active Now</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full text-slate-500 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth no-scrollbar">
            {chatHistory.map(msg => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-4 rounded-[24px] text-sm font-medium leading-relaxed shadow-xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-none'}`}>
                  {msg.text}
                </div>
                <div className={`flex items-center gap-1.5 mt-1.5 px-1 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <span className="text-[9px] opacity-40 font-bold uppercase tracking-tighter text-slate-400">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {msg.sender === 'user' && (
                    <div className="flex items-center gap-px">
                      <svg className={`w-3.5 h-3.5 ${msg.status === 'read' ? 'text-blue-400' : 'text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                      {msg.status !== 'sent' && <svg className={`w-3.5 h-3.5 -ml-2 ${msg.status === 'read' ? 'text-blue-400' : 'text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-bl-none flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-4 space-y-3 bg-slate-900/40">
            <div className="flex items-center justify-between px-1">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Suggestions</p>
              {isGeneratingSuggestions && <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((reply, idx) => (
                <button 
                  key={idx} 
                  onClick={() => sendMessage(reply)} 
                  disabled={isTyping} 
                  className="px-4 py-2 bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 rounded-full text-xs font-bold text-slate-300 hover:text-white transition-all whitespace-nowrap active:scale-95 disabled:opacity-50"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-white/10 bg-slate-950/50">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
              className="relative flex items-center gap-3"
            >
              <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                placeholder="Type your message..." 
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-blue-500/50 transition-all" 
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim() || isTyping} 
                className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-500 transition-all disabled:opacity-20 shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetailPage;
