
import React from 'react';

interface Props {
  user: { role: 'admin' | 'user' } | null;
  onSignInClick: () => void;
  onSignOut: () => void;
  onSupportClick?: () => void;
  onHomeClick?: () => void;
  onCarsClick?: () => void;
}

const Header: React.FC<Props> = ({ user, onSignInClick, onSignOut, onSupportClick, onHomeClick, onCarsClick }) => {
  const isAdmin = user?.role === 'admin';

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center group cursor-pointer">
          <div className="relative">
            <button onClick={(e) => { e.preventDefault(); onHomeClick?.(); }} className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-emerald-300/50 transform group-hover:rotate-12 transition-all duration-300 ring-1 ring-white/30">
              <span className="font-extrabold text-3xl tracking-tighter select-none drop-shadow-sm">GD</span>
            </button>
            {/* Subtle glossy overlay (reduced opacity so logo stays visible) */}
            <div className="absolute inset-0 bg-white/5 rounded-2xl pointer-events-none"></div>
          </div>
          <div className="ml-3 flex flex-col justify-center">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tighter leading-none drop-shadow-sm">
              GashaDrift
            </span>
            <div className="flex items-center mt-1">
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] leading-none">
                Elite Car Rental
              </span>
              <div className="h-px w-4 bg-emerald-200 ml-2"></div>
            </div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center space-x-10 text-slate-600 font-bold text-sm uppercase tracking-widest">
          <button onClick={(e) => { e.preventDefault(); onCarsClick?.(); }} className="hover:text-emerald-500 transition-colors relative group">
            Cars
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"></span>
          </button>
          {isAdmin ? (
             <a href="#" className="text-emerald-600 flex items-center">
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></span>
               Admin Control
             </a>
          ) : (
            <button onClick={(e) => { e.preventDefault(); onSupportClick?.(); }} className="hover:text-emerald-500 transition-colors relative group">
              Support
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full"></span>
            </button>
          )}
        </nav>

        <div className="flex items-center space-x-6">
          {user ? (
            <div className="flex items-center">
              <div className="flex flex-col items-end mr-4 hidden sm:flex">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                  {isAdmin ? 'System Admin' : 'Premium Member'}
                </span>
                <span className="text-[9px] text-slate-400 font-bold">LIFETIME ACCESS</span>
              </div>
              <button 
                onClick={onSignOut}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-600 transition-all active:scale-95 text-xs uppercase tracking-widest shadow-lg shadow-slate-200"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={onSignInClick}
              className="relative overflow-hidden group bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-200/60 active:scale-95"
            >
              <span className="relative z-10 flex items-center">
                Sign In
                <i className="fas fa-chevron-right ml-2 text-[10px] group-hover:translate-x-1 transition-transform"></i>
              </span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform skew-x-12 duration-500"></div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
