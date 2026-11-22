'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { uploadToImgBB } from '@/lib/imgbb';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes, faCheck, faBan } from '@fortawesome/free-solid-svg-icons';

export default function AdminTuitionsPage() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [editingTuition, setEditingTuition] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSubject, setEditSubject] = useState('');
  const [editClassLevel, setEditClassLevel] = useState('');
  const [editMode, setEditMode] = useState('Online');
  const [editFee, setEditFee] = useState('');
  const [editDays, setEditDays] = useState('3');
  const [editLocation, setEditLocation] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editBannerImage, setEditBannerImage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

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

  const openEditModal = (t) => {
    setEditingTuition(t);
    setEditTitle(t.title || '');
    setEditSubject(t.subject || 'Higher Mathematics');
    setEditClassLevel(t.classLevel || 'Class 12 / HSC');
    setEditMode(t.mode || 'Online');
    setEditFee(t.monthlyFee || '');
    setEditDays(t.daysPerWeek || '3');
    setEditLocation(t.location || '');
    setEditDescription(t.description || '');
    setEditBannerImage(t.bannerImage || '');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadToImgBB(file);
      setEditBannerImage(url);
      toast.success('Image uploaded via ImgBB!');
    } catch (err) {
      toast.error(err.message || 'Image upload failed. You can paste an image URL instead.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingTuition) return;

    setSaving(true);
    try {
      await api.updateTuition(editingTuition._id, {
        title: editTitle,
        subject: editSubject,
        classLevel: editClassLevel,
        mode: editMode,
        monthlyFee: parseFloat(editFee),
        daysPerWeek: parseInt(editDays, 10),
        location: editLocation,
        description: editDescription,
        bannerImage: editBannerImage,
      });
      toast.success('Tuition & banner updated successfully!');
      setEditingTuition(null);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Failed to update tuition');
    } finally {
      setSaving(false);
    }
  };

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
          Admin Tuition Moderation & Editing
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review all tutor listings, edit banners/content, and approve or reject batches.
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
                  <th className="px-5 py-3.5">Banner & Title</th>
                  <th className="px-5 py-3.5">Tutor Email</th>
                  <th className="px-5 py-3.5">Fee</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Moderation & Edit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tuitions.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-semibold text-slate-800 flex items-center space-x-3">
                      <img
                        src={t.bannerImage || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=200&auto=format&fit=crop'}
                        alt={t.title}
                        className="w-14 h-10 object-cover rounded-lg border border-slate-200 shrink-0"
                      />
                      <div>
                        <span className="line-clamp-1 max-w-xs">{t.title}</span>
                        <span className="block text-[11px] text-slate-400 font-normal">{t.subject} • {t.classLevel}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-[11px]">{t.tutorEmail}</td>
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
                        onClick={() => openEditModal(t)}
                        className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                      >
                        <FontAwesomeIcon icon={faEdit} className="w-3 h-3 mr-1" />
                        Edit
                      </button>
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

      {/* Admin Edit Modal */}
      {editingTuition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Admin: Edit Tuition Batch & Photos
              </h3>
              <button
                type="button"
                onClick={() => setEditingTuition(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>Banner Image (Photo)</span>
                  {uploadingImage && <span className="text-emerald-600 text-[11px] animate-pulse">Uploading to ImgBB...</span>}
                </label>
                
                {editBannerImage && (
                  <div className="relative h-44 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img src={editBannerImage} alt="Banner Preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Upload from Device (ImgBB API)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-100 cursor-pointer w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Or Paste Direct Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={editBannerImage}
                      onChange={(e) => setEditBannerImage(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs bg-slate-50 focus:bg-white outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subject *</label>
                  <select
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-50"
                  >
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

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Class Level *</label>
                  <select
                    value={editClassLevel}
                    onChange={(e) => setEditClassLevel(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-50"
                  >
                    <option value="Class 9 / 10">Class 9 / 10</option>
                    <option value="Class 10 / SSC">Class 10 / SSC</option>
                    <option value="Class 11 & 12">Class 11 & 12</option>
                    <option value="Class 12 / HSC">Class 12 / HSC</option>
                    <option value="Admission Aspirants">Admission Aspirants</option>
                    <option value="University / Job Candidates">University / Job</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mode *</label>
                  <select
                    value={editMode}
                    onChange={(e) => setEditMode(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-50"
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Fee (BDT) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={editFee}
                    onChange={(e) => setEditFee(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Days Per Week *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="7"
                    value={editDays}
                    onChange={(e) => setEditDays(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description & Syllabus</label>
                <textarea
                  rows="3"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3.5 py-2 border rounded-xl text-xs bg-slate-50"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTuition(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow flex items-center space-x-1.5 disabled:opacity-50"
                >
                  <FontAwesomeIcon icon={faSave} className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
