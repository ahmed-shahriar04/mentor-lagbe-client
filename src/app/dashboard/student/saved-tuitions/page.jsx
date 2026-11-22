'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import TuitionCard from '@/components/TuitionCard';

export default function SavedTuitionsPage() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getBookmarks();
        if (res.success) setTuitions(res.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
          Saved / Bookmarked Tuitions
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Quickly access the tuition batches you have marked as favorites.
        </p>
      </div>

      {loading ? (
        <div className="h-64 bg-white rounded-2xl animate-pulse"></div>
      ) : tuitions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tuitions.map((t) => (
            <TuitionCard key={t._id} tuition={t} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-500">No bookmarked tuitions found. Browse tuitions and click 'Bookmark'.</p>
        </div>
      )}
    </div>
  );
}
