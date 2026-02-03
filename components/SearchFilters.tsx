
import React from 'react';
import { SearchParams } from '../types';
import { LOCATIONS } from '../mockData';

interface Props {
  params: SearchParams;
  setParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}

const SearchFilters: React.FC<Props> = ({ params, setParams }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block">Pickup Location</label>
        <div className="relative">
          <i className="fas fa-location-dot absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"></i>
          <select 
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 focus:border-emerald-500 focus:bg-white outline-none transition-all appearance-none cursor-pointer"
            value={params.location}
            onChange={(e) => setParams({ ...params, location: e.target.value })}
          >
            {LOCATIONS.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block">Pickup Date</label>
        <div className="relative">
          <i className="fas fa-calendar absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"></i>
          <input 
            type="date"
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 focus:border-emerald-500 focus:bg-white outline-none transition-all"
            value={params.startDate}
            onChange={(e) => setParams({ ...params, startDate: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block">Return Date</label>
        <div className="relative">
          <i className="fas fa-calendar-check absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"></i>
          <input 
            type="date"
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 focus:border-emerald-500 focus:bg-white outline-none transition-all"
            value={params.endDate}
            onChange={(e) => setParams({ ...params, endDate: e.target.value })}
          />
        </div>
      </div>

      <button className="w-full bg-emerald-500 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-lg flex items-center justify-center space-x-2">
        <i className="fas fa-search"></i>
        <span>Find a Car</span>
      </button>
    </div>
  );
};

export default SearchFilters;
