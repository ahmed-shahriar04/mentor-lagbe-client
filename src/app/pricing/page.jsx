'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { getStoredAuth } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PricingPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loadingRole, setLoadingRole] = useState(null);

  useEffect(() => {
    const auth = getStoredAuth();
    setUser(auth?.user || null);
  }, []);

  const handleUpgrade = async (targetRole) => {
    if (!user) {
      toast.error('Please sign in first to upgrade your plan');
      return router.push('/sign-in');
    }

    // Role check to ensure student upgrades student plan, tutor upgrades tutor plan
    if (user.role === 'student' && targetRole === 'tutor') {
      return toast.error('You are registered as a Student. Please choose the Pro Student Plan ($10).');
    }
    if (user.role === 'tutor' && targetRole === 'student') {
      return toast.error('You are registered as a Tutor. Please choose the Pro Tutor Plan ($15).');
    }

    setLoadingRole(targetRole);
    try {
      // Pass the selected planType explicitly ('tutor' or 'student')
      const res = await api.createCheckoutSession({ planType: targetRole });
      if (res.success && res.url) {
        window.location.href = res.url;
      } else {
        toast.error('Failed to create Stripe checkout session');
      }
    } catch (err) {
      toast.error(err.message || 'Stripe checkout error');
    } finally {
      setLoadingRole(null);
    }
  };

  const isPro = user?.plan === 'pro';

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
            Simple & Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading mt-2">
            Upgrade to MentorLagbe Pro
          </h1>
          <p className="text-base text-slate-600 mt-3">
            Choose the right tier to maximize your mentorship reach or unlock priority admission bookings.
          </p>
        </div>

        {/* 3 Balanced Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Card 1: Free Starter Plan */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">
                For Everyone
              </span>
              <h3 className="text-2xl font-bold text-slate-900 font-heading mt-1">
                Starter Plan
              </h3>
              <p className="text-xs text-slate-500 mt-1">Perfect for getting started with basic tuition search</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-extrabold text-slate-900 font-heading">$0</span>
                <span className="text-slate-500 text-sm ml-2">/ free forever</span>
              </div>

              <div className="mt-8 space-y-3.5 text-xs text-slate-600 border-t border-slate-100 pt-6">
                <div className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  Up to <strong>2 Tuition Posts</strong> (For Tutors)
                </div>
                <div className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  Up to <strong>5 Saved Bookmarks</strong> (For Students)
                </div>
                <div className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  Public Browse & Search Access
                </div>
                <div className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  Standard Application Submission
                </div>
                <div className="flex items-center text-slate-400">
                  <span className="text-slate-300 font-bold mr-2">✕</span>
                  No Verified Badge
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="w-full py-3.5 px-4 text-center text-sm font-bold text-slate-500 bg-slate-100 rounded-xl border border-slate-200">
                {!isPro ? 'Current Basic Plan' : 'Free Tier'}
              </div>
            </div>
          </div>

          {/* Card 2: Pro Student Plan */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md flex flex-col justify-between hover:shadow-xl transition relative">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider font-heading">
                For Students
              </span>
              <h3 className="text-2xl font-bold text-slate-900 font-heading mt-1">
                Pro Student Plan
              </h3>
              <p className="text-xs text-slate-500 mt-1">Unlock seamless booking and favorite tuitions</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-extrabold text-slate-900 font-heading">$10</span>
                <span className="text-slate-500 text-sm ml-2">/ one-time upgrade</span>
              </div>

              <div className="mt-8 space-y-3.5 text-xs text-slate-600 border-t border-slate-100 pt-6">
                <div className="flex items-center">
                  <span className="text-blue-600 font-bold mr-2">✓</span>
                  <strong>Unlimited Bookmarks</strong> (No 5-item limit)
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 font-bold mr-2">✓</span>
                  Priority application review queue
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 font-bold mr-2">✓</span>
                  Direct contact information access
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 font-bold mr-2">✓</span>
                  Verified Student Pro Status Badge
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 font-bold mr-2">✓</span>
                  Early notification for new matching batches
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={() => handleUpgrade('student')}
                disabled={loadingRole !== null}
                className="w-full py-3.5 px-4 text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition shadow-sm disabled:opacity-50"
              >
                {loadingRole === 'student' ? 'Connecting to Stripe...' : 'Upgrade Student ($10)'}
              </button>
            </div>
          </div>

          {/* Card 3: Pro Tutor Plan (Featured) */}
          <div className="bg-white rounded-3xl p-8 border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 flex flex-col justify-between relative overflow-hidden transform lg:-translate-y-2">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[11px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-heading">
                For Educators
              </span>
              <h3 className="text-2xl font-bold text-slate-900 font-heading mt-1">
                Pro Tutor Plan
              </h3>
              <p className="text-xs text-slate-500 mt-1">For serious educators and coaching batch mentors</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-extrabold text-slate-900 font-heading">$15</span>
                <span className="text-slate-500 text-sm ml-2">/ one-time upgrade</span>
              </div>

              <div className="mt-8 space-y-3.5 text-xs text-slate-600 border-t border-slate-100 pt-6">
                <div className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  <strong>Unlimited Tuition Posts</strong> (No 2-post limit)
                </div>
                <div className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  Verified Pro Tutor Badge on all cards
                </div>
                <div className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  Direct applicant review & management
                </div>
                <div className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  Priority featured placement on Browse Tuitions
                </div>
                <div className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  Full student reviews & ratings access
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={() => handleUpgrade('tutor')}
                disabled={loadingRole !== null}
                className="w-full py-3.5 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-600/30 transition disabled:opacity-50"
              >
                {loadingRole === 'tutor' ? 'Connecting to Stripe...' : 'Upgrade Pro Tutor ($15)'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
