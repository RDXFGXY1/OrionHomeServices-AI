
import React, { useState, useMemo } from 'react';
import { Transaction } from '../../App';
import Icon from '../../components/Icon';

interface WalletPageProps {
  balance: number;
  transactions: Transaction[];
  onTransaction: (amount: number, title: string, type: Transaction['type']) => void;
  onBack: () => void;
}

type FilterType = 'All' | 'Payment' | 'Deposit' | 'Withdraw';

const WalletPage: React.FC<WalletPageProps> = ({ balance, transactions, onTransaction, onBack }) => {
  const [modalType, setModalType] = useState<'none' | 'deposit' | 'withdraw'>('none');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    setIsProcessing(true);
    
    // Realistic simulation delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      const multiplier = modalType === 'withdraw' ? -1 : 1;
      onTransaction(
        val * multiplier, 
        modalType === 'deposit' ? 'Direct Deposit Sync' : 'Bank Transfer Withdrawal', 
        modalType === 'deposit' ? 'Deposit' : 'Withdraw'
      );

      setTimeout(() => {
        setShowSuccess(false);
        setModalType('none');
        setAmount('');
      }, 2000);
    }, 2500);
  };

  const filteredTransactions = useMemo(() => {
    if (activeFilter === 'All') return transactions;
    return transactions.filter(tx => tx.type === activeFilter);
  }, [transactions, activeFilter]);

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'Completed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Pending': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Failed': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-400 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all hover:scale-110 active:scale-90">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Capital Node</h2>
            <div className="flex items-center gap-2 mt-1">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Encrypted Ledger Active</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex gap-2">
           <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] font-black text-slate-400 uppercase tracking-widest">USD Tethered</div>
        </div>
      </div>

      <div className="relative group overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-[64px] p-12 shadow-[0_30px_60px_-12px_rgba(37,99,235,0.4)]">
        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 scale-150 pointer-events-none">
          <Icon name="wallet" className="w-48 h-48 text-white" />
        </div>
        
        <div className="relative z-10 space-y-12">
          <div className="space-y-2">
            <p className="text-[11px] font-black text-white/50 uppercase tracking-[0.4em]">Total Network Liquidity</p>
            <h3 className="text-7xl font-black text-white tracking-tighter leading-none">${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setModalType('deposit')}
              className="flex-1 min-w-[180px] px-10 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-3xl hover:bg-slate-100 transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4"/></svg>
              Deposit Funds
            </button>
            <button 
              onClick={() => setModalType('withdraw')}
              className="flex-1 min-w-[180px] px-10 py-5 bg-black/20 text-white text-xs font-black uppercase tracking-[0.2em] rounded-3xl border border-white/20 hover:bg-black/30 transition-all active:scale-95 backdrop-blur-md flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 12h16m-8-8l8 8-8 8"/></svg>
              Withdraw
            </button>
          </div>
        </div>

        {/* Decorative chips */}
        <div className="absolute bottom-12 right-12 hidden lg:flex items-center gap-2">
           <div className="w-3 h-3 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '0s' }} />
           <div className="w-3 h-3 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '0.2s' }} />
           <div className="w-3 h-3 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Recent Ledger Logs</h3>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-time authentication records</p>
          </div>
          
          <div className="flex bg-white/5 border border-white/10 p-1 rounded-2xl overflow-x-auto no-scrollbar">
            {(['All', 'Payment', 'Deposit', 'Withdraw'] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === filter ? 'bg-white text-black shadow-lg scale-105' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredTransactions.length > 0 ? filteredTransactions.map(tx => (
            <div key={tx.id} className="group bg-glass p-8 rounded-[48px] border border-white/5 flex flex-col md:flex-row items-center justify-between hover:border-white/10 transition-all shadow-xl gap-6">
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner ${tx.amount < 0 ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                  <Icon name={tx.type === 'Payment' ? 'tag' : tx.type === 'Deposit' ? 'inbox' : 'outbox'} className="w-8 h-8" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-3">
                    <p className="text-xl font-black text-white uppercase tracking-tight leading-none">{tx.title}</p>
                    <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    {tx.date} at {tx.time} <span className="text-slate-700">•</span> TX: {tx.id.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end w-full md:w-auto md:gap-8">
                <div className="text-right hidden md:block">
                  <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Protocol</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{tx.type}</p>
                </div>
                <span className={`text-3xl font-black tracking-tighter transition-transform group-hover:scale-110 ${tx.amount < 0 ? 'text-white' : 'text-emerald-400'}`}>
                  {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          )) : (
            <div className="py-20 text-center bg-white/2 border border-white/5 border-dashed rounded-[48px] space-y-4">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto opacity-30">
                <Icon name="search" className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-500 font-medium text-sm">No transaction logs found for this sector.</p>
            </div>
          )}
        </div>
      </div>
      {/* (Modals etc. omitted for brevity) */}
    </div>
  );
};

export default WalletPage;
