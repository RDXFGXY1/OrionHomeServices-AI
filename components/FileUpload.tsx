
import React, { useRef, useState } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-10 w-full">
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*,video/*"
        className="hidden"
      />
      
      <button
        onClick={handleClick}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`group relative w-full h-[32rem] bg-slate-900 border-2 border-dashed rounded-[60px] flex flex-col items-center justify-center space-y-6 transition-all duration-500 overflow-hidden ${
          isDragging ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' : 'border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/30'
        }`}
      >
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        {/* Viewfinder Corners */}
        <div className="absolute top-10 left-10 w-16 h-16 border-t-4 border-l-4 border-slate-700 group-hover:border-blue-500 transition-colors duration-500 rounded-tl-3xl" />
        <div className="absolute top-10 right-10 w-16 h-16 border-t-4 border-r-4 border-slate-700 group-hover:border-blue-500 transition-colors duration-500 rounded-tr-3xl" />
        <div className="absolute bottom-10 left-10 w-16 h-16 border-b-4 border-l-4 border-slate-700 group-hover:border-blue-500 transition-colors duration-500 rounded-bl-3xl" />
        <div className="absolute bottom-10 right-10 w-16 h-16 border-b-4 border-r-4 border-slate-700 group-hover:border-blue-500 transition-colors duration-500 rounded-br-3xl" />

        <div className="w-32 h-32 bg-blue-500/5 rounded-[40px] flex items-center justify-center border border-white/5 shadow-inner group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
          <svg className="w-16 h-16 text-blue-400 group-hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        
        <div className="text-center space-y-2 relative z-10 px-6">
          <p className="text-3xl font-black text-white uppercase tracking-tighter">Initiate Scan</p>
          <p className="text-slate-500 font-medium text-lg">Drop visual data or click to browse</p>
        </div>
        
        <div className="px-8 py-3 bg-white/5 rounded-2xl text-xs font-black text-slate-400 border border-white/5 uppercase tracking-[0.2em] group-hover:border-blue-500/20 group-hover:text-blue-400 transition-all">
          Supports UltraHD Video & Images
        </div>

        {/* Floating Scan Bar (Decorative) */}
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-[2px] opacity-0 group-hover:opacity-40 animate-[scan_3s_linear_infinite]" />
      </button>

      <div className="w-full flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 w-full flex items-center space-x-6 py-6 px-8 bg-glass rounded-[32px] border border-white/5 shadow-2xl">
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 shrink-0 border border-blue-500/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04a11.352 11.352 0 00-1.42 14.055 11.955 11.955 0 0010.038 5.944 11.955 11.955 0 0010.038-5.944 11.352 11.352 0 00-1.42-14.055z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-black text-white uppercase tracking-tight leading-none mb-1">AI-Assisted Safety Review</p>
            <p className="text-xs text-slate-500 font-medium leading-none">Gemini 3 verifies integrity before you start.</p>
          </div>
        </div>

        <div className="flex-1 w-full flex items-center space-x-6 py-6 px-8 bg-glass rounded-[32px] border border-white/5 shadow-2xl">
          <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 shrink-0 border border-purple-500/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-black text-white uppercase tracking-tight leading-none mb-1">Instant Estimates</p>
            <p className="text-xs text-slate-500 font-medium leading-none">Price modeling based on local market data.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
