
import React from 'react';

const ShopPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const products = [
    { id: 1, name: 'Orion Pro Toolbelt', price: 89.99, category: 'Apparel', img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&fit=crop', desc: 'Enterprise-grade durability with quick-access slots for specialist tools.' },
    { id: 2, name: 'Orion Flow+ Faucet', price: 159.00, category: 'Fixtures', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&fit=crop', desc: 'Designer smart faucet with integrated water filtration.' },
    { id: 3, name: 'Orion Torque Driller v3', price: 349.99, category: 'Tools', img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&fit=crop', desc: 'The professional standard. Brushless motor with precision torque control.' },
    { id: 4, name: 'Orion Atmos Pure Air', price: 219.00, category: 'Environment', img: 'https://images.unsplash.com/photo-1585771724684-252702b64428?w=400&fit=crop', desc: 'HEPA-14 filtration for cleaner home air and dust mitigation.' },
    { id: 5, name: 'Orion Lumos Panel Pro', price: 699.00, category: 'Electrical', img: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&fit=crop', desc: 'Whole-home circuit panel with high-efficiency breaker components.' },
    { id: 6, name: 'Orion Hydra Hose Kit', price: 39.99, category: 'Plumbing', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&fit=crop', desc: 'Burst-proof braided stainless steel hoses for all appliances.' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
      <div className="flex justify-between items-center bg-glass p-6 rounded-[32px] border border-white/5 shadow-2xl">
        <div className="flex items-center space-x-6">
          <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all hover:scale-105">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Official <span className="text-blue-400">Orion Store</span></h2>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Direct from the manufacturer • Free shipping for members</p>
          </div>
        </div>
        <div className="relative group cursor-pointer">
          <button className="p-4 bg-blue-600 rounded-[24px] text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all group-hover:scale-110">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          </button>
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-white text-black text-xs font-black rounded-full flex items-center justify-center border-2 border-slate-950">0</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product.id} className="group bg-glass rounded-[40px] border border-white/5 overflow-hidden hover:border-blue-500/30 transition-all shadow-xl hover:shadow-blue-500/10">
            <div className="h-60 overflow-hidden relative">
              <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              <div className="absolute bottom-4 left-6 px-3 py-1 bg-blue-600 rounded-lg text-[10px] font-black text-white uppercase tracking-widest">
                {product.category}
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <h4 className="font-black text-white text-2xl uppercase tracking-tight">{product.name}</h4>
                <p className="text-slate-400 text-sm font-medium mt-2 line-clamp-2">{product.desc}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-black text-white">${product.price}</span>
                <button className="px-6 py-3 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-lg">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-glass p-12 rounded-[56px] border border-white/10 text-center space-y-4">
        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Looking for Pro Materials?</h3>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">We partner with local suppliers in NYC to deliver project-ready materials directly to your doorstep within 2 hours of booking.</p>
        <button className="px-10 py-5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-white/5 transition-all">
          Explore Material Catalog
        </button>
      </div>
    </div>
  );
};

export default ShopPage;
