
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchFilters from './components/SearchFilters';
import VehicleGrid from './components/VehicleGrid';
import AdminDashboard from './components/AdminDashboard';
import BookingModal from './components/BookingModal';
import LoginPage from './components/LoginPage';
import Support from './components/Support';
import { VEHICLES } from './mockData';
import { Vehicle, SearchParams, Reservation } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<{ role: 'admin' | 'user' } | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>(VEHICLES);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: 'Addis Ababa Downtown',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
  });
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [page, setPage] = useState<'home' | 'support'>('home');

  const isAdmin = user?.role === 'admin';

  const availableVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      if (vehicle.status !== 'available' && vehicle.status !== 'reserved') return false;
      
      const hasConflict = reservations.some(res => {
        if (res.vehicleId !== vehicle.id || res.status === 'cancelled') return false;
        
        const searchStart = new Date(searchParams.startDate);
        const searchEnd = new Date(searchParams.endDate);
        const resStart = new Date(res.startDate);
        const resEnd = new Date(res.endDate);
        
        return (searchStart < resEnd && searchEnd > resStart);
      });
      
      return !hasConflict;
    });
  }, [vehicles, reservations, searchParams]);

  const handleBooking = (vehicle: Vehicle) => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    setSelectedVehicle(vehicle);
    setIsBookingOpen(true);
  };

  const confirmBooking = (customerData: any) => {
    if (!selectedVehicle) return;

    const totalDays = Math.max(1, Math.ceil((new Date(searchParams.endDate).getTime() - new Date(searchParams.startDate).getTime()) / (1000 * 3600 * 24)));
    const totalPrice = selectedVehicle.pricePerDay * totalDays;

    const newReservation: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      vehicleId: selectedVehicle.id,
      customerId: 'CUST-' + Math.random().toString(36).substr(2, 5),
      startDate: searchParams.startDate,
      endDate: searchParams.endDate,
      totalPrice: totalPrice,
      status: 'confirmed',
      pickupLocation: searchParams.location,
      transactionId: customerData.transactionId,
    };

    setReservations(prev => [...prev, newReservation]);
    setIsBookingOpen(false);
    alert(`Booking Confirmed for ${selectedVehicle.make} ${selectedVehicle.model}! Total: ${totalPrice} Birr`);
  };

  const handleLogin = (role: 'admin' | 'user') => {
    setUser({ role });
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const scrollToCars = () => {
    const el = document.getElementById('cars');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleHomeClick = () => {
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCarsClick = () => {
    if (page !== 'home') {
      setPage('home');
      // wait for the home content to render, then scroll
      setTimeout(() => scrollToCars(), 80);
    } else {
      scrollToCars();
    }
  };

  // Ensure Support page is scrolled to top when opened so it doesn't appear from the bottom
  useEffect(() => {
    if (page === 'support') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [page]);

  // When admin logs in and AdminDashboard is shown, ensure the view is at the top
  useEffect(() => {
    if (isAdmin) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isAdmin]);

  return (
    <div className="min-h-screen bg-slate-50/50 scroll-smooth">
      <Header 
        user={user} 
        onSignInClick={() => setShowLogin(true)} 
        onSignOut={handleLogout}
        onSupportClick={() => setPage('support')}
        onHomeClick={handleHomeClick}
        onCarsClick={handleCarsClick}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {page === 'support' ? (
          <Support onBack={() => setPage('home')} />
        ) : (
          (isAdmin ? (
            <AdminDashboard 
              vehicles={vehicles} 
              reservations={reservations} 
              setVehicles={setVehicles}
              onBack={handleLogout}
            />
          ) : (
            <div className="space-y-12">
              <Hero />
              
              <div className="bg-white p-6 rounded-3xl shadow-2xl border border-emerald-50 -mt-24 relative z-10 mx-4 md:mx-10">
                <SearchFilters 
                  params={searchParams} 
                  setParams={setSearchParams} 
                />
              </div>

              <div id="cars" className="space-y-8 mt-16">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                      Explore Our Fleet
                    </h2>
                    <p className="text-slate-500 font-medium">Available rentals in {searchParams.location}</p>
                  </div>
                  <div className="hidden sm:flex space-x-2">
                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500 cursor-pointer transition-all">
                      <i className="fas fa-chevron-left"></i>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500 cursor-pointer transition-all">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
                <VehicleGrid 
                  vehicles={availableVehicles} 
                  onBook={handleBooking}
                />
              </div>
            </div>
          ))
        )}
      </main>

      {showLogin && (
        <LoginPage 
          onLogin={handleLogin} 
          onClose={() => setShowLogin(false)} 
        />
      )}

      {isBookingOpen && selectedVehicle && (
        <BookingModal 
          vehicle={selectedVehicle} 
          params={searchParams}
          onClose={() => setIsBookingOpen(false)}
          onConfirm={confirmBooking}
        />
      )}

      <footer className="bg-slate-950 text-white py-20 mt-32 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            <div className="md:col-span-2">
              <div className="flex items-center justify-center md:justify-start mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 mr-4">
                  <span className="font-black text-3xl tracking-tighter">GD</span>
                </div>
                <div>
                  <div className="text-3xl font-black text-white tracking-tighter">GashaDrift</div>
                  <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.3em]">Premium Car Rental</div>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm mx-auto md:mx-0">
                Revolutionizing the way you drive in Addis Ababa. Experience the pinnacle of automotive rental service with GD.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-emerald-500">Quick Links</h4>
              <ul className="space-y-4 text-slate-400 font-medium text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Our Fleet</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Security & Trust</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-emerald-500">Get in Touch</h4>
              <ul className="space-y-4 text-slate-400 font-medium text-sm">
                <li className="flex items-center justify-center md:justify-start">
                  <i className="fas fa-envelope mr-3 text-emerald-600"></i>
                  hello@gashadrift.com
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <i className="fas fa-phone mr-3 text-emerald-600"></i>
                  +251 911 123 456
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <i className="fas fa-location-dot mr-3 text-emerald-600"></i>
                  Bole, Addis Ababa
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-slate-500 text-xs font-medium">
              © 2024 GashaDrift GD. Handcrafted for excellence.
            </div>
            <div className="flex space-x-6 text-slate-400">
              <a href="#" className="hover:text-white transition-colors"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-white transition-colors"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-white transition-colors"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-white transition-colors"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
