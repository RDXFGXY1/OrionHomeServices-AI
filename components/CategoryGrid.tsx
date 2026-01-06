
import React from 'react';
import { ServiceCategory } from '../types';
import Icon from './Icon';

interface CategoryGridProps {
  categories: ServiceCategory[];
  onCategoryClick: (id: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategoryClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryClick(cat.id)}
          className="group relative flex flex-col items-center space-y-8 p-12 bg-glass rounded-[48px] border border-white/5 hover:border-blue-500/40 transition-all duration-700 shadow-2xl overflow-visible hover:-translate-y-4 preserve-3d"
        >
          {/* 3D Floating Icon Container */}
          <div className="relative w-24 h-24 preserve-3d">
            <div className="absolute inset-0 bg-white/5 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-full h-full bg-white/5 rounded-[32px] flex items-center justify-center group-hover:scale-125 group-hover:rotate-[15deg] transition-all duration-700 border border-white/10 shadow-inner transform translate-z-20 group-hover:translate-z-40">
              <Icon name={cat.icon} className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div className="space-y-2 relative z-10 text-center transform translate-z-10 group-hover:translate-z-20">
            <span className="text-lg font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">{cat.name}</span>
            <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest opacity-60">Initialize Node</p>
          </div>

          {/* Interactive Light Beam */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        </button>
      ))}
    </div>
  );
};

export default CategoryGrid;
