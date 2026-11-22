'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const res = await api.getAllUsers();
      if (res.success) setUsers(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.updateUserRole(userId, newRole);
      toast.success(`User role updated to ${newRole}`);
      loadUsers();
    } catch (err) {
      toast.error(err.message || 'Failed to update role');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
          User Management
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          View all registered users and assign role permissions ('student', 'tutor', 'admin').
        </p>
      </div>

      {loading ? (
        <div className="h-64 bg-white rounded-2xl animate-pulse"></div>
      ) : users.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold">
                <tr>
                  <th className="px-5 py-3.5">User</th>
                  <th className="px-5 py-3.5">Email</th>
                  <th className="px-5 py-3.5">Plan</th>
                  <th className="px-5 py-3.5">Current Role</th>
                  <th className="px-5 py-3.5 text-right">Assign Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-semibold text-slate-800 flex items-center space-x-2.5">
                      <img
                        src={u.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=80&auto=format&fit=crop'}
                        alt={u.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span>{u.name}</span>
                    </td>
                    <td className="px-5 py-4 font-mono">{u.email}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        u.plan === 'pro' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {u.plan || 'free'}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-bold uppercase text-slate-700">{u.role}</td>
                    <td className="px-5 py-4 text-right">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        className="px-2.5 py-1 text-xs border rounded-lg bg-slate-50 font-semibold"
                      >
                        <option value="student">student</option>
                        <option value="tutor">tutor</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-500">No registered users found.</p>
        </div>
      )}
    </div>
  );
}
