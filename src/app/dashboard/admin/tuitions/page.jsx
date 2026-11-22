'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminTuitionsPage() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await api.getAdminTuitions();
      if (res.success) setTuitions(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApproval = async (id, approvalStatus) => {
    try {
      await api.updateTuitionApproval(id, approvalStatus);
      toast.success(`Tuition marked as ${approvalStatus}`);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Failed to update approval');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
          Admin Tuition Moderation Flow
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review all tutor listings and approve or reject batches for public visibility.
        </p>
      </div>

      {loading ? (
        <div className="h-64 bg-white rounded-2xl animate-pulse"></div>
      ) : tuitions.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Title & Subject</th>
                  <th className="px-5 py-3.5">Tutor</th>
                  <th className="px-5 py-3.5">Fee</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tuitions.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {t.title}
                      <span className="block text-[11px] text-slate-400 font-normal">{t.subject} • {t.classLevel}</span>
                    </td>
                    <td className="px-5 py-4">
                      {t.tutorName}
                      <span className="block text-[11px] text-slate-400 font-mono">{t.tutorEmail}</span>
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900">৳{t.monthlyFee?.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        t.approvalStatus === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : t.approvalStatus === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {t.approvalStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleApproval(t._id, 'approved')}
                        className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleApproval(t._id, 'rejected')}
                        className="px-2.5 py-1 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-500">No tuitions found.</p>
        </div>
      )}
    </div>
  );
}
