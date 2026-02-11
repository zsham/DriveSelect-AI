
import React, { useState, useMemo } from 'react';
import { Car, CarCategory } from './types';
import { MOCK_CARS, Icons } from './constants';
import CarCard from './components/CarCard';
import Navbar from './components/Navbar';
import AiConcierge from './components/AiConcierge';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CarCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [bookedCars, setBookedCars] = useState<string[]>([]);

  const filteredCars = useMemo(() => {
    return MOCK_CARS.filter(car => {
      const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           car.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleBooking = (carId: string) => {
    setBookedCars(prev => [...prev, carId]);
    // Smooth toast could be added here, using native alert for now
    setTimeout(() => {
        alert(`Reservation confirmed! We've secured your ${MOCK_CARS.find(c => c.id === carId)?.name}.`);
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      
      <main className="flex-grow">
        <Hero 
          onSearch={(query) => setSearchQuery(query)} 
          onOpenAi={() => setIsAiOpen(true)}
        />

        <div id="catalog" className="max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 bg-white/50 rounded-[4rem] my-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] block mb-4">The Selection</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4">Our Local Icons.</h2>
              <p className="text-slate-500 font-medium">Browse through our hand-picked collection of the finest vehicles available across Malaysia.</p>
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
                  onBook={() => handleBooking(car.id)}
                  isBooked={bookedCars.includes(car.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="mx-auto w-24 h-24 bg-white flex items-center justify-center rounded-full mb-8 shadow-xl">
                <Icons.Search />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Vehicle Not Found</h3>
              <p className="text-slate-400 font-medium mb-8">Perhaps your dream car is in another category?</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-200"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modern Floating AI Button */}
      <button 
        onClick={() => setIsAiOpen(true)}
        className="fixed bottom-10 right-10 w-20 h-20 bg-slate-900 text-white rounded-[2rem] shadow-2xl flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-110 active:scale-95 z-40 animate-pulse-soft group overflow-hidden"
      >
        <div className="relative z-10">
          <Icons.Chat />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>

      <AiConcierge isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />

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
              <p className="max-w-sm text-slate-400 font-medium leading-relaxed">Redefining mobility with luxury and intelligence. Every journey deserves the perfect companion.</p>
            </div>
            <div>
              <h3 className="text-slate-900 font-black text-xs uppercase tracking-widest mb-8">Navigation</h3>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Fleet Selection</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Booking Guide</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Member Rewards</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-slate-900 font-black text-xs uppercase tracking-widest mb-8">Experience</h3>
              <ul className="space-y-4 text-slate-500 font-bold text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">AI Concierge</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">VIP Chauffeur</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Corporate Fleet</a></li>
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
