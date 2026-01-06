
import React from 'react';

interface DocumentsPageProps {
  onBack: () => void;
}

const DocumentsPage: React.FC<DocumentsPageProps> = ({ onBack }) => {
  const docs = [
    { title: 'Plumbing Service Receipt', type: 'EXPENSE', date: 'Sep 12, 2024', size: '0.4 MB' },
    { title: 'HVAC Master Manual', type: 'MANUAL', date: 'Jul 2024', size: '12.5 MB' },
    { title: 'Roof Warranty Certificate', type: 'LEGAL', date: 'Jan 15, 2024', size: '2.1 MB' },
    { title: 'Floor Plan Blueprints', type: 'ARCHIVE', date: 'Oct 2023', size: '45.0 MB' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <div className="flex items-center gap-6">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Document Vault</h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Encrypted Home Asset Records</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map(doc => (
          <div key={doc.title} className="bg-glass p-6 rounded-3xl border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all cursor-pointer">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[8px] font-black text-blue-400 uppercase tracking-tighter px-1 text-center leading-none">{doc.type}</div>
              <div>
                <h4 className="font-bold text-white uppercase tracking-tight text-sm group-hover:text-blue-400 transition-colors">{doc.title}</h4>
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mt-1">{doc.date} • {doc.size}</p>
              </div>
            </div>
            <button className="p-2 text-slate-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </button>
          </div>
        ))}
      </div>

      <div className="relative group cursor-pointer">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[44px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <button className="relative w-full py-16 bg-slate-900 border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center gap-4 text-slate-500 hover:text-blue-400 hover:border-blue-500/20 transition-all">
           <svg className="w-12 h-12 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
           <div className="text-center">
             <span className="text-[11px] font-black uppercase tracking-[0.4em] block">Securely Upload Artifact</span>
             <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mt-1">PDF, JPG, PNG, OR HEIC</span>
           </div>
        </button>
      </div>
    </div>
  );
};

export default DocumentsPage;
