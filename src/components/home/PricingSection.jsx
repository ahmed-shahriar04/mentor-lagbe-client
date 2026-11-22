import Link from 'next/link';

export default function PricingSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
            Subscription Plans
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading mt-1">
            Affordable Plans for Tutors & Students
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Start for free and upgrade anytime via Stripe Checkout for advanced privileges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Pro Tutor Plan */}
          <div className="p-8 rounded-3xl bg-white border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[11px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-heading">
                For Educators
              </span>
              <h3 className="text-2xl font-bold text-slate-900 font-heading mt-1">
                Pro Tutor Plan
              </h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-slate-900 font-heading">$15</span>
                <span className="text-slate-500 text-sm ml-1.5">/ one-time upgrade</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Designed for full-time teachers and coaching mentors aiming to reach more students.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-6">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald-600 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                  <strong>Unlimited</strong> tuition batch postings (Free plan is limited to 2)
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald-600 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                  Verified Pro Tutor Badge next to your profile
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald-600 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                  Direct student applicant management dashboard
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Link
                href="/pricing"
                className="w-full block text-center py-3 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/30 transition"
              >
                Upgrade with Stripe ($15)
              </Link>
            </div>
          </div>

          {/* Pro Student Plan */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider font-heading">
                For Students
              </span>
              <h3 className="text-2xl font-bold text-slate-900 font-heading mt-1">
                Pro Student Plan
              </h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-slate-900 font-heading">$10</span>
                <span className="text-slate-500 text-sm ml-1.5">/ one-time upgrade</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Empower your learning with priority access to top university mentors.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-6">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-600 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                  <strong>Unlimited</strong> tuition bookmarks (Free plan is limited to 5)
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-600 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                  Priority booking queue on limited capacity batches
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-blue-600 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                  Verified Student Pro status
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Link
                href="/pricing"
                className="w-full block text-center py-3 px-4 text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Upgrade with Stripe ($10)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
