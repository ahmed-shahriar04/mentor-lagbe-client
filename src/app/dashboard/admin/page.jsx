'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faShieldAlt, faCreditCard } from '@fortawesome/free-solid-svg-icons';


import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTutors: 0,
    approvedTuitions: 0,
    pendingTuitions: 0,
    totalRevenue: 0,
    totalTransactions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getAdminStats();
        if (res.success && res.data) setStats(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600 font-heading">
          Platform Administration
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading mt-1">
          Admin Dashboard
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor platform metrics, user roles, tuition moderation, and Stripe revenue.
        </p>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Total Registered Users</p>
          <p className="text-3xl font-extrabold text-slate-900 font-heading mt-2">{stats.totalUsers}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Total Verified Tutors</p>
          <p className="text-3xl font-extrabold text-blue-600 font-heading mt-2">{stats.totalTutors}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Pending vs Approved Tuitions</p>
          <p className="text-2xl font-extrabold text-slate-900 font-heading mt-2">
            <span className="text-amber-600">{stats.pendingTuitions}</span> / <span className="text-emerald-600">{stats.approvedTuitions}</span>
          </p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Total Stripe Revenue</p>
          <p className="text-3xl font-extrabold text-emerald-600 font-heading mt-2">${stats.totalRevenue}</p>
        </div>
      </div>

      {/* Management Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          href="/dashboard/admin/users"
          className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-purple-300 transition shadow-sm group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center"><FontAwesomeIcon icon={faUsers} className="w-5 h-5" /></div>
          <h4 className="text-base font-bold text-slate-900 font-heading mt-2 group-hover:text-purple-600">
            User Management
          </h4>
          <p className="text-xs text-slate-500 mt-1">Change user roles between student, tutor, and admin.</p>
        </Link>
        <Link
          href="/dashboard/admin/tuitions"
          className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 transition shadow-sm group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><FontAwesomeIcon icon={faShieldAlt} className="w-5 h-5" /></div>
          <h4 className="text-base font-bold text-slate-900 font-heading mt-2 group-hover:text-emerald-600">
            Tuition Moderation
          </h4>
          <p className="text-xs text-slate-500 mt-1">Review pending tuition batches and approve or reject.</p>
        </Link>
        <Link
          href="/dashboard/admin/transactions"
          className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition shadow-sm group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><FontAwesomeIcon icon={faCreditCard} className="w-5 h-5" /></div>
          <h4 className="text-base font-bold text-slate-900 font-heading mt-2 group-hover:text-blue-600">
            Stripe Transactions
          </h4>
          <p className="text-xs text-slate-500 mt-1">Inspect all Pro plan subscription upgrade receipts.</p>
        </Link>
      </div>
    </div>
  );
}