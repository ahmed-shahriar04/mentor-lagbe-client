'use client';

import { useState, useEffect } from 'react';
import TuitionCard from '@/components/TuitionCard';
import { TuitionCardSkeleton } from '@/components/SkeletonLoader';
import { api } from '@/lib/api';

export default function BrowseTuitionsPage() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('all');
  const [classLevel, setClassLevel] = useState('all');
  const [mode, setMode] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  const loadTuitions = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 9,
        sortBy,
      };
      if (search.trim()) params.search = search.trim();
      if (subject !== 'all') params.subject = subject;
      if (classLevel !== 'all') params.classLevel = classLevel;
      if (mode !== 'all') params.mode = mode;

      const res = await api.getPublicTuitions(params);
      if (res.success) {
        setTuitions(res.data || []);
        setPagination(res.pagination || { total: 0, totalPages: 1 });
      }
    } catch (err) {
      console.error('Failed to load tuitions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTuitions();
  }, [page, subject, classLevel, mode, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    loadTuitions();
  };

  const handleResetFilters = () => {
    setSearch('');
    setSubject('all');
    setClassLevel('all');
    setMode('all');
    setSortBy('newest');
    setPage(1);
  };

  const popularQuickFilters = [
    { label: 'All Subjects', value: 'all' },
    { label: 'Higher Math', value: 'Higher Mathematics' },
    { label: 'Physics', value: 'Physics' },
    { label: 'Chemistry', value: 'Chemistry' },
    { label: 'Biology', value: 'Biology' },
    { label: 'IELTS / English', value: 'IELTS' },
    { label: 'ICT & Coding', value: 'ICT & Programming' },
  ];

  const hasActiveFilters = subject !== 'all' || classLevel !== 'all' || mode !== 'all' || sortBy !== 'newest' || search !== '';

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
            Verified Academic Batches
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading mt-1">
            Browse All Available Tuitions
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Explore freshly published tuition batches and 1-on-1 mentorship posts verified by academic administrators across Bangladesh.
          </p>

          {/* Quick Subject Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pt-4 pb-1 no-scrollbar">
            {popularQuickFilters.map((qf) => (
              <button
                key={qf.value}
                type="button"
                onClick={() => {
                  setSubject(qf.value);
                  setPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap border shadow-sm ${
                  subject === qf.value
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-emerald-600/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400 hover:text-emerald-700'
                }`}
              >
                {qf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modern Filter Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-10 transition-all">
          <form onSubmit={handleSearchSubmit} className="space-y-5">
            
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by topic, subject, mentor name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-28 py-3.5 bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
              />
              <svg className="w-5 h-5 text-slate-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button
                type="submit"
                className="absolute right-2.5 top-2.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-emerald-600/20"
              >
                Search
              </button>
            </div>

            {/* Filter Dropdowns 4-Column Grid with Custom Sleek Styling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              
              {/* 1. Subject Dropdown */}
              <div className="space-y-1.5">
                <label className="flex items-center text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  <svg className="w-3.5 h-3.5 mr-1.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Subject
                </label>
                <div className="relative">
                  <select
                    value={subject}
                    onChange={(e) => { setSubject(e.target.value); setPage(1); }}
                    className={`w-full appearance-none px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition cursor-pointer pr-8 ${
                      subject !== 'all' ? 'border-emerald-500 bg-emerald-50/40 text-emerald-900 font-bold' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <option value="all">All Subjects</option>
                    <option value="Higher Mathematics">Higher Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                    <option value="IELTS">IELTS</option>
                    <option value="ICT & Programming">ICT & Programming</option>
                    <option value="Accounting">Accounting</option>
                    <option value="General Science & Math">General Science & Math</option>
                    <option value="Medical Admission">Medical Admission</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              {/* 2. Class Level Dropdown */}
              <div className="space-y-1.5">
                <label className="flex items-center text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  <svg className="w-3.5 h-3.5 mr-1.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Class Level
                </label>
                <div className="relative">
                  <select
                    value={classLevel}
                    onChange={(e) => { setClassLevel(e.target.value); setPage(1); }}
                    className={`w-full appearance-none px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition cursor-pointer pr-8 ${
                      classLevel !== 'all' ? 'border-emerald-500 bg-emerald-50/40 text-emerald-900 font-bold' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <option value="all">All Class Levels</option>
                    <option value="Class 9 / 10">Class 9 / 10</option>
                    <option value="Class 10 / SSC">Class 10 / SSC</option>
                    <option value="Class 11 & 12">Class 11 & 12</option>
                    <option value="Class 12 / HSC">Class 12 / HSC</option>
                    <option value="Admission Aspirants">Admission Aspirants</option>
                    <option value="University / Job Candidates">University / Job</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              {/* 3. Class Mode Dropdown */}
              <div className="space-y-1.5">
                <label className="flex items-center text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  <svg className="w-3.5 h-3.5 mr-1.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Class Mode
                </label>
                <div className="relative">
                  <select
                    value={mode}
                    onChange={(e) => { setMode(e.target.value); setPage(1); }}
                    className={`w-full appearance-none px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition cursor-pointer pr-8 ${
                      mode !== 'all' ? 'border-emerald-500 bg-emerald-50/40 text-emerald-900 font-bold' : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <option value="all">All Modes (Online & Offline)</option>
                    <option value="Online">Online Classes Only</option>
                    <option value="Offline">Offline / In-Person Visit</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              {/* 4. Sort By Fee Dropdown */}
              <div className="space-y-1.5">
                <label className="flex items-center text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  <svg className="w-3.5 h-3.5 mr-1.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  Sort By Fee
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                    className="w-full appearance-none px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition cursor-pointer pr-8"
                  >
                    <option value="newest">Recently Published First</option>
                    <option value="fee_low_high">Monthly Fee: Low to High</option>
                    <option value="fee_high_low">Monthly Fee: High to Low</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

            </div>

            {/* Filter Summary & Reset Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-medium">
                Found <strong className="text-slate-900 font-bold">{pagination.total}</strong> active tuition post{pagination.total !== 1 ? 's' : ''}
              </span>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center space-x-1.5 text-xs text-red-600 hover:text-red-700 font-bold bg-red-50 hover:bg-red-100/80 px-3 py-1.5 rounded-xl transition"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>

          </form>
        </div>

        {/* Tuition Card Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <TuitionCardSkeleton key={i} />
            ))}
          </div>
        ) : tuitions.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tuitions.map((tuition, index) => (
                <TuitionCard key={tuition._id} tuition={tuition} index={index} />
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-2">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition"
                >
                  Previous
                </button>
                <div className="flex space-x-1">
                  {[...Array(pagination.totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPage(idx + 1)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition shadow-sm ${
                        page === idx + 1
                          ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPages))}
                  disabled={page === pagination.totalPages}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              No Matching Tuition Batches
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
              We couldn't find any approved tuition postings matching your current filter criteria.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition"
            >
              Clear Filters & Show All
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
