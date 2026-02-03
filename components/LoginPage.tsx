
import React, { useState } from 'react';

interface Props {
  onLogin: (role: 'admin' | 'user') => void;
  onClose: () => void;
}

type ViewMode = 'choice' | 'register' | 'login' | 'adminLogin';

const LoginPage: React.FC<Props> = ({ onLogin, onClose }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('choice');
  const [loginData, setLoginData] = useState({ name: '', password: '' });
  const [regData, setRegData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    kebelePhoto: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(viewMode === 'adminLogin' ? 'admin' : 'user');
    }, 1200);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Account created successfully! Welcome to GashaDrift.');
      onLogin('user');
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setRegData({ ...regData, kebelePhoto: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const inputClasses = "w-full p-3 rounded-xl border border-slate-200 bg-white text-emerald-600 font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-400";

  const renderHeader = (title: string, subtitle: string) => (
    <div className="flex justify-between items-start mb-8">
      <div className="flex items-center">
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-200/50 mr-4">
          <span className="font-black text-3xl tracking-tighter">GD</span>
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-none mb-1">{title}</h2>
          <p className="text-emerald-600 font-black text-[9px] uppercase tracking-[0.2em]">{subtitle}</p>
        </div>
      </div>
      <button 
        type="button"
        onClick={onClose}
        className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-all active:scale-90"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-emerald-50 max-h-[90vh] overflow-y-auto">
        <div className="p-8 md:p-12">
          {viewMode !== 'choice' && (
            <button 
              type="button"
              onClick={() => setViewMode('choice')}
              className="group flex items-center space-x-2 mb-6 px-3 py-1.5 rounded-full bg-slate-50 text-slate-500 hover:text-emerald-600 transition-all active:scale-95"
            >
              <i className="fas fa-arrow-left text-xs"></i>
              <span className="text-[10px] font-bold uppercase tracking-widest">Back to options</span>
            </button>
          )}

          {viewMode === 'choice' && (
            <>
              {renderHeader("Get Started", "Choose your path to GashaDrift")}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Returning User */}
                <button 
                  type="button"
                  onClick={() => setViewMode('login')}
                  className="group relative flex flex-col items-center text-center p-8 rounded-[2rem] border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 active:scale-[0.97]"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 text-2xl mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm">
                    <i className="fas fa-user-check"></i>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Returning Customer</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Already registered? Log in to your account.</p>
                  <div className="mt-6 flex items-center text-emerald-600 font-bold text-xs">
                    <span>Login</span>
                    <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </button>

                {/* New User - CREATE ACCOUNT */}
                <button 
                  type="button"
                  onClick={() => setViewMode('register')}
                  className="group relative flex flex-col items-center text-center p-8 rounded-[2rem] border-2 border-emerald-500 bg-emerald-50/30 hover:bg-emerald-50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 active:scale-[0.97]"
                >
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-emerald-200">
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">New Customer</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Join the GashaDrift family and start renting today.</p>
                  <div className="mt-6 flex items-center text-emerald-700 font-black text-xs bg-white px-4 py-2 rounded-full shadow-sm">
                    <span>Create Account</span>
                    <i className="fas fa-sparkles ml-2"></i>
                  </div>
                </button>

                {/* Admin Portal */}
                <button 
                  type="button"
                  onClick={() => setViewMode('adminLogin')}
                  className="group relative flex flex-col items-center text-center p-8 rounded-[2rem] border-2 border-slate-100 hover:border-slate-800 hover:bg-slate-50 transition-all duration-300 hover:shadow-xl hover:shadow-slate-500/10 hover:-translate-y-1 active:scale-[0.97]"
                >
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 text-2xl mb-6 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 shadow-sm">
                    <i className="fas fa-user-shield"></i>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Staff Portal</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Fleet management and system administrative tools.</p>
                  <div className="mt-6 flex items-center text-slate-800 font-bold text-xs">
                    <span>Admin Login</span>
                    <i className="fas fa-lock ml-2"></i>
                  </div>
                </button>
              </div>
            </>
          )}

          {(viewMode === 'login' || viewMode === 'adminLogin') && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-md mx-auto">
              {renderHeader(viewMode === 'adminLogin' ? "Admin Access" : "Welcome Back", "Secure Authentication")}
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name / Email</label>
                  <div className="relative">
                    <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                    <input 
                      required 
                      placeholder="Enter your name" 
                      className={inputClasses + " pl-11"}
                      value={loginData.name}
                      onChange={e => setLoginData({...loginData, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                    <input 
                      required 
                      type="password"
                      placeholder="••••••••" 
                      className={inputClasses + " pl-11"}
                      value={loginData.password}
                      onChange={e => setLoginData({...loginData, password: e.target.value})}
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center"
                >
                  {isLoading ? (
                    <><i className="fas fa-circle-notch fa-spin mr-2"></i>Authenticating...</>
                  ) : 'Sign In'}
                </button>
                {viewMode === 'login' && (
                  <div className="text-center mt-6">
                    <p className="text-sm text-slate-400">
                      New to GashaDrift? <button type="button" onClick={() => setViewMode('register')} className="text-emerald-500 font-bold cursor-pointer hover:underline focus:outline-none">Create an account</button>
                    </p>
                  </div>
                )}
              </form>
            </div>
          )}

          {viewMode === 'register' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              {renderHeader("Join the Fleet", "Apply for GashaDrift Premium Membership")}
              <form onSubmit={handleRegisterSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                    <input required className={inputClasses} value={regData.name} onChange={e => setRegData({...regData, name: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                    <input required type="email" className={inputClasses} value={regData.email} onChange={e => setRegData({...regData, email: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                    <input required className={inputClasses} value={regData.phone} onChange={e => setRegData({...regData, phone: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Create Password</label>
                    <input required type="password" placeholder="Min. 8 characters" className={inputClasses} value={regData.password} onChange={e => setRegData({...regData, password: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verification (Kebele ID Photo)</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="kebele-photo" required />
                      <label 
                        htmlFor="kebele-photo" 
                        className={`flex items-center justify-center w-full p-4 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                          regData.kebelePhoto ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-slate-200 text-slate-500 hover:border-emerald-400 hover:bg-emerald-50 bg-white'
                        }`}
                      >
                        <i className={`fas ${regData.kebelePhoto ? 'fa-check-circle' : 'fa-id-card'} mr-2`}></i>
                        {regData.kebelePhoto ? 'ID Document Attached' : 'Upload Kebele ID / Passport'}
                      </label>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center"
                >
                  {isLoading ? (
                    <><i className="fas fa-circle-notch fa-spin mr-2"></i>Processing...</>
                  ) : 'Complete Application'}
                </button>
                <div className="text-center">
                  <p className="text-sm text-slate-400">
                    Already a member? <button type="button" onClick={() => setViewMode('login')} className="text-emerald-500 font-bold cursor-pointer hover:underline focus:outline-none">Log in here</button>
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
        
        {/* Bottom Bar Accent */}
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-600 w-full"></div>
      </div>
    </div>
  );
};

export default LoginPage;
