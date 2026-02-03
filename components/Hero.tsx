
import React from 'react';

const Hero: React.FC = () => {
  // Removed Browse Fleet button per request; kept hero visuals only

  return (
    <div className="relative rounded-3xl overflow-hidden h-[400px] flex items-center bg-slate-900">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1600" 
          className="w-full h-full object-cover opacity-50"
          alt="Luxury car driving"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
      </div>
      
      <div className="relative z-10 px-12 max-w-2xl">
        <h1 className="text-5xl font-extrabold text-white leading-tight mb-4">
          The Heartbeat of <span className="text-emerald-400">Addis Rental</span>
        </h1>
        <p className="text-lg text-slate-300 mb-8">
          Reliable fleet, real-time availability, and the most seamless booking experience in the city.
        </p>
        <div className="flex items-center space-x-3 text-white">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <img 
                  key={i}
                  src={`https://picsum.photos/seed/${i}/40/40`} 
                  className="w-8 h-8 rounded-full border-2 border-slate-900"
                  alt="User"
                />
              ))}
            </div>
            <span className="text-sm font-medium">Trusted by 1k+ customers</span>
          </div>
      </div>
    </div>
  );
};

export default Hero;
