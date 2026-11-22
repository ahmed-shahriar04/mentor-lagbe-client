'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function StudentOverviewPage() {
  const [stats, setStats] = useState({ totalApplied: 0, accepted: 0, pending: 0, currentPlan: 'free' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getStudentStats();
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
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
          Student Dashboard
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading mt-1">
          Academic Overview
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitor your tuition batch applications and mentorship status.
        </p>
      </div>

      {/* 4 Reusable Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Total Applied Tuitions</p>
          <p className="text-3xl font-extrabold text-slate-900 font-heading mt-2">{stats.totalApplied}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Accepted Applications</p>
          <p className="text-3xl font-extrabold text-emerald-600 font-heading mt-2">{stats.accepted}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Pending Review</p>
          <p className="text-3xl font-extrabold text-amber-600 font-heading mt-2">{stats.pending}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Current Membership</p>
          <p className="text-2xl font-extrabold text-blue-600 font-heading mt-2 uppercase">{stats.currentPlan} PLAN</p>
        </div>
      </div>

      {/* Quick Action Links */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 font-heading">Looking for more subject tutors?</h3>
          <p className="text-xs text-slate-500 mt-0.5">Explore hundreds of verified courses in Math, Physics, IELTS, and Programming.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/tuitions" className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow transition">
            Browse Batches
          </Link>
          <Link href="/dashboard/student/my-applications" className="px-5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition">
            My Applications
          </Link>
        </div>
      </div>
    </div>
  );
}
