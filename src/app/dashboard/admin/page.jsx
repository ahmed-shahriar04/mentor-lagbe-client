'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { getStoredAuth } from '@/lib/auth-client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faShieldAlt,
  faCreditCard,
  faChalkboardTeacher,
  faHourglassHalf,
  faCheckDouble,
  faCoins,
  faUserShield,
  faServer,
  faArrowRight,
  faChartPie,
} from '@fortawesome/free-solid-svg-icons';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTutors: 0,
    approvedTuitions: 0,
    pendingTuitions: 0,
    totalRevenue: 0,
    totalTransactions: 0,
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getStoredAuth();
    setUser(auth?.user || null);

    async function load() {
      try {
        const res = await api.getAdminStats();
        if (res.success && res.data) setStats(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-purple-700/30"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-500/20 border-2 border-purple-400/40 text-purple-300 flex items-center justify-center shrink-0 shadow-lg">
              <FontAwesomeIcon icon={faUserShield} className="w-8 h-8 sm:w-10 sm:h-10 text-purple-300" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-heading">
                  System Administrator
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-heading flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Cluster Live</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold font-heading mt-2 tracking-tight">
                Super Admin Control Center
              </h1>
              <p className="text-xs sm:text-sm text-purple-200/80 mt-1 max-w-xl leading-relaxed">
                Platform metrics, user role governance, batch moderation, and Stripe transaction auditing.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/dashboard/admin/tuitions"
              className="px-5 py-3 text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-purple-50 rounded-xl shadow-lg transition flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faShieldAlt} className="w-3.5 h-3.5 text-purple-600" />
              <span>Review Tuitions</span>
            </Link>
            <Link
              href="/dashboard/admin/users"
              className="px-5 py-3 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faUsers} className="w-3.5 h-3.5 text-purple-300" />
              <span>Manage Users</span>
            </Link>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
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
              Registered Accounts
            </p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-2">
              {stats.totalUsers}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Active platform members
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <FontAwesomeIcon icon={faUsers} className="w-6 h-6" />
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
              Verified Tutors
            </p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-heading mt-2">
              {stats.totalTutors}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Educators & university mentors
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FontAwesomeIcon icon={faChalkboardTeacher} className="w-6 h-6" />
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
              Moderation Queue
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-2">
              <span className="text-amber-600">{stats.pendingTuitions} Pending</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              <span className="text-emerald-600 font-bold">{stats.approvedTuitions} Approved</span> live batches
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <FontAwesomeIcon icon={faHourglassHalf} className="w-6 h-6" />
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
              Stripe Gross Revenue
            </p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-heading mt-2">
              ${stats.totalRevenue}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              {stats.totalTransactions} paid transactions
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <FontAwesomeIcon icon={faCoins} className="w-6 h-6" />
          </div>
        </motion.div>
      </div>

      {/* 3. Two-Column Dashboard Content Grid (Full Width) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Management Hub (7 cols) */}
        <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
          
          {/* Quick Management Hub */}
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Administrative Management Hub
                </h3>
                <p className="text-xs text-slate-500">
                  Execute core governance actions across platform records
                </p>
              </div>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                3 Portals
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/dashboard/admin/users"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-purple-50/60 border border-slate-200 hover:border-purple-300 transition group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform mb-3">
                    <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-700">
                    User Management
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Modify roles (Student / Tutor / Admin).
                  </p>
                </div>
              </Link>

              <Link
                href="/dashboard/admin/tuitions"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-purple-50/60 border border-slate-200 hover:border-purple-300 transition group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform mb-3">
                    <FontAwesomeIcon icon={faShieldAlt} className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-700">
                    Tuition Moderation
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Approve or reject pending tuition listings.
                  </p>
                </div>
              </Link>

              <Link
                href="/dashboard/admin/transactions"
                className="p-4 rounded-2xl bg-slate-50 hover:bg-purple-50/60 border border-slate-200 hover:border-purple-300 transition group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform mb-3">
                    <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-700">
                    Stripe Logs
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    Audit checkout transactions & IDs.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Platform Moderation Guidelines */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-heading mb-3">
              Standard Moderation Criteria
            </h4>
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-2.5">
                <span className="font-bold text-emerald-600 mt-0.5">✓</span>
                <span><strong>Fee Rationality:</strong> Monthly fee matches syllabus depth and target class level (e.g. HSC 3000-5000 BDT).</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-2.5">
                <span className="font-bold text-emerald-600 mt-0.5">✓</span>
                <span><strong>Syllabus Clarity:</strong> Description clearly outlines topics, mock test routine, and problem sessions.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-2.5">
                <span className="font-bold text-emerald-600 mt-0.5">✓</span>
                <span><strong>Quality Banner:</strong> Listing has an appropriate, educational banner image.</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Financial & System Health (5 cols) */}
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
          
          {/* Financial Breakdown Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-purple-950 text-white shadow-xl border border-slate-700 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-full text-purple-300">
                Stripe Payments Engine
              </span>
              <FontAwesomeIcon icon={faCoins} className="w-5 h-5 text-amber-400" />
            </div>

            <h3 className="text-xl font-bold font-heading">
              Total Revenue: ${stats.totalRevenue} USD
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Processed through Stripe checkout sessions for Pro Student ($10) and Pro Tutor ($15) tiers.
            </p>

            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-center">
              <div className="p-2.5 rounded-xl bg-white/5">
                <p className="text-[11px] text-slate-400">Total Transactions</p>
                <p className="text-lg font-bold text-white mt-0.5">{stats.totalTransactions}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5">
                <p className="text-[11px] text-slate-400">Currency</p>
                <p className="text-lg font-bold text-emerald-400 mt-0.5">USD ($)</p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/dashboard/admin/transactions"
                className="w-full block text-center py-3 px-4 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition shadow-md"
              >
                View Detailed Audit Log →
              </Link>
            </div>
          </div>

          {/* System Environment Status */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <FontAwesomeIcon icon={faServer} className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-heading">
                Backend Architecture
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Database</span>
                <span className="font-bold text-emerald-600">MongoDB Atlas (Connected)</span>
              </li>
              <li className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Payment Gateway</span>
                <span className="font-bold text-blue-600">Stripe Live Checkout API</span>
              </li>
              <li className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Image Hosting</span>
                <span className="font-bold text-purple-600">ImgBB Direct API</span>
              </li>
              <li className="flex justify-between py-1">
                <span className="text-slate-500">Authentication</span>
                <span className="font-bold text-slate-800">JWT + Role RBAC</span>
              </li>
            </ul>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
}
