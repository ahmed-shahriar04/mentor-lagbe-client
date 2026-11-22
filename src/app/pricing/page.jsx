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
          <div className="bg-white rounded-3xl p-8 border-2 border-blue-500 shadow-xl shadow-blue-500/10 flex flex-col justify-between hover:shadow-2xl transition relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-extrabold px-3.5 py-1 rounded-bl-xl uppercase tracking-wider">
              STUDENT RECOMMENDED
            </div>
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
                  <span><strong>Unlimited Bookmarks</strong> (No 5-item limit)</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 font-bold mr-2">✓</span>
                  <span>Priority application review queue</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 font-bold mr-2">✓</span>
                  <span>Direct contact information access</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 font-bold mr-2">✓</span>
                  <span>Verified Student Pro Status Badge</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-600 font-bold mr-2">✓</span>
                  <span>Early notification for new matching batches</span>
                </div>
              </div>
            </div>

            <div className="mt-10">
              {isPro && user?.role === 'student' ? (
                <div className="w-full py-3.5 px-4 text-center text-sm font-bold text-blue-800 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center space-x-2 shadow-sm select-none">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Already Taken (Active Plan)</span>
                </div>
              ) : (
                <button
                  onClick={() => handleUpgrade('student')}
                  disabled={loadingRole !== null}
                  className="w-full py-3.5 px-4 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-md shadow-blue-500/25 disabled:opacity-50 cursor-pointer"
                >
                  {loadingRole === 'student' ? 'Connecting to Stripe...' : 'Upgrade Student ($10)'}
                </button>
              )}
            </div>
          </div>

          {/* Card 3: Pro Tutor Plan (Featured) */}
          <div className="bg-white rounded-3xl p-8 border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 flex flex-col justify-between relative overflow-hidden transform lg:-translate-y-2">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-extrabold px-3.5 py-1 rounded-bl-xl uppercase tracking-wider">
              VERIFIED MENTOR TIER
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
                  <span><strong>Unlimited Tuition Posts</strong> (No 2-post limit)</span>
                </div>
                <div className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  <span>Verified Pro Tutor Badge on all cards</span>
                </div>
                <div className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  <span>Direct applicant review & management</span>
                </div>
                <div className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  <span>Priority featured placement on Browse Tuitions</span>
                </div>
                <div className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  <span>Full student reviews & ratings access</span>
                </div>
              </div>
            </div>

            <div className="mt-10">
              {isPro && user?.role === 'tutor' ? (
                <div className="w-full py-3.5 px-4 text-center text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center space-x-2 shadow-sm select-none">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Already Taken (Active Plan)</span>
                </div>
              ) : (
                <button
                  onClick={() => handleUpgrade('tutor')}
                  disabled={loadingRole !== null}
                  className="w-full py-3.5 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-600/30 transition disabled:opacity-50 cursor-pointer"
                >
                  {loadingRole === 'tutor' ? 'Connecting to Stripe...' : 'Upgrade Pro Tutor ($15)'}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
