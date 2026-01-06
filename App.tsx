
import React, { useState, useRef, useEffect } from 'react';
import { diagnoseRepair } from './geminiService';
import { DiagnosticResult, Expert, ViewState, Booking, Message } from './types';
import { MOCK_EXPERTS, CATEGORIES } from './data/mockData';
import Header from './components/Header';
import BookingModal from './components/BookingModal';
import Icon from './components/Icon';

// Import Page Components
import HomePage from './app/home/page';
import ScanPage from './app/ai-scan/page';
import BrowsePage from './app/browse/page';
import HistoryPage from './app/history/page';
import ProfilePage from './app/profile/page';
import ExpertDetailPage from './app/expert-detail/page';
import WalletPage from './app/wallet/page';
import SupportPage from './app/support/page';
import SafetyPage from './app/safety/page';
import ShopPage from './app/shop/page';
import ProjectsPage from './app/projects/page';
import MembershipPage from './app/membership/page';
import LearningPage from './app/learning/page';
import InsurancePage from './app/insurance/page';
import AIConsultPage from './app/ai-consult/page';
import PartnerOnboardingPage from './app/partner-onboarding/page';
import InboxPage from './app/inbox/page';
import RewardsPage from './app/rewards/page';
import AnalyticsPage from './app/analytics/page';
import SecurityHubPage from './app/security-hub/page';
import DocumentsPage from './app/documents/page';
import CommunityPage from './app/community/page';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  time: string;
  status: 'Completed' | 'Pending' | 'Failed';
  type: 'Payment' | 'Deposit' | 'Withdraw' | 'Refund';
}

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [loading, setLoading] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteExpertIds, setFavoriteExpertIds] = useState<string[]>([]);
  const [isHubOpen, setIsHubOpen] = useState(false);
  
  // Global Chat Histories state: Expert ID -> Message[]
  const [chatMessages, setChatMessages] = useState<Record<string, Message[]>>({});

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Simulated User Account State
  const [userBalance, setUserBalance] = useState(1240.50);
  const [userTier, setUserTier] = useState<'Standard' | 'Plus' | 'Pro'>('Standard');
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', title: 'Sarah Jennings', amount: -85.00, date: 'Oct 12', time: '14:30', status: 'Completed', type: 'Payment' },
    { id: '2', title: 'Wallet Top-up', amount: 500.00, date: 'Oct 10', time: '09:15', status: 'Completed', type: 'Deposit' },
    { id: '3', title: 'Orion Shield Repair', amount: -54.99, date: 'Oct 08', time: '11:45', status: 'Completed', type: 'Payment' },
  ]);

  const toggleFavorite = (expertId: string) => {
    setFavoriteExpertIds(prev => 
      prev.includes(expertId) 
        ? prev.filter(id => id !== expertId) 
        : [...prev, expertId]
    );
  };

  const updateScrollCues = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => { isDown = false; };
    const handleMouseUp = () => { isDown = false; };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; 
      slider.scrollLeft = scrollLeft - walk;
      updateScrollCues();
    };

    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);
    slider.addEventListener('scroll', updateScrollCues);
    updateScrollCues();

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mousemove', handleMouseMove);
      slider.removeEventListener('scroll', updateScrollCues);
    };
  }, []);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setDiagnosticResult(null);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    let mimeType = file.type || 'image/jpeg';
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        try {
          const diagnosis = await diagnoseRepair(base64Data, mimeType);
          setDiagnosticResult(diagnosis);
        } catch (err) {
          alert("AI Diagnosis failed.");
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setLoading(false);
    }
  };

  const getRecommendedExpert = (category: string): Expert | null => {
    if (!category || category.toLowerCase() === 'none') return null;
    return MOCK_EXPERTS.find(e => e.category.toLowerCase().includes(category.toLowerCase())) || null;
  };

  const onBookingConfirm = (bookingDetails: string, overridePrice?: number) => {
    if (selectedExpert) {
      const [datePart, timePart] = bookingDetails.split(' at ');
      const finalPrice = overridePrice !== undefined ? overridePrice : selectedExpert.pricePerHour;

      const newBooking: Booking = {
        id: Math.random().toString(36).substr(2, 9),
        expertId: selectedExpert.id,
        expertName: selectedExpert.name,
        date: datePart,
        time: timePart,
        status: 'confirmed'
      };
      setBookings(prev => [newBooking, ...prev]);
      setUserBalance(prev => prev - finalPrice);
      setTransactions(prev => [{
        id: Math.random().toString(36).substr(2, 6),
        title: `Service Booking: ${selectedExpert.name}`,
        amount: -finalPrice,
        date: 'Today',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Completed',
        type: 'Payment'
      }, ...prev]);
    }
  };

  const handleNavigation = (newView: ViewState) => {
    setView(newView);
    setIsHubOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToExpert = (expert: Expert) => {
    setSelectedExpert(expert);
    handleNavigation('expert-detail');
  };

  const handleBookClick = (expert: Expert) => {
    setSelectedExpert(expert);
    setIsBookingOpen(true);
  };

  const handleAddMessage = (expertId: string, message: Message) => {
    setChatMessages(prev => ({
      ...prev,
      [expertId]: [...(prev[expertId] || []), message]
    }));
  };

  const NavButton = ({ target, icon, label, current }: { target: ViewState, icon: React.ReactNode, label: string, current: ViewState }) => {
    const isActive = current === target;
    return (
      <button 
        onClick={() => handleNavigation(target)} 
        className={`relative flex flex-col items-center justify-center min-w-[76px] md:min-w-[84px] h-[64px] transition-all duration-300 group select-none ${isActive ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
      >
        <div className={`transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
          {icon}
        </div>
        <span className={`text-[7px] font-black uppercase tracking-[0.2em] mt-1.5 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 translate-y-1'}`}>
          {label}
        </span>
        {isActive && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
        )}
      </button>
    );
  };

  const HubItem = ({ target, icon, label, desc }: { target: ViewState, icon: string, label: string, desc: string }) => (
    <button 
      onClick={() => handleNavigation(target)}
      className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-blue-600/10 hover:border-blue-500/40 transition-all text-left group"
    >
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon name={icon} className="w-6 h-6 text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">{label}</p>
        <p className="text-[8px] font-bold text-slate-500 uppercase mt-1 truncate">{desc}</p>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen transition-colors duration-500 bg-[#020617] flex flex-col">
      <Header setView={handleNavigation} currentView={view} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      {/* 3D Context Wrapper - Perspective is applied here so it doesn't affect fixed positioning */}
      <div className="flex-1" style={{ perspective: '1500px' }}>
        <main className="max-w-7xl mx-auto px-6 pt-24 pb-64">
          {view === 'home' && <HomePage categories={CATEGORIES} experts={MOCK_EXPERTS} onScanClick={() => handleNavigation('scan')} onBrowseClick={() => handleNavigation('browse')} onBookExpert={handleBookClick} onExpertClick={navigateToExpert} onPartnerClick={() => handleNavigation('partner-onboarding')} />}
          {view === 'scan' && <ScanPage loading={loading} diagnosticResult={diagnosticResult} previewUrl={previewUrl} onFileUpload={handleFileUpload} onReset={() => setDiagnosticResult(null)} getRecommendedExpert={getRecommendedExpert} onBookExpert={handleBookClick} onExpertClick={navigateToExpert} onBackToHome={() => handleNavigation('home')} onBookingWithNegotiation={(exp, price) => { setSelectedExpert(exp); onBookingConfirm(`Today at 4:00 PM`, price); handleNavigation('history'); }} />}
          {view === 'browse' && <BrowsePage experts={MOCK_EXPERTS} onBookExpert={handleBookClick} onExpertClick={navigateToExpert} initialSearch={searchTerm} onSearchUpdate={setSearchTerm} />}
          {view === 'expert-detail' && selectedExpert && (
            <ExpertDetailPage 
              expert={selectedExpert} 
              isFavorited={favoriteExpertIds.includes(selectedExpert.id)} 
              onToggleFavorite={() => toggleFavorite(selectedExpert.id)} 
              onBook={() => setIsBookingOpen(true)} 
              onBack={() => handleNavigation('browse')}
              chatHistory={chatMessages[selectedExpert.id] || []}
              onAddMessage={(msg) => handleAddMessage(selectedExpert.id, msg)}
            />
          )}
          {view === 'history' && <HistoryPage bookings={bookings} onCancel={(id) => setBookings(prev => prev.map(b => b.id === id ? {...b, status: 'cancelled'} : b))} />}
          {view === 'profile' && <ProfilePage onNavigate={handleNavigation} tier={userTier} balance={userBalance} favoriteExperts={MOCK_EXPERTS.filter(e => favoriteExpertIds.includes(e.id))} onExpertClick={navigateToExpert} />}
          {view === 'wallet' && <WalletPage balance={userBalance} transactions={transactions} onTransaction={(amount, title, type) => { setUserBalance(prev => prev + amount); setTransactions(prev => [{ id: Math.random().toString(36).substr(2, 6), title, amount, date: 'Today', time: 'Now', status: 'Completed', type }, ...prev]); }} onBack={() => handleNavigation('profile')} />}
          {view === 'support' && <SupportPage onBack={() => handleNavigation('profile')} />}
          {view === 'safety' && <SafetyPage onBack={() => handleNavigation('profile')} />}
          {view === 'shop' && <ShopPage onBack={() => handleNavigation('home')} />}
          {view === 'projects' && <ProjectsPage onBack={() => handleNavigation('home')} />}
          {view === 'membership' && <MembershipPage currentTier={userTier} onUpgrade={setUserTier} onBack={() => handleNavigation('profile')} />}
          {view === 'learning' && <LearningPage onBack={() => handleNavigation('home')} />}
          {view === 'insurance' && <InsurancePage onBack={() => handleNavigation('profile')} />}
          {view === 'ai-consult' && <AIConsultPage experts={MOCK_EXPERTS} onBookExpert={handleBookClick} onExpertClick={navigateToExpert} onBack={() => handleNavigation('home')} />}
          {view === 'partner-onboarding' && <PartnerOnboardingPage onBack={() => handleNavigation('home')} />}
          {view === 'inbox' && <InboxPage onBack={() => handleNavigation('home')} chatMessages={chatMessages} experts={MOCK_EXPERTS} onExpertClick={navigateToExpert} />}
          {view === 'rewards' && <RewardsPage onBack={() => handleNavigation('home')} />}
          {view === 'analytics' && <AnalyticsPage onBack={() => handleNavigation('home')} />}
          {view === 'security-hub' && <SecurityHubPage onBack={() => handleNavigation('home')} />}
          {view === 'documents' && <DocumentsPage onBack={() => handleNavigation('home')} />}
          {view === 'community' && <CommunityPage onBack={() => handleNavigation('home')} />}
        </main>
      </div>

      {/* THE ORION BRIDGE with HUB DROPDOWN */}
      <div className="fixed bottom-12 left-0 right-0 flex justify-center z-[200] px-6 pointer-events-none pb-[env(safe-area-inset-bottom)]">
        <div className="relative pointer-events-auto w-full max-w-2xl flex flex-col items-center gap-4">
          
          {/* NEURAL HUB DROPDOWN */}
          {isHubOpen && (
            <div className="w-full bg-slate-950/90 backdrop-blur-[60px] border border-white/10 rounded-[40px] p-8 shadow-[0_50px_100px_rgba(0,0,0,0.9)] animate-in slide-in-from-bottom-6 fade-in duration-500 overflow-hidden relative mb-2">
               <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <Icon name="satellite" className="w-32 h-32 text-blue-400" />
               </div>
               <div className="flex items-center justify-between mb-8 px-2 relative z-10">
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.4em]">Neural Hub</h3>
                  <button onClick={() => setIsHubOpen(false)} className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                    Close Link <Icon name="scissors" className="w-3 h-3" />
                  </button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                  <div className="space-y-4">
                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest px-2 mb-1">Control Matrix</p>
                    <HubItem target="security-hub" label="Security" desc="Auth Protocols" icon="shield" />
                    <HubItem target="analytics" label="Analytics" desc="Economic ROI" icon="satellite" />
                  </div>
                  <div className="space-y-4">
                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest px-2 mb-1">Asset Vault</p>
                    <HubItem target="shop" label="Logistics" desc="Orion Supply" icon="briefcase" />
                    <HubItem target="documents" label="Archive" desc="Digital Dossiers" icon="key" />
                  </div>
                  <div className="space-y-4">
                    <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest px-2 mb-1">Local Network</p>
                    <HubItem target="community" label="Society" desc="Neighborhood" icon="user" />
                    <HubItem target="rewards" label="Incentives" desc="Achievements" icon="zap" />
                  </div>
               </div>
            </div>
          )}

          {/* MAIN DOCK (Truly Floating Bridge) */}
          <div className="relative w-full h-20 bg-slate-900/60 backdrop-blur-3xl rounded-full border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_20px_rgba(59,130,246,0.1)] flex items-center justify-between px-2 overflow-hidden">
            <div className={`absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-900/40 to-transparent z-20 pointer-events-none transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-900/40 to-transparent z-20 pointer-events-none transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

            <div ref={scrollRef} className="flex items-center h-full px-2 space-x-0.5 overflow-x-auto no-scrollbar scroll-smooth w-full">
              <NavButton target="home" label="Home" current={view} icon={<Icon name="satellite" className="w-5 h-5" />} />
              <NavButton target="browse" label="Explore" current={view} icon={<Icon name="search" className="w-5 h-5" />} />
              <NavButton target="ai-consult" label="Consult" current={view} icon={<Icon name="sparkles" className="w-5 h-5" />} />
              
              {/* CENTRAL CORE ACTION */}
              <div className="px-4 flex-shrink-0 relative group/core">
                <div className="absolute inset-0 m-auto w-[60px] h-[60px] border border-dashed border-blue-500/30 rounded-full animate-[spin_20s_linear_infinite]" />
                <button 
                  onClick={() => handleNavigation('scan')} 
                  className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-full flex items-center justify-center border border-white/20 group z-10 shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-90 transition-transform"
                >
                   <Icon name="eye" className="w-6 h-6 text-white" />
                </button>
              </div>

              <NavButton target="inbox" label="Inbox" current={view} icon={<Icon name="inbox" className="w-5 h-5" />} />
              
              <button 
                onClick={() => setIsHubOpen(!isHubOpen)}
                className={`relative flex flex-col items-center justify-center min-w-[76px] md:min-w-[84px] h-[64px] transition-all duration-300 select-none ${isHubOpen ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <div className="relative">
                  <Icon name="briefcase" className="w-5 h-5" />
                  {isHubOpen && <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,1)]" />}
                </div>
                <span className="text-[7px] font-black uppercase tracking-[0.2em] mt-1.5">Hub</span>
              </button>

              <NavButton target="profile" label="Me" current={view} icon={<div className={`w-5 h-5 rounded-full overflow-hidden border-2 transition-colors ${view === 'profile' ? 'border-blue-400' : 'border-slate-700'}`}><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" /></div>} />
            </div>
          </div>
        </div>
      </div>

      {selectedExpert && <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} expert={selectedExpert} onConfirm={onBookingConfirm} />}
      <style>{`@keyframes pulse-slow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } } .animate-pulse-slow { animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }`}</style>
    </div>
  );
};

export default App;
