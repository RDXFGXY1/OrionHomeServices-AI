
import React from 'react';
import { Expert } from '../types';

interface ExpertCardProps {
  expert: Expert;
  onBook: () => void;
  onClick: () => void;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ expert, onBook, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative flex flex-col h-full bg-glass rounded-[32px] md:rounded-[40px] border border-white/5 hover:border-blue-500/40 transition-all duration-500 overflow-hidden cursor-pointer shadow-2xl active:scale-[0.98]"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] group-hover:bg-blue-600/20 transition-all duration-500" />
      
      {/* Top Banner: Category & Availability */}
      <div className="p-4 md:p-6 pb-0 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 flex-wrap max-w-[70%]">
          <span className="px-2 md:px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[8px] md:text-[9px] font-black text-blue-400 uppercase tracking-widest group-hover:bg-blue-600/20 group-hover:border-blue-500/40 transition-all">
            {expert.category}
          </span>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/5 rounded-lg border border-emerald-500/10 shrink-0">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]" />
            <span className="text-[7px] md:text-[8px] font-black text-emerald-500 uppercase tracking-widest">Live</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-yellow-400 shrink-0">
          <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          <span className="text-[11px] md:text-xs font-black tracking-tighter">{expert.rating}</span>
        </div>
      </div>

      <div className="p-4 md:p-6 pt-4 space-y-4 md:space-y-6 relative z-10 flex-1 flex flex-col">
        {/* Profile Header */}
        <div className="flex items-start gap-3 md:gap-5">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src={expert.avatar} 
              alt={expert.name} 
              className="w-14 h-14 md:w-20 md:h-20 rounded-[20px] md:rounded-[28px] object-cover border border-white/10 ring-4 ring-white/5 transition-transform duration-700 group-hover:scale-105" 
            />
            {expert.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-blue-600 p-1 md:p-1.5 rounded-lg border-2 border-slate-950 shadow-2xl">
                <svg className="w-2.5 h-2.5 md:w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
              </div>
            )}
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            <h4 className="font-black text-white text-base md:text-xl uppercase tracking-tighter leading-none group-hover:text-blue-400 transition-colors truncate">
              {expert.name}
            </h4>
            <div className="flex items-center gap-1.5 text-slate-500">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest truncate">{expert.location}</span>
            </div>
            {/* Quick Stats Chips */}
            <div className="flex gap-2 pt-1">
               <div className="flex flex-col">
                  <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest leading-none mb-0.5">Reviews</span>
                  <span className="text-[9px] font-black text-white uppercase tracking-tighter">{expert.reviews}</span>
               </div>
               <div className="w-px h-5 bg-white/5 mx-0.5" />
               <div className="flex flex-col">
                  <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest leading-none mb-0.5">Exp</span>
                  <span className="text-[9px] font-black text-white uppercase tracking-tighter">{expert.yearsOfExperience}Y</span>
               </div>
            </div>
          </div>
        </div>

        {/* Bio Preview */}
        <p className="text-[10px] md:text-xs text-slate-400 font-medium leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {expert.description}
        </p>

        {/* Badges/Tags */}
        <div className="flex flex-wrap gap-1.5">
          {expert.badges.slice(0, 2).map((badge, i) => (
            <span key={i} className="px-2 py-0.5 bg-blue-500/5 rounded-md text-[7px] md:text-[8px] font-black text-blue-400/70 border border-blue-500/10 uppercase tracking-widest">
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Pricing & Action */}
      <div className="mt-auto bg-white/2 border-t border-white/5 p-4 md:p-6 flex items-center justify-between group-hover:bg-white/5 transition-colors">
        <div className="space-y-0.5">
          <p className="text-[7px] md:text-[9px] font-black text-slate-600 uppercase tracking-widest">Rate</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg md:text-2xl font-black text-white tracking-tighter">${expert.pricePerHour}</span>
            <span className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase">/hr</span>
          </div>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onBook();
          }}
          className="relative px-4 md:px-8 py-2.5 md:py-3.5 bg-white text-black text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-xl md:rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95 group/btn overflow-hidden shrink-0"
        >
          <span className="relative z-10">Instant Book</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Desktop-only Hover Overlay Detail - Hidden on small screens */}
      <div className="absolute bottom-24 left-6 right-6 p-4 bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-2xl translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none hidden lg:block">
         <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Service Matrix</p>
         <div className="grid grid-cols-2 gap-2">
            <div className="flex justify-between text-[10px] font-bold">
               <span className="text-slate-500">Radius</span>
               <span className="text-white">{expert.serviceRadius}mi</span>
            </div>
            <div className="flex justify-between text-[10px] font-bold">
               <span className="text-slate-500">Wait Time</span>
               <span className="text-white">{expert.responseTime}</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ExpertCard;
