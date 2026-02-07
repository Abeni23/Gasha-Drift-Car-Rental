
export type VehicleStatus = 'available' | 'rented' | 'maintenance' | 'reserved';
export type VehicleType = 'Sedan' | 'SUV' | 'Luxury' | 'Truck' | 'Electric';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  type: VehicleType;
  pricePerDay: number;
  image: string;
  status: VehicleStatus;
  location: string;
  transmission: 'Automatic' | 'Manual';
  seats: number;
  fuelType: string;
  licensePlate: string;
  description?: string;
  rentedUntil?: string;
}

export interface Reservation {
  id: string;
  vehicleId: string;
  customerId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  pickupLocation: string;
  transactionId?: string;
  paymentScreenshot?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  kebeleIdPhoto?: string;
  licenseNumber: string;
}

export interface SearchParams {
  location: string;
  startDate: string;
  endDate: string;
  vehicleType?: VehicleType;
}
