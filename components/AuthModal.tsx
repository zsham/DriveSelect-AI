
import React, { useState } from 'react';
import { User, Role } from '../types';
import { Icons } from '../constants';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState<Role>('user');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', shopName: '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('ds_users') || '[]');

    if (isRegister) {
      if (users.find((u: any) => u.email === formData.email)) {
        setError('Email already exists');
        return;
      }
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        role: role,
        shopStatus: role === 'merchant' ? 'pending' : undefined,
        shopName: role === 'merchant' ? formData.shopName : undefined
      };
      users.push({ ...newUser, password: formData.password });
      localStorage.setItem('ds_users', JSON.stringify(users));
      onLogin(newUser);
      onClose();
    } else {
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);
      if (user) {
        onLogin({ 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          role: user.role, 
          shopStatus: user.shopStatus,
          shopName: user.shopName 
        });
        onClose();
      } else {
        setError('Invalid credentials');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-[0_32px_128px_-10px_rgba(0,0,0,0.5)] flex flex-col md:flex-row overflow-hidden border border-white/20">
        
        {/* Left Side - Visual */}
        <div className="hidden md:flex flex-1 vibrant-gradient p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-2xl">
              <span className="text-slate-900 font-black text-2xl italic">D</span>
            </div>
            <h2 className="text-5xl font-black text-white leading-[0.9] mb-6">
              {isRegister ? "Launch Your\nFleet." : "Welcome back\nto the Elite."}
            </h2>
            <p className="text-white/80 font-bold text-lg leading-relaxed">
              {isRegister 
                ? "Become a verified shop partner and reach thousands of travelers across Malaysia." 
                : "Manage your reservations and luxury experiences with ease."}
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-4 text-white/50 text-[9px] font-black uppercase tracking-[0.2em]">
            <span>Secure Ecosystem</span>
            <span className="opacity-30">/</span>
            <span>Premium Marketplace</span>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 p-10 md:p-16 bg-white flex flex-col justify-center max-h-[90vh] overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter">
                {isRegister ? 'Start Journey' : 'Log In'}
              </h3>
              <p className="text-slate-400 text-sm font-bold">Secure authorization required.</p>
            </div>
            <button onClick={onClose} className="text-slate-300 hover:text-slate-900 transition-all hover:scale-110">
              <Icons.Close />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegister && (
              <div className="grid grid-cols-2 gap-3 mb-8 p-1.5 bg-slate-50 rounded-2xl">
                <button 
                  type="button"
                  onClick={() => setRole('user')}
                  className={`py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === 'user' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Customer
                </button>
                <button 
                  type="button"
                  onClick={() => setRole('merchant')}
                  className={`py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === 'merchant' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Shop Owner
                </button>
              </div>
            )}

            {isRegister && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Legal Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-7 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 outline-none transition-all font-black text-slate-900 text-sm"
                  placeholder="Full Name"
                />
              </div>
            )}

            {isRegister && role === 'merchant' && (
              <div className="space-y-2 animate-in slide-in-from-left-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-blue-500 ml-1">Shop Name / Fleet Entity</label>
                <input 
                  required
                  type="text" 
                  value={formData.shopName}
                  onChange={e => setFormData({...formData, shopName: e.target.value})}
                  className="w-full px-7 py-5 rounded-2xl bg-blue-50/50 border-2 border-transparent focus:border-blue-500 outline-none transition-all font-black text-slate-900 text-sm placeholder:text-blue-200"
                  placeholder="e.g. KL Luxury Fleet"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Corporate Email</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-7 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 outline-none transition-all font-black text-slate-900 text-sm"
                placeholder="name@company.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Security Key</label>
              <input 
                required
                type="password" 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full px-7 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 outline-none transition-all font-black text-slate-900 text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-rose-500 text-[10px] font-black uppercase text-center tracking-widest bg-rose-50 py-3 rounded-xl border border-rose-100">{error}</p>}

            <button className="w-full py-6 vibrant-gradient text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-purple-100 hover:scale-[1.02] active:scale-95 transition-all mt-4">
              {isRegister ? (role === 'merchant' ? 'Apply for Shop' : 'Create Profile') : 'Secure Access'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <button 
              onClick={() => setIsRegister(!isRegister)}
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
            >
              {isRegister ? 'Switch to Login' : "Request Access / Create Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
