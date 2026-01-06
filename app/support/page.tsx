
import React from 'react';

const SupportPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const faqs = [
    { q: "How does AI diagnostic work?", a: "Our Gemini 3 vision model analyzes pixels in your photo/video to identify structural failures, leaks, or electrical hazards based on millions of professional datasets." },
    { q: "Are experts verified?", a: "Yes, every professional on FixIt Pro goes through a rigorous background check and license verification process." },
    { q: "What is the cancellation policy?", a: "You can cancel any booking up to 2 hours before the scheduled time for a full refund." },
    { q: "Do you offer emergency services?", a: "Yes, look for experts with the 'Available Now' badge for urgent repairs." }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Support Center</h2>
      </div>

      <div className="bg-glass p-8 rounded-[40px] border border-white/5 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto border border-purple-500/20">
            <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">How can we help?</h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto">Get instant answers to common questions or reach out to our dedicated human support team.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="group bg-white/5 p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all">
              <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors mb-2">{faq.q}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <button className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-purple-500 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          Chat with Human Support
        </button>
      </div>
    </div>
  );
};

export default SupportPage;
