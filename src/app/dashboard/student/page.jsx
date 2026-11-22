'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { getStoredAuth } from '@/lib/auth-client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserGraduate,
  faClipboardList,
  faCheckCircle,
  faClock,
  faBookmark,
  faCrown,
  faSearch,
  faLightbulb,
  faCreditCard,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';

export default function StudentOverviewPage() {
  const [stats, setStats] = useState({
    totalApplied: 0,
    accepted: 0,
    pending: 0,
    currentPlan: 'free',
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getStoredAuth();
    setUser(auth?.user || null);

    async function load() {
      try {
        const res = await api.getStudentStats();
        if (res?.success && res?.data) {
          setStats(res.data);
          if (auth?.user && auth.user.plan !== res.data.currentPlan) {
            auth.user.plan = res.data.currentPlan;
            setStoredAuth(auth);
            setUser({ ...auth.user });
          }
        }
      } catch (e) {
        console.warn('Student stats fetch notice:', e?.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const isPro = stats.currentPlan === 'pro';

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
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-800 via-indigo-900 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-blue-700/30"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="relative shrink-0">
              <img
                src={user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Student')}&background=2563eb&color=fff&bold=true`}
                alt={user?.name || 'Student'}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Student')}&background=2563eb&color=fff&bold=true`;
                }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/10 shadow-lg"
              />
              {isPro && (
                <img
                  src="/pro-badge.svg"
                  alt="Pro"
                  className="absolute -bottom-1 -right-1 w-6 h-6 drop-shadow-md"
                  title="Verified Student Pro"
                />
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-heading">
                  Learner Dashboard
                </span>
                {isPro ? (
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-400/20 text-blue-200 border border-blue-400/30 font-heading flex items-center space-x-1">
                    <img src="/pro-badge.svg" alt="Pro" className="w-3.5 h-3.5 inline" />
                    <span>PRO STUDENT</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-500/20 text-slate-300 border border-slate-500/30 font-heading">
                    Free Plan
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold font-heading mt-2 tracking-tight">
                Hello, {user?.name || 'Student'}!
              </h1>
              <p className="text-xs sm:text-sm text-blue-100/80 mt-1 max-w-xl leading-relaxed">
                Track your tuition applications, manage preferred timetable shifts, and learn from Bangladesh's top university mentors.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/tuitions"
              className="px-5 py-3 text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-blue-50 rounded-xl shadow-lg transition flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faSearch} className="w-3.5 h-3.5 text-blue-600" />
              <span>Browse Batches</span>
            </Link>
            <Link
              href="/dashboard/student/my-applications"
              className="px-5 py-3 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faClipboardList} className="w-3.5 h-3.5 text-blue-300" />
              <span>My Applications</span>
            </Link>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
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
              Total Applications
            </p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-2">
              {stats.totalApplied}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Tuition requests submitted
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FontAwesomeIcon icon={faClipboardList} className="w-6 h-6" />
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
              Accepted by Mentors
            </p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-heading mt-2">
              {stats.accepted}
            </h3>
            <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
              Ready to attend classes
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
              Pending Review
            </p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-heading mt-2">
              {stats.pending}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Awaiting mentor response
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <FontAwesomeIcon icon={faClock} className="w-6 h-6" />
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
              Membership Tier
            </p>
            <h3 className="text-2xl font-extrabold text-slate-900 font-heading mt-2">
              {isPro ? 'PRO STUDENT' : 'FREE PLAN'}
            </h3>
            <div className="mt-1">
              {!isPro ? (
                <Link
                  href="/pricing"
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-700 underline"
                >
                  Upgrade to Pro ($10) →
                </Link>
              ) : (
                <span className="text-[11px] font-bold text-blue-600">
                  Unlimited Bookmarks Active ✓
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
        
        {/* Left Column: Learning Roadmap & Status Guide (7 cols) */}
        <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
          
          {/* Quick Learning Services */}
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Student Navigation Hub
                </h3>
                <p className="text-xs text-slate-500">
                  Quick links to your academic activities and tuition preferences
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                4 Services
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/tuitions"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 transition group flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                    Browse All Batches
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Filter by Subject, HSC/SSC, Mode & Fee.
                  </p>
                </div>
              </Link>

              <Link
                href="/dashboard/student/my-applications"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 transition group flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FontAwesomeIcon icon={faClipboardList} className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                    My Applications
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Check status, cancel or view tutor notes.
                  </p>
                </div>
              </Link>

              <Link
                href="/dashboard/student/saved-tuitions"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 transition group flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FontAwesomeIcon icon={faBookmark} className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                    Saved Bookmarks
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Revisit favorite batches to apply anytime.
                  </p>
                </div>
              </Link>

              <Link
                href="/dashboard/payments"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 transition group flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                    Payment Receipts
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Download official PDF receipts for upgrades.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Application Status Guide */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-heading mb-3">
              Application Lifecycle Guide
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Step 1: Pending</span>
                <p className="text-xs font-semibold text-slate-800 mt-1">Awaiting Review</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Tutor is assessing your schedule and class shift preferences.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Step 2: Accepted</span>
                <p className="text-xs font-semibold text-slate-800 mt-1">Confirmed Enrollment</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Tutor phone number is unlocked. Contact mentor to start classes.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80">
                <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">Step 3: Routine</span>
                <p className="text-xs font-semibold text-slate-800 mt-1">Class Attendance</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Attend regular online Zoom / offline sessions as scheduled.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Tips & Pro Status (5 cols) */}
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
          
          {/* Pro Promotion or Pro Active Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xl border border-slate-700 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-full text-blue-300">
                {isPro ? 'Pro Learner Active' : 'Student Upgrade'}
              </span>
              <FontAwesomeIcon icon={faCrown} className="w-5 h-5 text-amber-400" />
            </div>

            <h3 className="text-xl font-bold font-heading">
              {isPro ? 'Verified Student Pro Perks' : 'Unlock Pro Student Benefits'}
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {isPro
                ? 'Enjoy unlimited saved bookmarks, priority booking queues, and verified student status.'
                : 'Save unlimited tuition batches and secure priority admission queues for limited batches.'}
            </p>

            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-center">
                <span className="text-blue-400 font-bold mr-2">✓</span>
                Unlimited tuition bookmarks (no 5-item cap)
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 font-bold mr-2">✓</span>
                Verified Student Pro status badge
              </li>
              <li className="flex items-center">
                <span className="text-blue-400 font-bold mr-2">✓</span>
                Priority application review queue
              </li>
            </ul>

            <div className="mt-6">
              {!isPro ? (
                <Link
                  href="/pricing"
                  className="w-full block text-center py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-md"
                >
                  Upgrade Student ($10)
                </Link>
              ) : (
                <div className="py-2.5 px-4 text-center text-xs font-bold text-blue-300 bg-white/5 rounded-xl border border-white/10">
                  Plan Active ✓ Lifetime Access
                </div>
              )}
            </div>
          </div>

          {/* Student Tips */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <FontAwesomeIcon icon={faLightbulb} className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-heading">
                Study & Tuition Tips
              </h4>
            </div>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">•</span>
                <span><strong>Select Realistic Days:</strong> Pick days where you have at least 1 hour free before class for revision.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">•</span>
                <span><strong>Provide Meaningful Notes:</strong> Mention your current weak topics in the application note so the mentor prepares accordingly.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">•</span>
                <span><strong>Bookmark Before Applying:</strong> Save 2-3 matching batches to compare syllabus and fees before final selection.</span>
              </li>
            </ul>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
}
