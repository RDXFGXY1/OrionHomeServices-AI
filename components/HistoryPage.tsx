
import React from 'react';
import { Booking } from '../types';

interface HistoryPageProps {
  bookings: Booking[];
  onCancel: (id: string) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ bookings, onCancel }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Your History</h2>
        <span className="bg-glass border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-slate-500 uppercase">
          {bookings.length} Bookings
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-glass p-12 rounded-[40px] border border-white/5 text-center space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">No active bookings</h3>
            <p className="text-slate-500 text-sm">When you book an expert, they'll appear here.</p>
          </div>
          <button className="text-purple-400 font-bold text-sm hover:underline">Browse Experts</button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-glass p-6 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-purple-500/20 transition-all">
              <div className="flex items-center space-x-5">
                <div className={`w-14 h-14 bg-purple-gradient rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-lg ${booking.status === 'cancelled' ? 'grayscale opacity-50' : ''}`}>
                  {booking.expertName.charAt(0)}
                </div>
                <div>
                  <h4 className={`font-bold text-white group-hover:text-purple-300 transition-colors ${booking.status === 'cancelled' ? 'line-through text-slate-600' : ''}`}>
                    {booking.expertName}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">{booking.date} • {booking.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                  booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                  booking.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                  'bg-white/10 text-slate-400 border-white/20'
                }`}>
                  {booking.status}
                </span>
                
                {booking.status === 'confirmed' && (
                  <button 
                    onClick={() => onCancel(booking.id)}
                    className="p-2 hover:bg-red-500/10 rounded-xl text-slate-500 hover:text-red-400 transition-all group/btn"
                    title="Cancel Booking"
                  >
                    <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                )}
                
                <button className="p-2 hover:bg-white/10 rounded-xl text-slate-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
