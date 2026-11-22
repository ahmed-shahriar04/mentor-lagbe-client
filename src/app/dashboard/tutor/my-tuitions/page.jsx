'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function MyTuitionsPage() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [editingTuition, setEditingTuition] = useState(null);
  const [editFee, setEditFee] = useState('');
  const [editTitle, setEditTitle] = useState('');

  const loadData = async () => {
    try {
      const res = await api.getMyTuitions();
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

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this tuition post?')) return;
    try {
      await api.deleteTuition(id);
      toast.success('Tuition deleted successfully');
      loadData();
    } catch (err) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await api.toggleTuitionStatus(id);
      toast.success(res.message || 'Status updated');
      loadData();
    } catch (err) {
      toast.error(err.message || 'Failed to toggle status');
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingTuition) return;

    try {
      await api.updateTuition(editingTuition._id, {
        title: editTitle,
        monthlyFee: parseFloat(editFee),
      });
      toast.success('Tuition updated');
      setEditingTuition(null);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Failed to update');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
            My Created Tuitions
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your batches, update fees, delete, or toggle active/closed status.
          </p>
        </div>
        <Link
          href="/dashboard/tutor/post-tuition"
          className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow transition"
        >
          + Post New Batch
        </Link>
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
                  <th className="px-5 py-3.5">Monthly Fee</th>
                  <th className="px-5 py-3.5">Approval Status</th>
                  <th className="px-5 py-3.5">Active Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tuitions.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {t.title}
                      <span className="block text-[11px] text-slate-400 font-normal">{t.subject} ({t.classLevel})</span>
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
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggleStatus(t._id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                          t.isActive
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        {t.isActive ? 'Active' : 'Closed'}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingTuition(t);
                          setEditTitle(t.title);
                          setEditFee(t.monthlyFee);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="px-2.5 py-1 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                      >
                        Delete
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
          <p className="text-xs text-slate-500">You haven't posted any tuitions yet.</p>
        </div>
      )}

      {/* Edit Modal */}
      {editingTuition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 font-heading mb-4">Edit Tuition Details</h3>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Fee (BDT)</label>
                <input
                  type="number"
                  required
                  value={editFee}
                  onChange={(e) => setEditFee(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-50"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingTuition(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
