'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TuitionCard from '@/components/TuitionCard';
import { TuitionCardSkeleton } from '@/components/SkeletonLoader';
import { api } from '@/lib/api';

export default function FeaturedTuitions() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await api.getFeaturedTuitions();
        if (res?.success && res?.data) {
          setTuitions(res.data);
        }
      } catch (err) {
        console.warn('Featured tuitions connection notice:', err?.message);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
              Curated Opportunities
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading mt-1">
              Latest Featured Tuitions
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Explore freshly published batches and 1-on-1 mentorship posts verified by our academic admins.
            </p>
          </div>
          <Link
            href="/tuitions"
            className="mt-4 sm:mt-0 inline-flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-700 transition"
          >
            View All Batches
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid of 6 equal cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <TuitionCardSkeleton key={i} />
            ))}
          </div>
        ) : tuitions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tuitions.map((tuition, index) => (
              <TuitionCard key={tuition._id} tuition={tuition} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-sm text-slate-500">No approved tuitions available at this moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
