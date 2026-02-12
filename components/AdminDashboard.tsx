
import React, { useState, useEffect } from 'react';
import { BookingRecord, User } from '../types';
import { MOCK_CARS, Icons } from '../constants';

interface AdminDashboardProps {
  bookings: BookingRecord[];
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ bookings, onExit }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'shops' | 'bookings'>('shops');

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('ds_users') || '[]');
    setUsers(savedUsers);
  }, []);

  const handleUpdateStatus = (userId: string, status: User['shopStatus']) => {
    const updatedUsers = users.map(u => u.id === userId ? { ...u, shopStatus: status } : u);
    setUsers(updatedUsers);
    localStorage.setItem('ds_users', JSON.stringify(updatedUsers));
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);
  const shopApplications = users.filter(u => u.role === 'merchant');

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">Platform Authority</span>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Master Console.</h1>
          </div>
          <div className="flex gap-4">
             <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex">
                <button 
                  onClick={() => setActiveTab('shops')}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'shops' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  Manage Shops
                </button>
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'bookings' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  Global Bookings
                </button>
             </div>
             <button 
                onClick={onExit}
                className="bg-white border-2 border-slate-100 text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-slate-900 shadow-sm transition-all"
              >
                Exit
              </button>
          </div>
        </div>

        {activeTab === 'shops' ? (
          <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
            {/* Merchant Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Shops</p>
                <h4 className="text-4xl font-black text-slate-900">{shopApplications.length}</h4>
                <div className="mt-4 flex gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase rounded-full">Active Partners</span>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Pending Approval</p>
                <h4 className="text-4xl font-black text-amber-500">{shopApplications.filter(u => u.shopStatus === 'pending').length}</h4>
                <div className="mt-4 flex gap-2">
                  <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[9px] font-black uppercase rounded-full">New Applications</span>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Fleet Cars</p>
                <h4 className="text-4xl font-black text-emerald-500">{MOCK_CARS.length}</h4>
                <div className="mt-4 flex gap-2">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase rounded-full">In Service</span>
                </div>
              </div>
            </div>

            {/* Merchant Management Table */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
              <div className="p-10 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-2xl font-black text-slate-900">Shop Owners Setup</h3>
                <p className="text-slate-400 font-bold text-sm">Configure users who want to run a booking shop</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      {['Vendor Name', 'Email', 'Shop ID', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {shopApplications.length > 0 ? shopApplications.map((shop) => (
                      <tr key={shop.id} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-10 py-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black italic shadow-lg">
                              {shop.name.charAt(0)}
                            </div>
                            <span className="font-black text-slate-900 text-lg">{shop.name}</span>
                          </div>
                        </td>
                        <td className="px-10 py-8 font-bold text-slate-500">{shop.email}</td>
                        <td className="px-10 py-8 font-mono text-[10px] text-slate-400">{shop.id}</td>
                        <td className="px-10 py-8">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            shop.shopStatus === 'active' ? 'bg-emerald-100 text-emerald-600' : 
                            shop.shopStatus === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                          }`}>
                            {shop.shopStatus || 'unconfigured'}
                          </span>
                        </td>
                        <td className="px-10 py-8">
                          <div className="flex gap-2">
                            {shop.shopStatus !== 'active' && (
                              <button 
                                onClick={() => handleUpdateStatus(shop.id, 'active')}
                                className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-[9px] font-black uppercase hover:bg-emerald-600 transition-all shadow-md"
                              >
                                Activate Shop
                              </button>
                            )}
                            {shop.shopStatus === 'active' && (
                              <button 
                                onClick={() => handleUpdateStatus(shop.id, 'suspended')}
                                className="px-4 py-2 bg-rose-500 text-white rounded-xl text-[9px] font-black uppercase hover:bg-rose-600 transition-all shadow-md"
                              >
                                Suspend
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-10 py-24 text-center">
                          <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No shop applications found yet.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
            <div className="p-10 border-b border-slate-100">
              <h3 className="text-2xl font-black text-slate-900">System Revenue Feed</h3>
              <p className="text-slate-400 font-bold text-sm">Monitoring global transactions across all shops</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    {['Shop Item', 'Customer', 'Date', 'Revenue', 'Status'].map(h => (
                      <th key={h} className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-10 py-8 font-black text-slate-900">{b.carName}</td>
                      <td className="px-10 py-8">
                        <p className="font-black text-slate-900 text-sm">{b.userName}</p>
                        <p className="text-slate-400 text-xs font-bold">{b.userEmail}</p>
                      </td>
                      <td className="px-10 py-8 text-sm text-slate-500 font-bold">{b.date}</td>
                      <td className="px-10 py-8 font-black text-blue-600">RM {b.price}</td>
                      <td className="px-10 py-8">
                        <span className="px-4 py-1.5 bg-emerald-100 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-full">Settled</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
