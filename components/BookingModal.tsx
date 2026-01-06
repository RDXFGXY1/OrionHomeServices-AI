
import React, { useState, useEffect, useMemo } from 'react';
import { Expert } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  expert: Expert;
  onConfirm: (bookingDetails: string) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, expert, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Generate next 7 days
  const dates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return d;
    });
  }, []);

  const timeSlots = ['08:00 AM', '09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM'];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        setStep(1);
        setSelectedTime('');
        setNotes('');
        setSelectedDate(new Date());
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFinalConfirm = () => {
    const dateStr = selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    onConfirm(`${dateStr} at ${selectedTime}`);
    setStep(4);
  };

  const isToday = (date: Date) => date.toDateString() === new Date().toDateString();

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center px-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl" onClick={onClose} />
      
      <div className={`relative w-full max-w-xl bg-[#0c111d]/95 rounded-[48px] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-700 ${isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-20 scale-90 opacity-0'}`}>
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-1000 ease-out" 
            style={{ width: `${(step / 4) * 100}%` }} 
          />
        </div>

        <div className="p-10 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 ring-4 ring-white/5 shadow-2xl shrink-0">
                <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white tracking-tight uppercase leading-none">Precision Booking</h3>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{expert.name} • {expert.category}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-slate-500 hover:text-white transition-all active:scale-90">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="relative min-h-[340px]">
            {/* STEP 1: DATE & TIME */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Schedule Assignment</h4>
                  <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                    {dates.map((date, i) => {
                      const active = selectedDate.toDateString() === date.toDateString();
                      return (
                        <button 
                          key={i}
                          onClick={() => setSelectedDate(date)}
                          className={`flex flex-col items-center justify-center min-w-[72px] h-24 rounded-2xl border transition-all ${active ? 'bg-blue-600 border-blue-400 text-white shadow-xl shadow-blue-600/20 scale-105' : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'}`}
                        >
                          <span className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">
                            {isToday(date) ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}
                          </span>
                          <span className="text-xl font-black">{date.getDate()}</span>
                          <span className="text-[8px] font-black uppercase tracking-[0.2em] mt-1 opacity-60">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Available Windows</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {timeSlots.map(time => (
                      <button 
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-xl border-2 transition-all text-[10px] font-black tracking-tight uppercase ${selectedTime === time ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/10'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: PROJECT DESCRIPTION */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Diagnostic Context</h4>
                  <p className="text-xs text-slate-400 font-medium">Provide critical details about the issue to help the specialist prepare the correct material payload.</p>
                  <div className="relative">
                    <textarea 
                      autoFocus
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="E.g. The main shut-off valve is stuck. Master bathroom sink is leaking from the P-trap..."
                      className="w-full h-44 bg-white/5 border-2 border-white/5 rounded-3xl p-6 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 transition-all resize-none shadow-inner text-sm font-medium"
                    />
                    <div className="absolute bottom-4 right-6 flex items-center gap-2">
                       <span className="text-[9px] font-black text-slate-700 uppercase">Input Encrypted</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: REVIEW & AUTHORIZE */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                     <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                  </div>
                  
                  <div className="space-y-6 relative z-10">
                    <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Transaction Summary</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-sm text-slate-400 font-medium">Deployment Date</span>
                        <span className="text-sm text-white font-black">{selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-sm text-slate-400 font-medium">Estimated Arrival</span>
                        <span className="text-sm text-white font-black">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-sm text-slate-400 font-medium">Base Rate</span>
                        <span className="text-sm text-white font-black">${expert.pricePerHour}/hr</span>
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Platform Fee</span>
                        <span className="text-xs text-emerald-400 font-black uppercase tracking-widest">Waived (Pro Membership)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[9px] font-black text-white uppercase tracking-widest">Payment Source</p>
                      <p className="text-[11px] font-bold text-blue-400">Orion Wallet (•••• 4202)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: SUCCESS */}
            {step === 4 && (
              <div className="flex flex-col items-center justify-center space-y-8 py-6 animate-in zoom-in-95 fade-in duration-700 text-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500 rounded-full blur-[40px] opacity-20 animate-pulse"></div>
                  <div className="relative w-32 h-32 bg-emerald-500/20 rounded-[48px] border-2 border-emerald-500/30 flex items-center justify-center shadow-2xl">
                    <svg className="w-16 h-16 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7"/></svg>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Deployment <br/><span className="text-emerald-400">Authorized</span></h4>
                  <p className="text-slate-400 font-medium max-w-[320px] mx-auto text-sm leading-relaxed">
                    A specialist link has been established. {expert.name.split(' ')[0]} will arrive on <span className="text-white font-bold">{selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span> around <span className="text-white font-bold">{selectedTime}</span>.
                  </p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-[280px]">
                   <button onClick={onClose} className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-100 transition-all active:scale-95">Track Specialist</button>
                   <button onClick={onClose} className="w-full py-5 bg-white/5 text-slate-400 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:text-white transition-all">Dismiss</button>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          {step < 4 && (
            <div className="pt-6 flex gap-4">
              {step > 1 && (
                <button 
                  onClick={() => setStep(s => s - 1)} 
                  className="px-8 py-5 bg-white/5 text-slate-500 font-black uppercase tracking-widest text-[10px] rounded-2xl border border-white/5 hover:bg-white/10 hover:text-white transition-all active:scale-95"
                >
                  Return
                </button>
              )}
              <button 
                onClick={() => step === 3 ? handleFinalConfirm() : setStep(s => s + 1)} 
                disabled={(step === 1 && (!selectedTime || !selectedDate))}
                className={`flex-1 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-2xl active:scale-95 disabled:opacity-20 ${step === 3 ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-500/20' : 'bg-white text-black hover:bg-blue-600 hover:text-white'}`}
              >
                {step === 3 ? 'Authorize & Pay' : 'Initialize Phase ' + (step + 1)}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
