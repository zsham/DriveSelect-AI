
import React from 'react';
import { Car } from './types';

export const MOCK_CARS: Car[] = [
  {
    id: '1',
    name: 'Myvi AV',
    brand: 'Perodua',
    category: 'Economy',
    pricePerDay: 120,
    image: 'https://images.unsplash.com/photo-1594070319144-29bd2750652d?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'Auto', fuel: 'Petrol', seats: 5 },
    features: ['Advanced Safety Assist', 'Smart Entry', 'Fuel Efficient', 'Apple CarPlay'],
    description: 'The "King of Malaysian Roads". Compact, reliable, and surprisingly punchy for city drives.',
    rating: 4.8
  },
  {
    id: '2',
    name: 'X50 TGDi Flagship',
    brand: 'Proton',
    category: 'SUV',
    pricePerDay: 220,
    image: 'https://images.unsplash.com/photo-1621245804469-455b546372d8?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'Auto', fuel: 'Petrol', seats: 5, acceleration: '7.9s 0-100' },
    features: ['N95 Cabin Filter', 'Auto Park Assist', '360 Camera', 'Sunroof'],
    description: 'A premium local SUV with intelligent features and continental-inspired performance.',
    rating: 4.7
  },
  {
    id: '3',
    name: 'City RS e:HEV',
    brand: 'Honda',
    category: 'Luxury',
    pricePerDay: 180,
    image: 'https://images.unsplash.com/photo-1609521262047-f8221183184e?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'Auto', fuel: 'Hybrid', seats: 5 },
    features: ['Honda SENSING', 'Multi-angle Camera', 'Hands-free Phone', 'EV Drive Mode'],
    description: 'The perfect urban sedan combining hybrid efficiency with a sporty aesthetic.',
    rating: 4.9
  },
  {
    id: '4',
    name: 'Vios GR-S',
    brand: 'Toyota',
    category: 'Sport',
    pricePerDay: 170,
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'Auto', fuel: 'Petrol', seats: 5 },
    features: ['GR Suspension', 'Paddle Shifters', 'Blind Spot Monitor', 'Rugged Bodykit'],
    description: 'Engineered for those who want a reliable daily driver with a sporty Gazoo Racing edge.',
    rating: 4.6
  },
  {
    id: '5',
    name: 'Atto 3 Extended',
    brand: 'BYD',
    category: 'Electric',
    pricePerDay: 280,
    image: 'https://images.unsplash.com/photo-1684346761748-0c67e81dfd3b?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'Auto', fuel: 'Electric', seats: 5, acceleration: '7.3s 0-100' },
    features: ['480km Range', '12.8" Rotating Screen', 'NFC Key', 'Voice Assistant'],
    description: 'The leading electric SUV in Malaysia. High-tech, smooth, and incredibly quiet.',
    rating: 4.9
  },
  {
    id: '6',
    name: 'Ativa Turbo',
    brand: 'Perodua',
    category: 'SUV',
    pricePerDay: 150,
    image: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&q=80&w=800',
    specs: { transmission: 'Auto', fuel: 'Petrol', seats: 5 },
    features: ['Turbo Engine', 'Lane Departure Warning', 'Auto High Beam', 'Spacious Boot'],
    description: 'The best-value compact SUV for navigating narrow Malaysian city streets.',
    rating: 4.7
  }
];

export const Icons = {
  Star: () => <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>,
  User: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Search: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Calendar: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Map: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Chat: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
  Close: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
};
