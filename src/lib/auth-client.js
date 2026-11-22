'use client';
import { createAuthClient } from 'better-auth/react';

// Initialize Better Auth Client
export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_CLIENT_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')),
});

// Client auth helper for session, role, and JWT token
export const getStoredAuth = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('mentorlagbe_auth');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Ensure accounts start as free unless an explicit successful Stripe session verified it
    if (parsed?.user && parsed.user.plan === 'pro' && !localStorage.getItem('mentorlagbe_pro_paid')) {
      parsed.user.plan = 'free';
      localStorage.setItem('mentorlagbe_auth', JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    return null;
  }
};

export const setStoredAuth = (authData) => {
  if (typeof window === 'undefined') return;
  if (!authData) {
    localStorage.removeItem('mentorlagbe_auth');
  } else {
    localStorage.setItem('mentorlagbe_auth', JSON.stringify(authData));
  }
  // Dispatch custom storage event for sync across components
  window.dispatchEvent(new Event('mentorlagbe_auth_change'));
};

export const clearStoredAuth = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('mentorlagbe_auth');
  window.dispatchEvent(new Event('mentorlagbe_auth_change'));
};
