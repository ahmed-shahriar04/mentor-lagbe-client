'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { getStoredAuth } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getStoredAuth();
    setUser(auth?.user || null);
  }, []);

  const handleUpgrade = async (targetRole) => {
    if (!user) {
      toast.error('Please sign in first to upgrade your plan');
      return router.push('/sign-in');
    }

    setLoading(true);
    try {
      const res = await api.createCheckoutSession();
      if (res.success && res.url) {
        window.location.href = res.url;
      } else {
        toast.error('Failed to create Stripe checkout session');
      }
    } catch (err) {
      toast.error(err.message || 'Stripe checkout error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
            Simple & Transparent Pricing
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-heading mt-2">
            Upgrade to MentorLagbe Pro
          </h1>
          <p className="text-base text-slate-600 mt-3">
            Choose the right tier to maximize your mentorship reach or unlock priority admission bookings.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Pro Tutor Card */}
          <div className="bg-white rounded-3xl p-8 border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[11px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
              For Tutors
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 font-heading">
                Pro Tutor Plan
              </h3>
              <p className="text-xs text-slate-500 mt-1">For serious educators and coaching batch mentors</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-extrabold text-slate-900 font-heading">$15</span>
                <span className="text-slate-500 text-sm ml-2">/ one-time</span>
              </div>

              <div className="mt-8 space-y-3.5 text-xs text-slate-600 border-t border-slate-100 pt-6">
                <div className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  <strong>Unlimited Tuition Posts</strong> (Free tutors: max 2 posts)
                </div>
                <div className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  Verified Tutor Badge on every tuition card
                </div>
                <div className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  Direct student applicant management
                </div>
                <div className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  Featured search placement on Browse Tuitions
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={() => handleUpgrade('tutor')}
                disabled={loading}
                className="w-full py-3.5 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-600/30 transition disabled:opacity-50"
              >
                {loading ? 'Opening Stripe...' : 'Upgrade Pro Tutor ($15)'}
              </button>
            </div>
          </div>

          {/* Pro Student Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider font-heading">
                For Students
              </span>
              <h3 className="text-2xl font-bold text-slate-900 font-heading mt-1">
                Pro Student Plan
              </h3>
              <p className="text-xs text-slate-500 mt-1">Unlock seamless booking and favorite tuitions</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-extrabold text-slate-900 font-heading">$10</span>
                <span className="text-slate-500 text-sm ml-2">/ one-time</span>
              </div>

              <div className="mt-8 space-y-3.5 text-xs text-slate-600 border-t border-slate-100 pt-6">
                <div className="flex items-center">
                  <span className="text-blue-600 font-bold mr-2">✓</span>
                  <strong>Unlimited Bookmarks</strong> (Free students: max 5 saved)
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
                  Pro Student Badge on applications
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={() => handleUpgrade('student')}
                disabled={loading}
                className="w-full py-3.5 px-4 text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition disabled:opacity-50"
              >
                {loading ? 'Opening Stripe...' : 'Upgrade Pro Student ($10)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
