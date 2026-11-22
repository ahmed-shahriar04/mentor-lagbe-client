'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { TableSkeleton } from '@/components/SkeletonLoader';
import toast from 'react-hot-toast';

export default function StudentMyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadApps = async () => {
    try {
      const res = await api.getMyApplications();
      if (res.success) setApplications(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApps();
  }, []);

  const handleCancel = async (id) => {
    if (!confirm('Are you sure you want to cancel this application?')) return;
    try {
      await api.cancelApplication(id);
      toast.success('Application cancelled');
      loadApps();
    } catch (err) {
      toast.error(err.message || 'Failed to cancel');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
          My Applications
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Track the status of your tuition applications. You can cancel any application while its status is pending.
        </p>
      </div>

      {loading ? (
        <TableSkeleton rows={4} cols={5} />
      ) : applications.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Tuition Batch</th>
                  <th className="px-5 py-3.5">Tutor Email</th>
                  <th className="px-5 py-3.5">Monthly Fee</th>
                  <th className="px-5 py-3.5">Applied Date</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {app.tuitionTitle}
                      <span className="block text-[11px] text-slate-400 font-normal">{app.subject}</span>
                    </td>
                    <td className="px-5 py-4">{app.tutorEmail}</td>
                    <td className="px-5 py-4 font-bold text-slate-900">৳{app.monthlyFee?.toLocaleString()}</td>
                    <td className="px-5 py-4">{new Date(app.appliedAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        app.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {app.status === 'pending' ? (
                        <button
                          onClick={() => handleCancel(app._id)}
                          className="px-3 py-1 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Finalized</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-500">You haven't submitted any tuition applications yet.</p>
        </div>
      )}
    </div>
  );
}
