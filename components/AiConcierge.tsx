
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Message, User } from '../types';
import { Icons, MOCK_CARS } from '../constants';

interface AiConciergeProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const AiConcierge: React.FC<AiConciergeProps> = ({ isOpen, onClose, user }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: user 
        ? `Selamat Datang, ${user.name}! 👋 Ready to find your next luxury drive today?` 
        : "Selamat Datang! 👋 I'm your DriveSelect Concierge. Sign in for personalized bookings, or let's browse Malaysian icons together!",
      timestamp: new Date()
    }
  ]);

  // Reset initial message when user changes
  useEffect(() => {
    if (user && messages.length === 1) {
      setMessages([{
        role: 'assistant',
        content: `Hi ${user.name}! I can see you're logged in. Looking for a ${user.role === 'admin' ? 'fleet report or a personal' : ''} luxury car today?`,
        timestamp: new Date()
      }]);
    }
  }, [user]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-3-flash-preview';

      const prompt = `
        You are a high-energy luxury car concierge for "DriveSelect AI" in MALAYSIA. 
        Current User: ${user ? `${user.name} (${user.role} role)` : 'Guest'}
        Fleet: ${JSON.stringify(MOCK_CARS.map(c => ({ name: c.name, brand: c.brand, price: `RM ${c.pricePerDay}` })))}
        Instructions: 
        1. Be vibrant and helpful.
        2. If they are an admin, you can mention fleet availability.
        3. If they are a guest, suggest signing in to book.
      `;

      const result = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { temperature: 0.8 }
      });

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: result.text || "Oops, lost my signal! How else can I help?",
        timestamp: new Date()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Lost the connection! Cuba lagi sebentar.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-slate-900/80 backdrop-blur-xl transition-all animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl h-[85vh] rounded-[3rem] shadow-[0_32px_128px_-10px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-white/10">
        {/* Header */}
        <div className="vibrant-gradient p-8 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl animate-float">
              <div className="text-purple-600 scale-125"><Icons.Chat /></div>
            </div>
            <div>
              <h2 className="text-white text-2xl font-black tracking-tight">AI Concierge</h2>
              <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <button onClick={onClose} className="bg-white/10 p-3 rounded-2xl text-white hover:bg-white/20 transition-all active:scale-90">
            <Icons.Close />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-6 rounded-[2rem] shadow-sm border ${
                msg.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-none border-slate-800' 
                  : 'bg-white text-slate-800 rounded-tl-none border-slate-100'
              }`}>
                <p className="text-sm font-bold leading-relaxed">{msg.content}</p>
                <span className="text-[9px] mt-3 block opacity-40 font-black uppercase tracking-widest">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-8 bg-white border-t border-slate-100">
          <div className="flex gap-4 items-center bg-slate-50 p-3 rounded-[2rem] border-2 border-transparent focus-within:border-purple-200 transition-all shadow-inner">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="How can I help you today?"
              className="flex-1 bg-transparent px-5 py-2 outline-none text-slate-900 font-bold placeholder:text-slate-300"
              disabled={isLoading}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="vibrant-gradient text-white p-4 rounded-2xl hover:scale-110 active:scale-95 transition-all disabled:grayscale disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiConcierge;
