
import React from 'react';
import { Icons } from '../constants';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] glass-nav border-b border-slate-100/30 h-24 flex items-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 vibrant-gradient rounded-[1.4rem] flex items-center justify-center transform -rotate-12 transition-all group-hover:rotate-0 group-hover:scale-110 shadow-xl shadow-purple-100">
              <span className="text-white font-black text-xl italic tracking-tighter">D</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              DRIVE<span className="text-vibrant italic">SELECT</span>
            </span>
          </div>
          
          {/* Nav Links */}
          <div className="hidden lg:flex items-center space-x-12">
            {['The Fleet', 'Guide', 'Concierge'].map((item) => (
              <a 
                key={item} 
                href={item === 'The Fleet' ? '#catalog' : '#'} 
                className="text-[10px] font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-[0.3em] relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-blue-500 transition-all group-hover:w-full rounded-full"></span>
              </a>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-8">
            <button className="text-slate-400 hover:text-blue-500 transition-all hover:scale-125">
              <Icons.Search />
            </button>
            <button className="hidden sm:flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-[1.4rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-100 active:scale-95">
              <Icons.User />
              Member
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
