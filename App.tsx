
import React, { useState, useMemo, useEffect } from 'react';
import { Car, CarCategory, User, BookingRecord } from './types';
import { MOCK_CARS, Icons } from './constants';
import CarCard from './components/CarCard';
import Navbar from './components/Navbar';
import AiConcierge from './components/AiConcierge';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CarCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<'storefront' | 'admin'>('storefront');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);

  // Initialize session and bookings from storage
  useEffect(() => {
    const savedUser = localStorage.getItem('ds_session');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      // Re-sync with ds_users to get status updates from Admin
      const allUsers = JSON.parse(localStorage.getItem('ds_users') || '[]');
      const upToDateUser = allUsers.find((u: User) => u.id === parsed.id);
      setCurrentUser(upToDateUser || parsed);
    }
    
    const savedBookings = localStorage.getItem('ds_bookings');
    if (savedBookings) setBookings(JSON.parse(savedBookings));
  }, [view]);

  const filteredCars = useMemo(() => {
    return MOCK_CARS.filter(car => {
      const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           car.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('ds_session', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('storefront');
    localStorage.removeItem('ds_session');
  };

  const handleBooking = (car: Car) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }

    if (currentUser.role === 'merchant' && currentUser.shopStatus !== 'active') {
       alert("Your shop setup is still pending. Once approved by our Admin, you can interact with the fleet.");
       return;
    }

    const newBooking: BookingRecord = {
      id: Math.random().toString(36).substr(2, 9),
      carId: car.id,
      carName: car.name,
      userName: currentUser.name,
      userEmail: currentUser.email,
      date: new Date().toLocaleDateString('en-MY', { day: '2-digit', month: 'short', year: 'numeric' }),
      price: car.pricePerDay
    };

    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('ds_bookings', JSON.stringify(updatedBookings));
    
    alert(`Success! Your reservation for ${car.name} has been logged.`);
  };

  const isCarBooked = (carId: string) => bookings.some(b => b.carId === carId && b.userEmail === currentUser?.email);

  if (view === 'admin' && currentUser?.role === 'admin') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar 
          user={currentUser} 
          onAuthClick={() => setIsAuthOpen(true)} 
          onLogout={handleLogout}
          onSwitchView={setView}
          currentView={view}
        />
        <AdminDashboard bookings={bookings} onExit={() => setView('storefront')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <Navbar 
        user={currentUser} 
        onAuthClick={() => setIsAuthOpen(true)} 
        onLogout={handleLogout}
        onSwitchView={setView}
        currentView={view}
      />
      
      <main className="flex-grow">
        {/* Merchant Pending Notice */}
        {currentUser?.role === 'merchant' && currentUser.shopStatus === 'pending' && (
          <div className="fixed top-28 left-1/2 -translate-x-1/2 z-[80] w-full max-w-xl px-4 animate-in slide-in-from-top-4 duration-500">
            <div className="bg-amber-500 text-white p-6 rounded-[2rem] shadow-2xl flex items-center justify-between border-4 border-white">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-lg">⏳</span>
                </div>
                <div>
                  <p className="font-black text-xs uppercase tracking-widest">Shop Status: Pending Approval</p>
                  <p className="text-[10px] opacity-80 font-bold uppercase">Our admin is setting up your store credentials.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <Hero 
          onSearch={(query) => setSearchQuery(query)} 
          onOpenAi={() => setIsAiOpen(true)}
        />

        <div id="catalog" className="max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 bg-white/50 rounded-[4rem] my-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] block mb-4">The Selection</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4">Fleet Showcase.</h2>
              <p className="text-slate-500 font-medium">Browse vehicles managed by our verified Malaysian shop owners.</p>
            </div>
            <FilterBar 
              selected={selectedCategory} 
              onSelect={setSelectedCategory} 
            />
          </div>

          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredCars.map(car => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  onBook={() => handleBooking(car)}
                  isBooked={isCarBooked(car.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="mx-auto w-24 h-24 bg-white flex items-center justify-center rounded-full mb-8 shadow-xl">
                <Icons.Search />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">No Results</h3>
              <p className="text-slate-400 font-medium mb-8">Try a different filter or search term.</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-200"
              >
                Reset All
              </button>
            </div>
          )}
        </div>
      </main>

      <button 
        onClick={() => setIsAiOpen(true)}
        className="fixed bottom-10 right-10 w-20 h-20 bg-slate-900 text-white rounded-[2rem] shadow-2xl flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-110 active:scale-95 z-40 animate-pulse-soft group overflow-hidden"
      >
        <div className="relative z-10">
          <Icons.Chat />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>

      <AiConcierge 
        isOpen={isAiOpen} 
        onClose={() => setIsAiOpen(false)} 
        user={currentUser}
      />
      
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={handleLogin}
      />

      <footer className="bg-white pt-24 pb-12 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
               <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-slate-900 rounded-[1.2rem] flex items-center justify-center">
                  <span className="text-white font-black text-lg italic">D</span>
                </div>
                <span className="text-xl font-black tracking-tighter text-slate-900">
                  DRIVE<span className="text-blue-600 italic">SELECT</span>
                </span>
              </div>
              <p className="max-w-sm text-slate-400 font-medium leading-relaxed">The premium Malaysian marketplace connecting fleet owners with luxury travelers.</p>
            </div>
            <div>
              <h3 className="text-slate-900 font-black text-xs uppercase tracking-widest mb-8">Ecosystem</h3>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Apply as Partner</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Merchant Portal</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-slate-900 font-black text-xs uppercase tracking-widest mb-8">Platform</h3>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Trust Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">&copy; 2024 DRIVESELECT AI. ELEVATING THE ROAD.</p>
            <div className="flex gap-8 text-slate-300 font-bold text-xs uppercase tracking-widest">
              <a href="#" className="hover:text-slate-900">Privacy</a>
              <a href="#" className="hover:text-slate-900">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
