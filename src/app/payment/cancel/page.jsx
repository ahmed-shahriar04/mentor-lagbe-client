import Link from 'next/link';

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
          !
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-heading">
          Checkout Cancelled
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 font-heading mt-1">
          Payment Was Not Completed
        </h1>
        <p className="text-xs text-slate-500 mt-2">
          You haven't been charged. If you experienced any payment issues, you can retry anytime.
        </p>

        <div className="mt-8 space-y-3">
          <Link
            href="/pricing"
            className="w-full block py-3 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition"
          >
            Return to Pricing
          </Link>
          <Link
            href="/"
            className="w-full block py-2.5 px-4 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
