'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { getStoredAuth, setStoredAuth } from '@/lib/auth-client';

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
    // 1. Optimistic UI update so the select value and badges change instantaneously
    const prevUsers = [...users];
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
    );

    try {
      const res = await api.updateUserRole(userId, newRole);
      toast.success(res?.message || `User role updated to ${newRole.toUpperCase()} successfully!`, {
        duration: 3500,
      });

      // If current logged in admin updated their own role, synchronize local storage auth session
      const auth = getStoredAuth();
      const targetUser = prevUsers.find((u) => u._id === userId);
      if (auth?.user && (auth.user._id === userId || auth.user.email === targetUser?.email)) {
        auth.user.role = newRole;
        setStoredAuth(auth);
      }

      // Re-fetch to ensure database state is completely synced
      await loadUsers();
    } catch (err) {
      setUsers(prevUsers);
      toast.error(err.message || 'Failed to update role');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    const confirm = window.confirm(`Are you sure you want to remove user "${userName}"?`);
    if (!confirm) return;

    try {
      await api.deleteUser(userId);
      toast.success(`User ${userName} removed successfully`);
      loadUsers();
    } catch (err) {
      toast.error(err.message || 'Failed to delete user');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
          User Management
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          View all registered users, assign role permissions ('student', 'tutor', 'admin'), or remove accounts.
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
                  <th className="px-5 py-3.5">Assign Role</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-semibold text-slate-800 flex items-center space-x-2.5">
                      <img
                        src={u.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || 'User')}&background=059669&color=fff&bold=true`}
                        alt={u.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || 'User')}&background=059669&color=fff&bold=true`;
                        }}
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
                    <td className="px-5 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        u.role === 'admin'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : u.role === 'tutor'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition hover:border-slate-400"
                      >
                        <option value="student">Student</option>
                        <option value="tutor">Tutor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleDeleteUser(u._id, u.name)}
                        className="px-2.5 py-1 text-[11px] font-bold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-200 rounded-lg transition"
                      >
                        Delete
                      </button>
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
