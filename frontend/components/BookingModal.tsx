
import React, { useState } from 'react';
import { Vehicle, SearchParams } from '../types';

interface Props {
  vehicle: Vehicle;
  params: SearchParams;
  onClose: () => void;
  onConfirm: (data: any) => void;
}

const BookingModal: React.FC<Props> = ({ vehicle, params, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    kebeleId: '',
    transactionId: '',
    screenshot: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalDays = Math.max(1, Math.ceil((new Date(params.endDate).getTime() - new Date(params.startDate).getTime()) / (1000 * 3600 * 24)));
  const totalAmount = totalDays * vehicle.pricePerDay;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, screenshot: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate processing
    setTimeout(() => {
      onConfirm(formData);
      setIsSubmitting(false);
    }, 1500);
  };

  const inputClasses = "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-emerald-600 font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-slate-300 text-sm";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row min-h-full">
          {/* Sidebar Info */}
          <div className="md:w-5/12 bg-emerald-600 p-8 text-white flex flex-col">
            <button 
              onClick={onClose} 
              className="group flex items-center space-x-2 mb-6 px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all active:scale-95 w-fit"
            >
              <i className="fas fa-arrow-left text-xs"></i>
              <span className="text-[10px] font-bold uppercase tracking-widest">Back</span>
            </button>
            <h2 className="text-3xl font-extrabold mb-4 leading-tight">{vehicle.make} {vehicle.model}</h2>
            <div className="relative mb-6">
              <img src={vehicle.image} className="w-full h-36 object-cover rounded-xl shadow-xl border border-white/20" alt="Selected Car" />
              <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/20 uppercase">
                {vehicle.type}
              </div>
            </div>
            
            <div className="space-y-3 mt-auto">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Duration</span>
                <span className="font-bold text-sm">{totalDays} Day{totalDays > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Location</span>
                <span className="font-bold text-sm truncate max-w-[120px]">{params.location.split(' ')[0]}</span>
              </div>
              <div className="pt-4">
                <p className="text-[10px] uppercase font-bold text-emerald-100/60 mb-1">Total Amount Due</p>
                <p className="text-3xl font-black">{totalAmount} Birr</p>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="md:w-7/12 p-8 bg-slate-50/50">
            <h3 className="text-xl font-bold mb-6 text-slate-800 flex items-center">
              <i className="fas fa-file-invoice-dollar mr-3 text-emerald-500"></i>
              Verification Details
            </h3>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input 
                    required
                    className={inputClasses}
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                  <input 
                    required
                    className={inputClasses}
                    type="tel"
                    placeholder="+251 ..."
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kebele ID Number</label>
                  <input 
                    required
                    className={inputClasses}
                    type="text"
                    placeholder="e.g. AA-01-XXXXX"
                    value={formData.kebeleId}
                    onChange={e => setFormData({...formData, kebeleId: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaction Ref ID</label>
                  <input 
                    required
                    className={inputClasses}
                    type="text"
                    placeholder="Reference from Bank/CBE Birr"
                    value={formData.transactionId}
                    onChange={e => setFormData({...formData, transactionId: e.target.value})}
                  />
                </div>
              </div>

              {/* Screenshot Upload */}
              <div className="space-y-2 mt-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaction Screenshot</label>
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="payment-screenshot" required />
                    <label 
                      htmlFor="payment-screenshot" 
                      className={`flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                        formData.screenshot ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-slate-200 text-slate-400 hover:border-emerald-300 hover:bg-white bg-white'
                      }`}
                    >
                      <i className={`fas ${formData.screenshot ? 'fa-check-circle' : 'fa-camera'} text-xl mb-1`}></i>
                      <span className="text-[10px] font-bold uppercase">{formData.screenshot ? 'Image Attached' : 'Upload Receipt'}</span>
                    </label>
                  </div>
                  {formData.screenshot && (
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                      <img src={formData.screenshot} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-[0.98] flex items-center justify-center disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-circle-notch fa-spin mr-2"></i>
                      Verifying...
                    </>
                  ) : 'Submit Reservation'}
                </button>
              </div>

              <p className="text-[9px] text-center text-slate-400 leading-relaxed">
                By submitting, our team will verify the transaction ID <b>{formData.transactionId || '...'}</b> against your Kebele ID before confirming pickup.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
