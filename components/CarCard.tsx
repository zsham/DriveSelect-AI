
import React from 'react';
import { Car } from '../types';
import { Icons } from '../constants';

interface CarCardProps {
  car: Car;
  onBook: () => void;
  isBooked: boolean;
}

const CarCard: React.FC<CarCardProps> = ({ car, onBook, isBooked }) => {
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Luxury': return { border: 'card-luxury', glow: 'glow-luxury', text: 'text-amber-600', bg: 'bg-amber-50', badge: 'bg-amber-100 text-amber-700' };
      case 'SUV': return { border: 'card-suv', glow: 'glow-suv', text: 'text-emerald-600', bg: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700' };
      case 'Sport': return { border: 'card-sport', glow: 'glow-sport', text: 'text-rose-600', bg: 'bg-rose-50', badge: 'bg-rose-100 text-rose-700' };
      case 'Electric': return { border: 'card-electric', glow: 'glow-electric', text: 'text-sky-600', bg: 'bg-sky-50', badge: 'bg-sky-100 text-sky-700' };
      case 'Economy': return { border: 'card-economy', glow: 'glow-economy', text: 'text-indigo-600', bg: 'bg-indigo-50', badge: 'bg-indigo-100 text-indigo-700' };
      default: return { border: '', glow: '', text: 'text-slate-600', bg: 'bg-slate-50', badge: 'bg-slate-100 text-slate-700' };
    }
  };

  const styles = getCategoryStyles(car.category);

  return (
    <div className={`group relative bg-white rounded-[2.5rem] p-5 transition-all duration-500 shadow-xl border border-slate-100 hover:-translate-y-3 ${styles.border} ${styles.glow}`}>
      {/* Badge Overlay */}
      <div className="absolute top-8 left-8 z-10">
        <span className={`${styles.badge} px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm backdrop-blur-md`}>
          {car.category}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative h-64 w-full rounded-[2.2rem] overflow-hidden bg-slate-100 mb-6">
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Rating Floating */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xl border border-slate-50">
          <Icons.Star />
          <span className="font-extrabold text-sm text-slate-900">{car.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-2">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className={`${styles.text} font-black text-[10px] uppercase tracking-[0.3em] mb-2`}>{car.brand}</p>
            <h3 className="text-3xl font-black text-slate-900 leading-tight group-hover:text-vibrant transition-all">{car.name}</h3>
          </div>
          <div className="text-right">
            <span className={`text-2xl font-black ${styles.text}`}>RM{car.pricePerDay}</span>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-tighter">per day</p>
          </div>
        </div>

        {/* Feature Tags with color */}
        <div className="flex flex-wrap gap-2 mb-8">
          {car.features.map((feat, i) => (
            <span key={i} className={`text-[9px] font-black ${styles.bg} ${styles.text} px-3 py-1.5 rounded-xl border border-transparent group-hover:border-current transition-all uppercase tracking-wider`}>
              {feat}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button 
          onClick={onBook}
          disabled={isBooked}
          className={`w-full py-5 rounded-[1.8rem] font-black text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 ${
            isBooked 
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
            : `bg-slate-900 text-white hover:bg-blue-600 hover:shadow-2xl shadow-lg`
          }`}
        >
          {isBooked ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
              Reserved
            </>
          ) : 'Reserve Now'}
        </button>
      </div>
    </div>
  );
};

export default CarCard;
