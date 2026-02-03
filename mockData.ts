
import { Vehicle } from './types';

export const LOCATIONS = ['Addis Ababa Downtown', 'Bole International Airport', 'Lancha Branch', 'Gerji Office', 'Kechene'];

export const VEHICLES: Vehicle[] = [
  {
    id: '1',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    type: 'Electric',
    pricePerDay: 120,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800',
    status: 'available',
    location: 'Bole International Airport',
    transmission: 'Automatic',
    seats: 5,
    fuelType: 'Electric',
    licensePlate: 'AA-2-12345'
  },
  {
    id: '2',
    make: 'Toyota',
    model: 'Land Cruiser Prado',
    year: 2022,
    type: 'SUV',
    pricePerDay: 150,
    image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=800',
    status: 'available',
    location: 'Addis Ababa Downtown',
    transmission: 'Automatic',
    seats: 7,
    fuelType: 'Diesel',
    licensePlate: 'AA-2-56789'
  },
  {
    id: '3',
    make: 'BMW',
    model: '5 Series',
    year: 2023,
    type: 'Luxury',
    pricePerDay: 200,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
    status: 'available',
    location: 'Addis Ababa Downtown',
    transmission: 'Automatic',
    seats: 5,
    fuelType: 'Petrol',
    licensePlate: 'AA-2-00001'
  },
  {
    id: '4',
    make: 'Ford',
    model: 'Ranger Raptor',
    year: 2021,
    type: 'Truck',
    pricePerDay: 140,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    status: 'reserved',
    location: 'Lancha Branch',
    transmission: 'Automatic',
    seats: 5,
    fuelType: 'Diesel',
    licensePlate: 'AA-2-99887'
  },
  {
    id: '5',
    make: 'Hyundai',
    model: 'Elantra',
    year: 2022,
    type: 'Sedan',
    pricePerDay: 80,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800',
    status: 'available',
    location: 'Gerji Office',
    transmission: 'Automatic',
    seats: 5,
    fuelType: 'Petrol',
    licensePlate: 'AA-2-44332'
  },
  {
    id: '6',
    make: 'Range Rover',
    model: 'Sport',
    year: 2024,
    type: 'Luxury',
    pricePerDay: 350,
    image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&q=80&w=800',
    status: 'available',
    location: 'Bole International Airport',
    transmission: 'Automatic',
    seats: 5,
    fuelType: 'Hybrid',
    licensePlate: 'AA-2-VIP01'
  }
];
