'use client';

import Link from 'next/link';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-6">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 font-heading">
        Something went wrong!
      </h2>
      <p className="mt-2 text-sm text-slate-500 max-w-md">
        {error?.message || 'An unexpected error occurred while loading this page. Please try again or return home.'}
      </p>
      <div className="mt-6 flex items-center space-x-3">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-sm"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
