import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center">
      <span className="text-7xl font-extrabold text-emerald-600 font-heading">404</span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 font-heading sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-3 text-base text-slate-500 max-w-md">
        Sorry, we couldn’t find the tuition batch, profile, or page you’re looking for. It might have been moved or removed.
      </p>
      <div className="mt-8 flex items-center justify-center space-x-4">
        <Link
          href="/"
          className="px-6 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm shadow-emerald-600/30 transition"
        >
          Back to Home
        </Link>
        <Link
          href="/tuitions"
          className="px-6 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition"
        >
          Browse Tuitions
        </Link>
      </div>
    </div>
  );
}
