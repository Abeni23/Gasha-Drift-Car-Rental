
import React from 'react';
import { Vehicle } from '../types';

interface Props {
  vehicles: Vehicle[];
  onBook: (vehicle: Vehicle) => void;
}

const VehicleGrid: React.FC<Props> = ({ vehicles, onBook }) => {
  if (vehicles.length === 0) {
    return (
      <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
        <div className="text-slate-300 text-6xl mb-4">
          <i className="fas fa-car-side"></i>
        </div>
        <h3 className="text-xl font-bold text-slate-700">No vehicles available</h3>
        <p className="text-slate-500">Try changing your dates or location.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <div 
          key={vehicle.id} 
          className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="relative h-48 overflow-hidden">
            <img 
              src={vehicle.image} 
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-600 shadow-sm uppercase tracking-wide">
              {vehicle.type}
            </div>
            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-lg text-white font-bold text-base shadow-lg">
              {vehicle.pricePerDay} <span className="text-[10px] font-normal text-slate-400 uppercase">Birr/day</span>
            </div>
          </div>
          
          <div className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{vehicle.make} {vehicle.model}</h3>
                <p className="text-sm text-slate-500">{vehicle.year} • {vehicle.transmission}</p>
              </div>
              <div className="flex items-center text-emerald-500 font-bold">
                <i className="fas fa-star text-xs mr-1"></i>
                <span>4.9</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-slate-600 text-sm">
                <i className="fas fa-user-friends w-5 text-emerald-500"></i>
                <span>{vehicle.seats} Seats</span>
              </div>
              <div className="flex items-center text-slate-600 text-sm">
                <i className="fas fa-gas-pump w-5 text-emerald-500"></i>
                <span>{vehicle.fuelType}</span>
              </div>
              <div className="flex items-center text-slate-600 text-sm">
                <i className="fas fa-location-arrow w-5 text-emerald-500"></i>
                <span className="truncate">{vehicle.location.split(' ')[0]}</span>
              </div>
              <div className="flex items-center text-slate-600 text-sm">
                <i className="fas fa-shield-check w-5 text-emerald-500"></i>
                <span>Full Cover</span>
              </div>
            </div>

            <button 
              onClick={() => onBook(vehicle)}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-slate-200"
            >
              Rent Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehicleGrid;
