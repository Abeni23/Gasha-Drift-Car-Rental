
import React, { useState, useMemo } from 'react';
import { Vehicle, Reservation, VehicleType, VehicleStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { LOCATIONS } from '../mockData';

interface Props {
  vehicles: Vehicle[];
  reservations: Reservation[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  onBack?: () => void;
}

const AdminDashboard: React.FC<Props> = ({ vehicles, reservations, setVehicles, onBack }) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterLocation, setFilterLocation] = useState<string>('All');
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialFormState: Partial<Vehicle> = {
    make: '',
    model: '',
    year: new Date().getFullYear(),
    type: 'Sedan',
    pricePerDay: 500,
    image: '',
    status: 'available',
    location: LOCATIONS[0],
    transmission: 'Automatic',
    seats: 5,
    fuelType: 'Petrol',
    licensePlate: '',
    description: '',
    rentedUntil: ''
  };

  const [formData, setFormData] = useState<Partial<Vehicle>>(initialFormState);

  const totalRevenue = reservations.reduce((acc, r) => acc + r.totalPrice, 0);
  const activeRents = reservations.filter(r => r.status === 'confirmed').length;
  const maintenanceCount = vehicles.filter(v => v.status === 'maintenance').length;
  
  const stats = [
    { label: 'Total Cars', value: vehicles.length, icon: 'fa-car', color: 'bg-emerald-500' },
    { label: 'Active Rents', value: activeRents, icon: 'fa-key', color: 'bg-blue-500' },
    { label: 'Maintenance', value: maintenanceCount, icon: 'fa-screwdriver-wrench', color: 'bg-amber-500' },
    { label: 'Revenue (ETB)', value: `${totalRevenue.toLocaleString()} Birr`, icon: 'fa-hand-holding-dollar', color: 'bg-indigo-500' },
  ];

  const chartData = [
    { name: 'Available', value: vehicles.filter(v => v.status === 'available').length },
    { name: 'Rented', value: vehicles.filter(v => v.status === 'rented').length },
    { name: 'Maintenance', value: vehicles.filter(v => v.status === 'maintenance').length },
    { name: 'Reserved', value: vehicles.filter(v => v.status === 'reserved').length },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      const matchesSearch = 
        vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) || 
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) || 
        vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterType === 'All' || vehicle.type === filterType;
      const matchesStatus = filterStatus === 'All' || vehicle.status === filterStatus;
      const matchesLocation = filterLocation === 'All' || vehicle.location === filterLocation;

      return matchesSearch && matchesType && matchesStatus && matchesLocation;
    });
  }, [vehicles, searchQuery, filterType, filterStatus, filterLocation]);

  const showToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setVehicles(prev => prev.map(v => v.id === editingId ? { ...v, ...formData } as Vehicle : v));
      showToast(`${formData.make} ${formData.model} updated successfully.`);
      setEditingId(null);
    } else {
      const newVehicle: Vehicle = {
        ...formData as Vehicle,
        id: Math.random().toString(36).substr(2, 9),
      };
      setVehicles(prev => [...prev, newVehicle]);
  showToast(`${formData.make} ${formData.model} added to cars.`);
    }
    
    setFormData(initialFormState);
    const listElement = document.getElementById('cars-inventory');
    if (listElement) listElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingId(vehicle.id);
    setFormData({ ...vehicle });
    const formElement = document.getElementById('cars-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormState);
  };

  const removeVehicle = (e: React.MouseEvent | React.FormEvent, vehicle: Partial<Vehicle>) => {
    if (e.type === 'click') {
      (e as React.MouseEvent).preventDefault();
      (e as React.MouseEvent).stopPropagation();
    }

    if (!vehicle.id) return;

    const isRented = vehicle.status === 'rented';
    const confirmMsg = isRented 
      ? `CRITICAL WARNING: This vehicle (${vehicle.licensePlate}) is currently RENTED. Deleting it will remove active tracking. Proceed with deletion?`
      : `Are you sure you want to permanently delete the ${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})?`;

    if (window.confirm(confirmMsg)) {
      setVehicles(prev => prev.filter(v => v.id !== vehicle.id));
      if (editingId === vehicle.id) cancelEdit();
      showToast(`Vehicle ${vehicle.licensePlate} has been deleted.`);
    }
  };

  const inputClasses = "w-full p-3 rounded-xl border border-slate-200 bg-white text-emerald-600 font-medium focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400";

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 relative">
      {/* Toast Notification */}
      {successMessage && (
        <div className="fixed top-24 right-8 z-[100] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-in slide-in-from-right-8 duration-300 border-l-4 border-emerald-500">
          <i className="fas fa-check-circle text-emerald-500 text-xl"></i>
          <span className="font-bold text-sm tracking-wide">{successMessage}</span>
        </div>
      )}

      <div className="flex flex-col space-y-4">
        {onBack && (
          <button 
            type="button"
            onClick={onBack}
            className="group flex items-center space-x-2 w-fit px-3 py-1.5 rounded-full bg-white border border-emerald-100 text-emerald-600 hover:bg-emerald-50 transition-all active:scale-95 shadow-sm"
          >
            <i className="fas fa-arrow-left text-xs group-hover:-translate-x-0.5 transition-transform"></i>
            <span className="text-xs font-bold uppercase tracking-wider">Back to Home</span>
          </button>
        )}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Cars Control Center</h2>
            <p className="text-slate-500 text-sm">Manage GashaDrift cars and operations.</p>
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-current/20`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <div className="text-right">
              <p className="text-xl font-black text-slate-800">{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

  <section id="cars-inventory" className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-2xl font-bold text-slate-800 flex items-center">
            <i className="fas fa-list-check mr-3 text-emerald-500"></i>
            Car Inventory
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="relative col-span-1 md:col-span-1">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Search plate, model..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className="p-2 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none text-sm bg-white"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
            <option value="Truck">Truck</option>
            <option value="Electric">Electric</option>
          </select>
          <select 
            className="p-2 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none text-sm bg-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
            <option value="reserved">Reserved</option>
          </select>
          <select 
            className="p-2 rounded-xl border border-slate-200 focus:border-emerald-500 outline-none text-sm bg-white"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          >
            <option value="All">All Locations</option>
            {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-100 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                <th className="pb-4">Vehicle Details</th>
                <th className="pb-4">Plate No.</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredVehicles.map(v => (
                <tr key={v.id} className={`group hover:bg-slate-50 transition-colors ${editingId === v.id ? 'bg-emerald-50' : ''}`}>
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-8 rounded overflow-hidden bg-slate-100 border border-slate-200">
                        <img src={v.image || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{v.make} {v.model}</p>
                        <p className="text-[10px] text-slate-500 uppercase">{v.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                      {v.licensePlate}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                      v.status === 'available' ? 'bg-emerald-100 text-emerald-700' :
                      v.status === 'rented' ? 'bg-blue-100 text-blue-700' :
                      v.status === 'maintenance' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-600 text-white'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        type="button"
                        onClick={() => handleEdit(v)}
                        className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
                      >
                        <i className="fas fa-edit text-xs"></i>
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => removeVehicle(e, v)}
                        className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                      >
                        <i className="fas fa-trash-can text-xs"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div id="cars-form" className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-2xl font-bold mb-8 flex items-center text-slate-800">
            <i className={`fas ${editingId ? 'fa-pen-to-square' : 'fa-plus-circle'} mr-3 text-emerald-500`}></i>
            {editingId ? `Edit ${formData.make} ${formData.model}` : 'Add New Car'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Make & Model</label>
                <div className="flex gap-2">
                  <input required placeholder="Make" className={inputClasses.replace('w-full', 'w-1/2')} value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})} />
                  <input required placeholder="Model" className={inputClasses.replace('w-full', 'w-1/2')} value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">License Plate</label>
                <input required placeholder="AA-2-XXXXX" className={inputClasses} value={formData.licensePlate} onChange={e => setFormData({...formData, licensePlate: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Type</label>
                <select className={inputClasses} value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as VehicleType})}>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Truck">Truck</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rate/Day (Birr)</label>
                <input required type="number" className={inputClasses} value={formData.pricePerDay} onChange={e => setFormData({...formData, pricePerDay: Number(e.target.value)})} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
                <select className={inputClasses} value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}>
                  {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
                <select className={inputClasses} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as VehicleStatus})}>
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="reserved">Reserved</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle Photo</label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input type="file" accept="image/*" className="hidden" id="vehicle-upload" onChange={handleImageUpload} />
                  <label htmlFor="vehicle-upload" className={`flex items-center justify-center w-full p-4 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${formData.image ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-slate-200 text-slate-400 hover:border-emerald-300 bg-white'}`}>
                    <i className={`fas ${formData.image ? 'fa-check-circle' : 'fa-camera'} mr-2`}></i>
                    <span className="text-sm font-bold uppercase">{formData.image ? 'Uploaded' : 'Upload Image'}</span>
                  </label>
                </div>
                {formData.image && <img src={formData.image} className="w-24 h-16 rounded-xl object-cover border border-slate-200" alt="Preview" />}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button type="submit" className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200">
                {editingId ? 'Save Changes' : 'Add Car'}
              </button>
              
              {editingId && (
                <div className="flex gap-2">
                  <button type="button" onClick={(e) => removeVehicle(e, formData)} className="px-6 bg-white border-2 border-red-100 text-red-600 rounded-2xl font-bold hover:bg-red-50 transition-all flex items-center justify-center" title="Delete Car">
                    <i className="fas fa-trash-can mr-2"></i>
                    Delete
                  </button>
                  <button type="button" onClick={cancelEdit} className="px-6 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-6 flex items-center text-slate-800">
            <i className="fas fa-chart-pie mr-2 text-emerald-500"></i>
            Cars Distribution
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
