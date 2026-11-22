'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredAuth } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function AdminRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const auth = getStoredAuth();
    if (!auth || !auth.user) {
      toast.error('Please sign in as Admin');
      router.push('/sign-in');
    } else if (auth.user.role === 'admin') {
      router.push('/dashboard/admin');
    } else {
      toast.error('Admin access required');
      router.push(`/dashboard/${auth.user.role}`);
    }
  }, [router]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin"></div>
    </div>
  );
}
