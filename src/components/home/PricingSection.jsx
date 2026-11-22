'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Free Starter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">
                For Everyone
              </span>
              <h3 className="text-2xl font-bold text-slate-900 font-heading mt-1">
                Starter Plan
              </h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-slate-900 font-heading">$0</span>
                <span className="text-slate-500 text-sm ml-1.5">/ free forever</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Basic access for browsing and posting standard tuitions.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-6">
                <li className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  Post up to 2 tuition batches
                </li>
                <li className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  Bookmark up to 5 saved tuitions
                </li>
                <li className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  Full search & filter access
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Link
                href="/tuitions"
                className="w-full block text-center py-3 px-4 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>

          {/* Pro Student Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-8 rounded-3xl bg-white border-2 border-blue-500 shadow-xl shadow-blue-500/10 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-extrabold px-3.5 py-1 rounded-bl-xl uppercase tracking-wider">
              STUDENT RECOMMENDED
            </div>
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
                  <span className="text-blue-600 font-bold mr-2">✓</span>
                  <span><strong>Unlimited</strong> tuition bookmarks</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 font-bold mr-2">✓</span>
                  <span>Priority booking queue on limited batches</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 font-bold mr-2">✓</span>
                  <span>Verified Student Pro status</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Link
                href="/pricing"
                className="w-full block text-center py-3.5 px-4 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/25 transition"
              >
                Upgrade Student ($10)
              </Link>
            </div>
          </motion.div>

          {/* Pro Tutor Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-8 rounded-3xl bg-white border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-extrabold px-3.5 py-1 rounded-bl-xl uppercase tracking-wider">
              VERIFIED MENTOR TIER
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
                Designed for full-time teachers aiming to reach more students.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-6">
                <li className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  <span><strong>Unlimited</strong> tuition batch postings</span>
                </li>
                <li className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  <span>Verified Pro Tutor Badge next to your profile</span>
                </li>
                <li className="flex items-center">
                  <span className="text-emerald-600 font-bold mr-2">✓</span>
                  <span>Direct student applicant management</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <Link
                href="/pricing"
                className="w-full block text-center py-3.5 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/30 transition"
              >
                Upgrade Tutor ($15)
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
