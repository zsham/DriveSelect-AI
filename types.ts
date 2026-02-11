
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

export interface BookingRequest {
  carId: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
