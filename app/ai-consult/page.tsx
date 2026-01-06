
import React, { useState, useRef, useEffect } from 'react';
import { Expert } from '../../types';
import { getConsultationRecommendations } from '../../geminiService';
import ExpertCard from '../../components/ExpertCard';
import Icon from '../../components/Icon';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  imageUrl?: string;
  recommendedExperts?: Expert[];
  commandUsed?: string;
}

interface AIConsultPageProps {
  experts: Expert[];
  onBookExpert: (expert: Expert) => void;
  onExpertClick: (expert: Expert) => void;
  onBack: () => void;
}

const COMMANDS = [
  { tag: '@analyze', label: 'Technical Scan', desc: 'Deep vision-based failure analysis', icon: 'eye' },
  { tag: '@describe', label: 'Summarize', desc: 'Layman-friendly issue summary', icon: 'sparkles' },
  { tag: '@estimate', label: 'Price Projection', desc: 'NYC market-rate cost estimate', icon: 'wallet' },
  { tag: '@find', label: 'Match Expert', desc: 'Instant priority specialist matching', icon: 'search' },
];

const AIConsultPage: React.FC<AIConsultPageProps> = ({ experts, onBookExpert, onExpertClick, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Welcome to Orion Intelligence. I'm your Senior Maintenance Coordinator. Describe any issue or project you're planning, and I'll match you with the perfect specialists from our verified NYC network. You can also upload an image for a visual scan."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState<{ file: File; preview: string } | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Robust scroll to bottom on message updates
  const scrollToBottom = () => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      requestAnimationFrame(() => {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    
    if (val.endsWith('@')) {
      setShowCommands(true);
    } else if (!val.includes('@') || val === '') {
      setShowCommands(false);
    }
  };

  const applyCommand = (tag: string) => {
    const parts = inputValue.split(' ');
    if (parts[parts.length - 1].startsWith('@')) {
      parts[parts.length - 1] = tag;
    } else {
      parts.push(tag);
    }
    setInputValue(parts.join(' ') + ' ');
    setShowCommands(false);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setSelectedImage({ file, preview });
    }
  };

  const removeSelectedImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.preview);
      setSelectedImage(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!inputValue.trim() && !selectedImage) || isTyping) return;

    const userText = inputValue;
    const userImage = selectedImage;
    const commandUsed = COMMANDS.find(c => userText.includes(c.tag))?.tag;

    setInputValue('');
    setSelectedImage(null);
    setShowCommands(false);
    
    const userMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      text: userText || (userImage ? "Analyzation target uploaded." : ""),
      imageUrl: userImage?.preview,
      commandUsed
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      let imageData;
      if (userImage) {
        imageData = await new Promise<{ data: string, mimeType: string }>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = (reader.result as string).split(',')[1];
            resolve({ data: base64, mimeType: userImage.file.type });
          };
          reader.readAsDataURL(userImage.file);
        });
      }

      const history = messages.map(m => ({ role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model', text: m.text }));
      const result = await getConsultationRecommendations(userText, history, experts, imageData);
      
      const recommendedList = result.recommendedExpertIds
        .map(id => experts.find(e => e.id === id))
        .filter((e): e is Expert => !!e);

      const aiMsg: Message = {
        id: Math.random().toString(36).substr(2, 9),
        role: 'model',
        text: result.message,
        recommendedExperts: recommendedList.length > 0 ? recommendedList : undefined
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Consultation Error:", error);
      setMessages(prev => [...prev, {
        id: 'error',
        role: 'model',
        text: "I encountered a synchronization error while scanning our network. Please try describing your request again."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderMessageText = (text: string) => {
    const parts = text.split(/(@\w+)/g);
    return parts.map((part, i) => {
      const isCmd = COMMANDS.some(c => c.tag === part);
      if (isCmd) {
        return <span key={i} className="text-blue-200 font-black bg-blue-900/50 px-2 py-0.5 rounded-lg border border-blue-400/30 mx-0.5">{part}</span>;
      }
      return part;
    });
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-16rem)] bg-glass rounded-[48px] border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-900/30 backdrop-blur-3xl shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase">Orion Intelligence</h2>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Neural Link Active</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] font-black text-slate-500 uppercase tracking-widest">
            Concierge Mode
          </div>
        </div>
      </div>

      {/* Chat Area - Pure Flex scrollable */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth no-scrollbar relative overscroll-contain"
        style={{ overflowAnchor: 'none' }}
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-4`}>
            {msg.imageUrl && (
              <div className="relative group max-w-[300px] rounded-[32px] overflow-hidden border-4 border-slate-900 shadow-2xl">
                <img src={msg.imageUrl} alt="Uploaded" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-blue-600/10 pointer-events-none" />
              </div>
            )}
            
            <div className={`max-w-[85%] p-6 rounded-[32px] text-lg font-medium leading-relaxed shadow-2xl ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white/5 backdrop-blur-xl border border-white/10 text-slate-200 rounded-bl-none'
            }`}>
              {msg.role === 'user' ? renderMessageText(msg.text) : msg.text}
            </div>

            {msg.recommendedExperts && (
              <div className="w-full space-y-4 pt-4 animate-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-3 px-2">
                   <div className="h-px flex-1 bg-white/5" />
                   <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Specialist Discovery</span>
                   <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {msg.recommendedExperts.map(expert => (
                    <div key={expert.id} className="scale-[0.98] hover:scale-100 transition-transform duration-500">
                      <ExpertCard 
                        expert={expert} 
                        onBook={() => onBookExpert(expert)} 
                        onClick={() => onExpertClick(expert)} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex flex-col items-start space-y-4">
             <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl rounded-bl-none flex gap-2 items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <span className="ml-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">Scanning network nodes...</span>
             </div>
          </div>
        )}
        {/* Anchor for scroll */}
        <div className="h-px w-full pointer-events-none" />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-slate-950/50 border-t border-white/10 shrink-0 relative">
        {showCommands && (
          <div className="absolute bottom-full left-6 mb-6 w-72 bg-slate-900 border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in slide-in-from-bottom-4 duration-300 z-50">
            <div className="p-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Neural Link Commands</span>
              <button onClick={() => setShowCommands(false)} className="text-[9px] font-bold text-slate-400">Esc</button>
            </div>
            <div className="max-h-60 overflow-y-auto no-scrollbar">
              {COMMANDS.map((cmd) => (
                <button
                  key={cmd.tag}
                  onClick={() => applyCommand(cmd.tag)}
                  className="w-full p-4 flex items-center gap-4 hover:bg-blue-600/10 transition-all text-left group"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name={cmd.icon} className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-white uppercase tracking-tight group-hover:text-blue-400">{cmd.tag}</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest truncate">{cmd.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedImage && (
          <div className="absolute bottom-full left-6 mb-4 animate-in slide-in-from-bottom-2 duration-300">
             <div className="relative group">
                <img src={selectedImage.preview} className="w-24 h-24 rounded-2xl object-cover border-4 border-blue-600/50 shadow-2xl" alt="Preview" />
                <button onClick={removeSelectedImage} className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
             </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative flex items-center gap-4">
          <input type="file" ref={fileInputRef} onChange={handleImageSelect} accept="image/*" className="hidden" />
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-blue-600/10 transition-all shrink-0"
          >
            <Icon name="eye" className="w-7 h-7" />
          </button>

          <div className="relative flex-1">
            <input 
              type="text" 
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Describe your issue... (Type @ for commands)"
              className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 px-8 text-white text-lg focus:outline-none focus:border-blue-500/50 transition-all placeholder-slate-600 shadow-inner"
            />
          </div>

          <button 
            type="submit"
            disabled={(!inputValue.trim() && !selectedImage) || isTyping}
            className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white hover:bg-blue-500 transition-all disabled:opacity-20 shadow-2xl active:scale-95 shrink-0"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIConsultPage;
