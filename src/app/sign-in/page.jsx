'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setStoredAuth } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

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
      let role = 'student';
      if (email.toLowerCase().includes('admin') || email === 'shahriarahmedriaz_admin@mentrolagbe.com') {
        role = 'admin';
      } else if (email.toLowerCase().includes('tutor') || email === 'shahriarahmedriaz.tutor@mentorlagbe.com' || email.includes('buet') || email.includes('eng')) {
        role = 'tutor';
      }

      const mockUser = {
        name: email.split('@')[0],
        email,
        role,
        plan: 'pro',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop',
      };

      const payload = {
        email,
        name: mockUser.name,
        role,
        plan: 'pro',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      };

      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(unescape(encodeURIComponent(JSON.stringify(payload))))}.token_signature`;

      setStoredAuth({
        user: mockUser,
        token: token,
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

  const handleGoogleClick = () => {
    let googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!googleClientId || googleClientId.includes('your_google_client_id')) {
      const inputId = window.prompt('Enter your Google OAuth Client ID (from console.cloud.google.com):');
      if (!inputId || !inputId.trim()) {
        toast.error('Google Client ID is required by Google to open accounts.google.com');
        return;
      }
      googleClientId = inputId.trim();
    }

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mentorlagbe_oauth_role', 'student');
    }

    const redirectUri = `${window.location.origin}/auth/callback`;
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(googleClientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token%20id_token&scope=openid%20email%20profile&nonce=${Date.now()}&prompt=select_account`;
    
    toast.loading('Redirecting to Google...');
    window.location.href = googleAuthUrl;
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-500/20">
            <FontAwesomeIcon icon={faGraduationCap} className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
            Sign In to MentorLagbe
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access your student applications or tutor management portal
          </p>
        </div>

        {/* Direct Google OAuth 2.0 Button */}
        <button
          type="button"
          onClick={handleGoogleClick}
          className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center space-x-3 transition shadow-sm mb-5"
        >
          <FontAwesomeIcon icon={faGoogle} className="w-4 h-4 text-red-500" />
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center justify-center mb-5">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold absolute">
            or sign in with email
          </span>
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
            className="w-full py-3 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/30 transition transform active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <FontAwesomeIcon icon={faSignInAlt} className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
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
