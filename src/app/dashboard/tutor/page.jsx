'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { getStoredAuth } from '@/lib/auth-client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChalkboardTeacher,
  faBookOpen,
  faCheckCircle,
  faUsers,
  faCrown,
  faPlus,
  faArrowRight,
  faChartLine,
  faCalendarAlt,
  faShieldAlt,
  faLightbulb,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';

export default function TutorOverviewPage() {
  const [stats, setStats] = useState({
    totalPosted: 0,
    activeApproved: 0,
    totalApplicants: 0,
    currentPlan: 'free',
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getStoredAuth();
    setUser(auth?.user || null);

    async function load() {
      try {
        const res = await api.getTutorStats();
        if (res.success && res.data) setStats(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const isPro = stats.currentPlan === 'pro' || user?.plan === 'pro';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-8 w-full"
    >
      {/* 1. Hero Welcome Card (Full Width) */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-emerald-700/30"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="relative shrink-0">
              <img
                src={user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Tutor')}&background=059669&color=fff&bold=true`}
                alt={user?.name || 'Mentor'}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Tutor')}&background=059669&color=fff&bold=true`;
                }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/10 shadow-lg"
              />
              {isPro && (
                <img
                  src="/pro-badge.svg"
                  alt="Pro"
                  className="absolute -bottom-1 -right-1 w-6 h-6 drop-shadow-md"
                  title="Verified Pro Mentor"
                />
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-heading">
                  Verified Academic Mentor
                </span>
                {isPro ? (
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-heading flex items-center space-x-1">
                    <img src="/pro-badge.svg" alt="Pro" className="w-3.5 h-3.5 inline" />
                    <span>PRO MENTOR</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-500/20 text-slate-300 border border-slate-500/30 font-heading">
                    Free Plan
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold font-heading mt-2 tracking-tight">
                Welcome back, {user?.name || 'Educator'}!
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-xl leading-relaxed">
                Manage your academic tuition batches, review prospective student applicants, and track your teaching schedule.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/dashboard/tutor/post-tuition"
              className="px-5 py-3 text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-emerald-50 rounded-xl shadow-lg transition flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5 text-emerald-600" />
              <span>Post New Tuition</span>
            </Link>
            <Link
              href="/dashboard/tutor/applicants"
              className="px-5 py-3 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faUsers} className="w-3.5 h-3.5 text-emerald-300" />
              <span>View Applicants</span>
            </Link>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </motion.div>

      {/* 2. 4 Premium Metric Stat Cards (Staggered Animation) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">
              Total Batches Posted
            </p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-2">
              {stats.totalPosted}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              {isPro ? 'Unlimited allowance (Pro)' : 'Max 2 batches on Free Tier'}
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <FontAwesomeIcon icon={faBookOpen} className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Metric 2 */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">
              Active / Approved
            </p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-heading mt-2">
              {stats.activeApproved}
            </h3>
            <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              Live on Browse Portal
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Metric 3 */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">
              Student Applicants
            </p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-heading mt-2">
              {stats.totalApplicants}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Direct booking requests
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FontAwesomeIcon icon={faUsers} className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Metric 4 */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading">
              Membership Plan
            </p>
            <h3 className="text-2xl font-extrabold text-slate-900 font-heading mt-2">
              {isPro ? 'PRO PLAN' : 'FREE PLAN'}
            </h3>
            <div className="mt-1">
              {!isPro ? (
                <Link
                  href="/pricing"
                  className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 underline"
                >
                  Upgrade to Pro ($15) →
                </Link>
              ) : (
                <span className="text-[11px] font-bold text-blue-600">
                  Verified Pro Member ✓
                </span>
              )}
            </div>
          </div>
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
            isPro ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'
          }`}>
            <FontAwesomeIcon icon={faCrown} className="w-6 h-6" />
          </div>
        </motion.div>
      </div>

      {/* 3. Two-Column Dashboard Content Grid (Full Width) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Quick Action Launchpad & Batch Quota (7 cols) */}
        <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
          
          {/* Quick Action Hub */}
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Mentor Navigation Hub
                </h3>
                <p className="text-xs text-slate-500">
                  Quick access to all essential tuition tools and records
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                4 Services
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/dashboard/tutor/post-tuition"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 transition group flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                    Post a Tuition
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Submit new batch with syllabus & time shifts.
                  </p>
                </div>
              </Link>

              <Link
                href="/dashboard/tutor/my-tuitions"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 transition group flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FontAwesomeIcon icon={faBookOpen} className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                    My Created Tuitions
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Edit details, banners, or toggle active/closed.
                  </p>
                </div>
              </Link>

              <Link
                href="/dashboard/tutor/applicants"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 transition group flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                    Manage Applicants
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Review incoming student requests & routines.
                  </p>
                </div>
              </Link>

              <Link
                href="/dashboard/payments"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 transition group flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                    Payment Receipts
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Download official PDF receipts for Stripe upgrades.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Posting Quota Tracker */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading">
                Listing Quota Tracker
              </span>
              <span className="text-xs font-bold text-slate-700">
                {isPro ? 'Unlimited (Pro Active)' : `${stats.totalPosted} / 2 Posts Used`}
              </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isPro
                    ? 'bg-blue-600 w-full'
                    : stats.totalPosted >= 2
                    ? 'bg-red-500 w-full'
                    : 'bg-emerald-600 w-1/2'
                }`}
              ></div>
            </div>

            <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
              {isPro
                ? '✓ As a Pro Mentor, you have unlimited tuition batch listings and direct applicant contacts.'
                : stats.totalPosted >= 2
                ? '⚠️ You have reached the Free Plan limit of 2 batches. Upgrade to Pro Tutor ($15) to post unlimited tuitions!'
                : 'Free tier allows up to 2 active tuition listings. Upgrade to Pro for unlimited batch expansion.'}
            </p>
          </div>
        </motion.div>

        {/* Right Column: Tips & Pro Status (5 cols) */}
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
          
          {/* Pro Promotion or Pro Active Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl border border-slate-700 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-full text-emerald-400">
                {isPro ? 'Pro Subscription Active' : 'Upgrade Privilege'}
              </span>
              <FontAwesomeIcon icon={faCrown} className="w-5 h-5 text-amber-400" />
            </div>

            <h3 className="text-xl font-bold font-heading">
              {isPro ? 'Verified Pro Tutor Benefits' : 'Unlock Pro Mentor Privileges'}
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {isPro
                ? 'Your profile carries the official Verified Pro Mentor badge, prioritizing your batches in search results.'
                : 'Reach 5x more students across Bangladesh with unlimited tuition posts and verified badge.'}
            </p>

            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-center">
                <span className="text-emerald-400 font-bold mr-2">✓</span>
                Unlimited tuition batch postings
              </li>
              <li className="flex items-center">
                <span className="text-emerald-400 font-bold mr-2">✓</span>
                Official blue Verified Pro Badge
              </li>
              <li className="flex items-center">
                <span className="text-emerald-400 font-bold mr-2">✓</span>
                Direct contact details access
              </li>
            </ul>

            <div className="mt-6">
              {!isPro ? (
                <Link
                  href="/pricing"
                  className="w-full block text-center py-3 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-md"
                >
                  Upgrade to Pro Tutor ($15)
                </Link>
              ) : (
                <div className="py-2.5 px-4 text-center text-xs font-bold text-emerald-300 bg-white/5 rounded-xl border border-white/10">
                  Plan Active ✓ Lifetime Access
                </div>
              )}
            </div>
          </div>

          {/* Best Practices & Advice */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <FontAwesomeIcon icon={faLightbulb} className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-heading">
                Mentor Best Practices
              </h4>
            </div>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <li className="flex items-start">
                <span className="font-bold text-emerald-600 mr-2">•</span>
                <span><strong>Specify Class Shifts:</strong> Batches with clear preferred times (e.g. Evening 6:00 PM) receive 40% more applicants.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-emerald-600 mr-2">•</span>
                <span><strong>Detailed Syllabus:</strong> Outline chapter-by-chapter coverage, problem solving, and mock test schedules.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-emerald-600 mr-2">•</span>
                <span><strong>Quick Response:</strong> Review student applications within 24 hours to secure commitment.</span>
              </li>
            </ul>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
}
