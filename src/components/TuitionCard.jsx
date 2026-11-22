'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TuitionCard({ tuition, index = 0 }) {
  const [imgError, setImgError] = useState(false);

  if (!tuition) return null;

  // Stagger calculation: (index % 3) * 0.15s ensures each card in a 3-column grid fades in one-by-one!
  const delay = (index % 3) * 0.15;

  // Real mentor image only
  const tutorAvatar = tuition.tutorImage || tuition.tutorPhoto || (tuition.tutor && tuition.tutor.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="mentor-card flex flex-col h-full overflow-hidden group hover:shadow-2xl transition-all duration-300 bg-white rounded-3xl border border-slate-200"
    >
      {/* Banner Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={tuition.bannerImage || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop'}
          alt={tuition.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="badge-role bg-white/95 text-emerald-700 shadow-sm font-semibold">
            {tuition.subject}
          </span>
          <span className={`badge-role shadow-sm font-semibold ${
            tuition.mode === 'Online'
              ? 'bg-blue-600 text-white'
              : 'bg-amber-600 text-white'
          }`}>
            {tuition.mode}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-slate-900/80 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
            ৳{tuition.monthlyFee?.toLocaleString()}/mo
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Class Level & Days */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="flex items-center">
              <svg className="w-3.5 h-3.5 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {tuition.classLevel}
            </span>
            <span className="flex items-center">
              <svg className="w-3.5 h-3.5 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {tuition.daysPerWeek} days/wk
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 font-heading line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {tuition.title}
          </h3>

          {/* Location */}
          <p className="mt-1.5 text-xs text-slate-500 flex items-center line-clamp-1">
            <svg className="w-3.5 h-3.5 mr-1 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {tuition.location || 'Location Not Specified'}
          </p>

          {/* Description */}
          <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {tuition.description}
          </p>
        </div>

        {/* Tutor info & View Details button */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="relative shrink-0">
              {tutorAvatar && !imgError ? (
                <img
                  src={tutorAvatar}
                  alt={tuition.tutorName || 'Tutor'}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/20 shadow-sm"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white font-bold text-xs shadow-sm ring-2 ring-emerald-500/20">
                  {(tuition.tutorName || 'M').charAt(0).toUpperCase()}
                </div>
              )}
              {tuition.isProTutor && (
                <img
                  src="/pro-badge.svg"
                  alt="Pro"
                  className="absolute -bottom-1 -right-1 w-4 h-4 drop-shadow-sm"
                  title="Verified Pro Mentor"
                />
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
                {tuition.tutorName}
              </span>
              <span className="text-[10px] text-slate-400 flex items-center">
                Verified Mentor
                {tuition.isProTutor && (
                  <span className="ml-1 text-[9px] font-bold text-blue-600 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                    PRO
                  </span>
                )}
              </span>
            </div>
          </div>

          <Link
            href={`/tuitions/${tuition._id}`}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-sm shrink-0"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
