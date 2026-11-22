'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

export default function TutorApplicantsPage() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await api.getTutorApplicants();
      if (res.success) setApplicants(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.updateApplicationStatus(id, status);
      toast.success(`Application ${status}`);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
          Manage Applicants
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review incoming student enrollment requests for your tuition batches.
        </p>
      </div>

      {loading ? (
        <div className="h-64 bg-white rounded-2xl animate-pulse"></div>
      ) : applicants.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Student</th>
                  <th className="px-5 py-3.5">Contact</th>
                  <th className="px-5 py-3.5">Tuition Batch</th>
                  <th className="px-5 py-3.5">Schedule & Note</th>
                  <th className="px-5 py-3.5">Current Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applicants.map((a) => (
                  <tr key={a._id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {a.studentName}
                      <span className="block text-[11px] text-slate-400 font-normal">{a.studentEmail}</span>
                    </td>
                    <td className="px-5 py-4 font-mono">{a.studentPhone}</td>
                    <td className="px-5 py-4 font-medium text-slate-800">{a.tuitionTitle}</td>
                    <td className="px-5 py-4 max-w-xs">
                      <span className="block font-semibold text-slate-700">{a.preferredSchedule}</span>
                      {a.studentNote && <span className="block text-[11px] text-slate-400 truncate">{a.studentNote}</span>}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        a.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : a.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleStatusUpdate(a._id, 'accepted')}
                        className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(a._id, 'rejected')}
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
          <p className="text-xs text-slate-500">No student applications received yet.</p>
        </div>
      )}
    </div>
  );
}
