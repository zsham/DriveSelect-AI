
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
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      // Register logic
      const users = JSON.parse(localStorage.getItem('ds_users') || '[]');
      if (users.find((u: any) => u.email === formData.email)) {
        setError('Email already exists');
        return;
      }
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        role: role
      };
      users.push({ ...newUser, password: formData.password });
      localStorage.setItem('ds_users', JSON.stringify(users));
      onLogin(newUser);
      onClose();
    } else {
      // Login logic
      const users = JSON.parse(localStorage.getItem('ds_users') || '[]');
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);
      if (user) {
        onLogin({ id: user.id, name: user.name, email: user.email, role: user.role });
        onClose();
      } else {
        setError('Invalid credentials');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-[0_32px_128px_-10px_rgba(0,0,0,0.5)] flex overflow-hidden border border-white/20">
        
        {/* Left Side - Visual */}
        <div className="hidden md:flex flex-1 vibrant-gradient p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-xl">
              <span className="text-slate-900 font-black text-xl italic">D</span>
            </div>
            <h2 className="text-4xl font-black text-white leading-tight mb-4">
              {isRegister ? "Join the Elite." : "Welcome Back."}
            </h2>
            <p className="text-white/80 font-medium">Experience the finest fleet in Malaysia with DriveSelect AI.</p>
          </div>
          <div className="relative z-10 flex items-center gap-4 text-white/60 text-[10px] font-black uppercase tracking-widest">
            <span>Verified Luxury</span>
            <span className="w-1 h-1 bg-white/40 rounded-full"></span>
            <span>Secure Access</span>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 p-8 md:p-16 bg-white flex flex-col justify-center">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">{isRegister ? 'Create Account' : 'Sign In'}</h3>
              <p className="text-slate-400 text-sm font-medium">Please enter your details below.</p>
            </div>
            <button onClick={onClose} className="text-slate-300 hover:text-slate-900 transition-colors"><Icons.Close /></button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold text-slate-900"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold text-slate-900"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
              <input 
                required
                type="password" 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 outline-none transition-all font-bold text-slate-900"
                placeholder="••••••••"
              />
            </div>

            {isRegister && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">I am a...</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    onClick={() => setRole('user')}
                    className={`py-3 rounded-xl text-xs font-black uppercase tracking-widest border-2 transition-all ${role === 'user' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100'}`}
                  >
                    User
                  </button>
                  <button 
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`py-3 rounded-xl text-xs font-black uppercase tracking-widest border-2 transition-all ${role === 'admin' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-400 border-slate-100'}`}
                  >
                    Admin
                  </button>
                </div>
              </div>
            )}

            {error && <p className="text-rose-500 text-xs font-bold text-center animate-shake">{error}</p>}

            <button className="w-full py-5 vibrant-gradient text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-purple-100 hover:scale-[1.02] active:scale-95 transition-all mt-4">
              {isRegister ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsRegister(!isRegister)}
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
