'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function TutorOverviewPage() {
  const [stats, setStats] = useState({ totalPosted: 0, activeApproved: 0, totalApplicants: 0, currentPlan: 'free' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getTutorStats();
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
          Tutor Management Portal
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading mt-1">
          Mentor Overview
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your tuition listings, incoming student applications, and Pro subscription.
        </p>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Total Tuitions Posted</p>
          <p className="text-3xl font-extrabold text-slate-900 font-heading mt-2">{stats.totalPosted}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Active / Approved</p>
          <p className="text-3xl font-extrabold text-emerald-600 font-heading mt-2">{stats.activeApproved}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Total Applicants</p>
          <p className="text-3xl font-extrabold text-blue-600 font-heading mt-2">{stats.totalApplicants}</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Current Plan</p>
          <div className="flex items-center space-x-2 mt-2">
            {stats.currentPlan === 'pro' ? (
              <>
                <img src="/pro-badge.svg" alt="Pro Badge" className="w-6 h-6" />
                <span className="text-xl font-extrabold text-blue-600 font-heading">PRO MENTOR</span>
              </>
            ) : (
              <span className="text-xl font-extrabold text-slate-700 font-heading">FREE PLAN</span>
            )}
          </div>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 font-heading">Ready to open a new batch?</h3>
          <p className="text-xs text-slate-500 mt-0.5">Free tutors can post up to 2 batches; Pro tutors enjoy unlimited listings.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/tutor/post-tuition" className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow transition">
            Post New Tuition
          </Link>
          <Link href="/dashboard/tutor/applicants" className="px-5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition">
            View Applicants
          </Link>
        </div>
      </div>
    </div>
  );
}
