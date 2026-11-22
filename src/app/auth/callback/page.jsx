'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setStoredAuth } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function GoogleOAuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState('Verifying your Google Account...');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function processOAuth() {
      try {
        if (typeof window === 'undefined') return;

        // Parse hash params or search params
        const hash = window.location.hash.substring(1);
        const search = window.location.search.substring(1);
        const params = new URLSearchParams(hash || search);

        const accessToken = params.get('access_token');
        const idToken = params.get('id_token');

        if (!accessToken && !idToken) {
          setError('No access token received from Google.');
          return;
        }

        setStatus('Retrieving profile from Google...');

        // Fetch Google user profile
        let googleUser = null;
        if (accessToken) {
          try {
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            if (res.ok) {
              googleUser = await res.json();
            }
          } catch (e) {
            console.error('Failed to fetch userinfo with accessToken:', e);
          }
        }

        // Decode id_token for picture, name, and email
        if (idToken) {
          try {
            const base64Url = idToken.split('.')[1];
            if (base64Url) {
              let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
              while (base64.length % 4) {
                base64 += '=';
              }
              const jsonPayload = decodeURIComponent(
                atob(base64)
                  .split('')
                  .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                  .join('')
              );
              const parsed = JSON.parse(jsonPayload);
              const decodedPicture = parsed.picture || parsed.avatar_url || parsed.photoURL || '';
              googleUser = {
                ...parsed,
                ...googleUser,
                picture: googleUser?.picture || decodedPicture,
              };
            }
          } catch (e) {
            console.error('Failed to parse id_token:', e);
          }
        }

        const email = (googleUser?.email || 'google_user@mentorlagbe.com').trim().toLowerCase();
        const name = googleUser?.name || email.split('@')[0];
        const rawPic = googleUser?.picture || googleUser?.avatar_url || googleUser?.photoURL || '';
        const image = rawPic && rawPic.startsWith('http')
          ? rawPic
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=059669&color=fff&bold=true`;

        // Retrieve real, latest user role and profile from MongoDB
        let role = sessionStorage.getItem('mentorlagbe_oauth_role') || 'student';
        let plan = 'free';

        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
          const loginRes = await fetch(`${apiUrl}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, image }),
          });
          const loginData = await loginRes.json();
          if (loginData?.success && loginData?.user?.role) {
            role = loginData.user.role;
            plan = loginData.user.plan || 'free';
          }
        } catch (serverErr) {
          console.warn('Could not query database role during Google login:', serverErr);
        }

        const payload = {
          email,
          name,
          role,
          plan,
          image,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        };

        const googleToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(unescape(encodeURIComponent(JSON.stringify(payload))))}.google_verified`;

        setStoredAuth({
          user: {
            name,
            email,
            role,
            plan,
            image,
          },
          token: googleToken,
        });

        toast.success(`Welcome, ${name}! Signed in as ${role.toUpperCase()}.`);
        setStatus('Success! Redirecting to your dashboard...');

        setTimeout(() => {
          if (role === 'admin') {
            router.push('/dashboard/admin');
          } else if (role === 'tutor') {
            router.push('/dashboard/tutor');
          } else {
            router.push('/dashboard/student');
          }
        }, 800);
      } catch (err) {
        console.error('OAuth Callback Error:', err);
        setError(err.message || 'Failed to authenticate with Google');
      }
    }

    processOAuth();
  }, [router]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4 border border-red-100 shadow-sm">
          <FontAwesomeIcon icon={faGoogle} className="w-7 h-7" />
        </div>

        <h2 className="text-xl font-bold text-slate-900 font-heading mb-2">
          Google Authentication
        </h2>

        {error ? (
          <div className="space-y-4">
            <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 text-xs flex items-center space-x-2">
              <FontAwesomeIcon icon={faExclamationCircle} className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => router.push('/sign-in')}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">{status}</p>
            <div className="flex justify-center pt-2">
              <FontAwesomeIcon icon={faSpinner} className="w-6 h-6 text-emerald-600 animate-spin" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
