import React from 'react';

interface AdminContact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  avatar?: string;
}

const ADMINS: AdminContact[] = [
  {
    id: 'a1',
    name: 'Abenezer Mengesha',
    role: 'Customer Support & Admin',
    email: 'abenezermengesha6@gmail.com',
    phone: '+251923139919',
  },
];

interface Props {
  onBack: () => void;
}

const Support: React.FC<Props> = ({ onBack }) => {
  const isSingle = ADMINS.length === 1;

  return (
  <div className="w-full max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Support & Contact</h1>
          <p className="text-slate-500 mt-1">Reach out to our admins for account, booking, or technical help.</p>
        </div>
        <div>
          <button onClick={onBack} className="bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-emerald-600">Back</button>
        </div>
      </div>

      {isSingle ? (
        <div className="flex justify-center">
          {ADMINS.map(admin => (
            <div key={admin.id} className="w-full max-w-md border rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xl mb-3">
                {admin.name.split(' ').map(n => n[0]).slice(0,2).join('')}
              </div>
              <div className="font-extrabold text-slate-900 text-xl">{admin.name}</div>
              <div className="text-sm text-slate-500 mb-2">{admin.role}</div>
              <a href={`mailto:${admin.email}`} className="text-emerald-600 text-sm font-medium hover:underline">{admin.email}</a>
              {admin.phone && <div className="text-slate-500 text-sm mt-2">{admin.phone}</div>}
              <div className="mt-4 flex space-x-3">
                <a href={`mailto:${admin.email}`} className="px-3 py-2 text-sm bg-emerald-50 text-emerald-700 rounded-md font-semibold">Email</a>
                {admin.phone && <a href={`tel:${admin.phone}`} className="px-3 py-2 text-sm bg-slate-50 text-slate-700 rounded-md font-semibold">Call</a>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
          {ADMINS.map(admin => (
            <div key={admin.id} className="border rounded-2xl p-3 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg mb-2">
                {admin.name.split(' ').map(n => n[0]).slice(0,2).join('')}
              </div>
              <div className="font-bold text-slate-900 text-lg">{admin.name}</div>
              <div className="text-sm text-slate-500 mb-1">{admin.role}</div>
              <a href={`mailto:${admin.email}`} className="text-emerald-600 text-sm font-medium hover:underline">{admin.email}</a>
              {admin.phone && <div className="text-slate-500 text-sm mt-1">{admin.phone}</div>}
              <div className="mt-3 flex space-x-2">
                <a href={`mailto:${admin.email}`} className="px-2 py-1 text-sm bg-emerald-50 text-emerald-700 rounded-md font-semibold">Email</a>
                {admin.phone && <a href={`tel:${admin.phone}`} className="px-2 py-1 text-sm bg-slate-50 text-slate-700 rounded-md font-semibold">Call</a>}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-slate-500">
        <h3 className="font-bold text-slate-900 mb-2">How we handle support</h3>
        <p>
          Our team aims to respond within 24 hours for general inquiries and within 2 hours for urgent issues. For booking-related problems, please include your reservation ID and preferred contact method.
        </p>
      </div>
    </div>
  );
};

export default Support;
