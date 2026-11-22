'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setStoredAuth } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Please enter your email and password');
    }

    setLoading(true);
    try {
      // In production, Better Auth authenticates via its endpoint /api/auth/sign-in
      // For immediate dev & test compatibility, we synchronize auth locally & generate JWT payload
      let role = 'student';
      if (email.includes('admin')) role = 'admin';
      else if (email.includes('tutor') || email.includes('buet') || email.includes('eng')) role = 'tutor';

      const mockUser = {
        name: email.split('@')[0],
        email,
        role,
        plan: 'free',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop',
      };

      // Mock client JWT for API authorization
      const fakeToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({
        email,
        name: mockUser.name,
        role,
        plan: 'free',
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
      }))}.signature`;

      setStoredAuth({
        user: mockUser,
        token: fakeToken,
      });

      toast.success(`Welcome back, ${mockUser.name}!`);

      if (role === 'admin') router.push('/dashboard/admin');
      else if (role === 'tutor') router.push('/dashboard/tutor');
      else router.push('/dashboard/student');
    } catch (err) {
      toast.error(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-500/20 font-bold text-xl">
            M
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
            Sign In to MentorLagbe
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access your student applications or tutor management portal
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="e.g. student@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/30 transition transform active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link href="/sign-up" className="font-bold text-emerald-600 hover:text-emerald-700">
            Sign Up here
          </Link>
        </div>
      </div>
    </div>
  );
}
