'use client';

import { useState, useEffect } from 'react';
import TuitionCard from '@/components/TuitionCard';
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

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
            Verified Academic Batches
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading mt-1">
            Browse All Available Tuitions
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Explore active tuition postings verified by administrators across Bangladesh.
          </p>
        </div>

        {/* Challenge 1: Server-Side Search & Filter Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, subject, tutor name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-24 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
              />
              <svg className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button
                type="submit"
                className="absolute right-2 top-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-lg transition"
              >
                Search
              </button>
            </div>

            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
              {/* Subject Filter */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => { setSubject(e.target.value); setPage(1); }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-emerald-500 focus:border-emerald-500"
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
              </div>

              {/* Class Level */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Class Level</label>
                <select
                  value={classLevel}
                  onChange={(e) => { setClassLevel(e.target.value); setPage(1); }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">All Class Levels</option>
                  <option value="Class 9 / 10">Class 9 / 10</option>
                  <option value="Class 10 / SSC">Class 10 / SSC</option>
                  <option value="Class 11 & 12">Class 11 & 12</option>
                  <option value="Class 12 / HSC">Class 12 / HSC</option>
                  <option value="Admission Aspirants">Admission Aspirants</option>
                  <option value="University / Job Candidates">University / Job</option>
                </select>
              </div>

              {/* Mode: Online / Offline */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Mode</label>
                <select
                  value={mode}
                  onChange={(e) => { setMode(e.target.value); setPage(1); }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">All Modes</option>
                  <option value="Online">Online Only</option>
                  <option value="Offline">Offline / Home Visit</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Sort By Fee</label>
                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="fee_low_high">Fee: Low to High</option>
                  <option value="fee_high_low">Fee: High to Low</option>
                </select>
              </div>
            </div>

            {/* Filter status & Reset button */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-500">
                Found <strong>{pagination.total}</strong> approved tuition batch{pagination.total !== 1 ? 'es' : ''}
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          </form>
        </div>

        {/* Tuition Card Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 rounded-2xl bg-white animate-pulse border border-slate-200 p-5">
                <div className="h-44 bg-slate-200 rounded-xl mb-4"></div>
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-slate-100 rounded-lg mt-auto"></div>
              </div>
            ))}
          </div>
        ) : tuitions.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tuitions.map((tuition) => (
                <TuitionCard key={tuition._id} tuition={tuition} />
              ))}
            </div>

            {/* Optional 1: Server-Side Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center space-x-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>
                {[...Array(pagination.totalPages)].map((_, idx) => {
                  const pNum = idx + 1;
                  return (
                    <button
                      key={pNum}
                      onClick={() => setPage(pNum)}
                      className={`w-9 h-9 text-xs font-bold rounded-lg transition ${
                        page === pNum
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}
                <button
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8">
            <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-bold text-slate-800 font-heading">No Tuitions Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No approved batches matched your current search criteria. Try clearing some filters or searching with another term.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-600 border border-emerald-300 rounded-lg hover:bg-emerald-50 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
