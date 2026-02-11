
import React from 'react';
import { BookingRecord, Car } from '../types';
import { MOCK_CARS, Icons } from '../constants';

interface AdminDashboardProps {
  bookings: BookingRecord[];
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ bookings, onExit }) => {
  const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">Management Console</span>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Admin Dashboard.</h1>
          </div>
          <button 
            onClick={onExit}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 shadow-xl transition-all"
          >
            Exit Admin Mode
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Bookings', value: bookings.length, icon: '📈', color: 'bg-emerald-50 text-emerald-600' },
            { label: 'Total Revenue', value: `RM ${totalRevenue.toLocaleString()}`, icon: '💰', color: 'bg-amber-50 text-amber-600' },
            { label: 'Active Fleet', value: MOCK_CARS.length, icon: '🚗', color: 'bg-blue-50 text-blue-600' },
            { label: 'Users Count', value: JSON.parse(localStorage.getItem('ds_users') || '[]').length, icon: '👥', color: 'bg-purple-50 text-purple-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-xl mb-4`}>
                {stat.icon}
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
              <h4 className="text-3xl font-black text-slate-900">{stat.value}</h4>
            </div>
          ))}
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-xl font-black text-slate-900">Recent Reservations</h3>
            <span className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">Real-time Feed</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  {['Car', 'Customer', 'Date', 'Amount', 'Status'].map(h => (
                    <th key={h} className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bookings.length > 0 ? bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-8 py-6 font-bold text-slate-900">{b.carName}</td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-900 text-sm">{b.userName}</p>
                      <p className="text-slate-400 text-xs">{b.userEmail}</p>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-500 font-medium">{b.date}</td>
                    <td className="px-8 py-6 font-black text-slate-900">RM {b.price}</td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-full">Confirmed</span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No active bookings yet.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
