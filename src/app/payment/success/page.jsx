'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { getStoredAuth, setStoredAuth } from '@/lib/auth-client';
import confetti from 'canvas-confetti';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}

    async function verify() {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.verifySession(sessionId);
        if (res.success && res.payment) {
          setPayment(res.payment);
          // Update stored auth to Pro
          const auth = getStoredAuth();
          if (auth && auth.user) {
            auth.user.plan = 'pro';
            setStoredAuth(auth);
          }
        }
      } catch (err) {
        console.error('Session verify error:', err);
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [sessionId]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
          ✓
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
          Payment Successful
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading mt-1">
          Welcome to MentorLagbe Pro!
        </h1>
        <p className="text-xs text-slate-600 mt-2">
          Your transaction has been processed securely via Stripe. Your account has been upgraded to Pro status.
        </p>

        {payment && (
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-left space-y-1.5">
            <p className="text-slate-500">Amount Paid: <strong className="text-slate-800">${payment.amount} {payment.currency}</strong></p>
            <p className="text-slate-500 truncate">Transaction ID: <span className="font-mono text-slate-700">{payment.transactionId}</span></p>
            <p className="text-slate-500">Plan: <strong className="text-emerald-700 uppercase">PRO</strong></p>
          </div>
        )}

        <div className="mt-8 space-y-3">
          <Link
            href="/dashboard/profile"
            className="w-full block py-3 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition"
          >
            Go to My Profile
          </Link>
          <Link
            href="/tuitions"
            className="w-full block py-2.5 px-4 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Browse Tuitions
          </Link>
        </div>
      </div>
    </div>
  );
}
