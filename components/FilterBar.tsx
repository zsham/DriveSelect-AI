
import React from 'react';
import { CarCategory } from '../types';

interface FilterBarProps {
  selected: CarCategory | 'All';
  onSelect: (cat: CarCategory | 'All') => void;
}

const categories: { label: CarCategory | 'All', color: string }[] = [
  { label: 'All', color: 'bg-slate-900' },
  { label: 'Luxury', color: 'bg-amber-500' },
  { label: 'SUV', color: 'bg-emerald-500' },
  { label: 'Sport', color: 'bg-rose-500' },
  { label: 'Electric', color: 'bg-sky-500' },
  { label: 'Economy', color: 'bg-indigo-500' }
];

const FilterBar: React.FC<FilterBarProps> = ({ selected, onSelect }) => {
  return (
    <div className="flex items-center gap-4 overflow-x-auto py-6 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat.label}
          onClick={() => onSelect(cat.label)}
          className={`px-10 py-4 rounded-[1.8rem] text-[10px] font-black transition-all whitespace-nowrap uppercase tracking-[0.2em] border-2 shadow-lg active:scale-90 ${
            selected === cat.label
              ? `${cat.color} text-white border-transparent scale-110 shadow-xl`
              : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300 hover:text-slate-900'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
