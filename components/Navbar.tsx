
import React from 'react';
import { Icons } from '../constants';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onAuthClick: () => void;
  onLogout: () => void;
  onSwitchView: (view: 'storefront' | 'admin') => void;
  currentView: 'storefront' | 'admin';
}

const Navbar: React.FC<NavbarProps> = ({ user, onAuthClick, onLogout, onSwitchView, currentView }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] glass-nav border-b border-slate-100/30 h-24 flex items-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => onSwitchView('storefront')}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="w-12 h-12 vibrant-gradient rounded-[1.4rem] flex items-center justify-center transform -rotate-12 transition-all group-hover:rotate-0 group-hover:scale-110 shadow-xl shadow-purple-100">
              <span className="text-white font-black text-xl italic tracking-tighter">D</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              DRIVE<span className="text-vibrant italic">SELECT</span>
            </span>
          </div>
          
          {/* Nav Links */}
          <div className="hidden lg:flex items-center space-x-12">
            {user?.role === 'admin' && (
              <button 
                onClick={() => onSwitchView(currentView === 'admin' ? 'storefront' : 'admin')}
                className={`text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-xl transition-all ${currentView === 'admin' ? 'bg-slate-900 text-white' : 'text-blue-600 bg-blue-50'}`}
              >
                {currentView === 'admin' ? 'Back to Shop' : 'Admin Console'}
              </button>
            )}
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
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:block text-right">
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{user.name}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{user.role}</p>
                </div>
                <div className="relative group">
                  <button className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                    <Icons.User />
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 scale-95 group-hover:scale-100">
                    <div className="px-4 py-3 border-b border-slate-50">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={onLogout}
                      className="w-full text-left px-4 py-3 text-rose-500 font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={onAuthClick}
                className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-[1.4rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-100 active:scale-95"
              >
                <Icons.User />
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
