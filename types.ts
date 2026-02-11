
export type Role = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export type CarCategory = 'Luxury' | 'SUV' | 'Sport' | 'Economy' | 'Electric';

export interface Car {
  id: string;
  name: string;
  brand: string;
  category: CarCategory;
  pricePerDay: number;
  image: string;
  specs: {
    transmission: 'Auto' | 'Manual';
    fuel: string;
    seats: number;
    acceleration?: string;
  };
  features: string[];
  description: string;
  rating: number;
}

export interface BookingRecord {
  id: string;
  carId: string;
  carName: string;
  userName: string;
  userEmail: string;
  date: string;
  price: number;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
