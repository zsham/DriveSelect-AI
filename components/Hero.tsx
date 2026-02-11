
import React from 'react';
import { Icons } from '../constants';

interface HeroProps {
  onSearch: (query: string) => void;
  onOpenAi: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch, onOpenAi }) => {
  return (
    <div className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-white px-6 pt-20">
      {/* Background Animated Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Floating AI Invite */}
        <button 
          onClick={onOpenAi}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-12 hover:bg-blue-600 transition-all shadow-xl hover:scale-105 active:scale-95 group"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping group-hover:bg-white"></span>
          Meet Your AI Assistant
        </button>

        <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter text-slate-900 mb-10 leading-[0.85]">
          STREETS <br />
          <span className="text-vibrant italic">AWAIT.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-slate-500 mb-16 font-semibold leading-relaxed">
          The most vibrant fleet in Malaysia. Curated for <span className="text-slate-900 underline decoration-blue-500 decoration-4 underline-offset-8">extraordinary</span> journeys.
        </p>

        {/* Sleek Search Interface */}
        <div className="max-w-5xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-[3rem] blur opacity-20 group-focus-within:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white p-4 rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center gap-3">
            <div className="flex-[1.5] w-full flex items-center px-8 py-5 rounded-[2.2rem] bg-slate-50 border-2 border-transparent focus-within:border-blue-400 focus-within:bg-white transition-all group/input">
              <div className="text-blue-500 transition-transform group-focus-within/input:scale-110"><Icons.Map /></div>
              <input 
                type="text" 
                placeholder="Where to, boss?" 
                className="w-full ml-5 bg-transparent outline-none text-slate-900 font-black placeholder:text-slate-300"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
            <div className="flex-1 w-full flex items-center px-8 py-5 rounded-[2.2rem] bg-slate-50 text-slate-400 font-black text-xs uppercase tracking-widest">
              <Icons.Calendar />
              <span className="ml-5">Dates</span>
            </div>
            <button 
              onClick={() => {
                 const el = document.getElementById('catalog');
                 el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full md:w-auto vibrant-gradient text-white px-12 py-6 rounded-[2.2rem] font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:shadow-purple-200 transition-all hover:scale-[1.02] active:scale-95"
            >
              Explore
            </button>
          </div>
        </div>

        {/* Quick Links with more color */}
        <div className="mt-20 flex flex-wrap justify-center gap-10">
          {[
            { label: 'Instant Connect', color: 'bg-blue-500' },
            { label: 'Malaysia Wide', color: 'bg-emerald-500' },
            { label: 'Secure Pay', color: 'bg-purple-500' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] group cursor-default">
              <span className={`w-2 h-2 rounded-full ${item.color} group-hover:scale-150 transition-transform`}></span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
