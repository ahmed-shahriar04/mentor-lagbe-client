'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { uploadToImgBB } from '@/lib/imgbb';
import toast from 'react-hot-toast';

export default function PostTuitionPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Higher Mathematics');
  const [classLevel, setClassLevel] = useState('Class 12 / HSC');
  const [mode, setMode] = useState('Online');
  const [location, setLocation] = useState('');
  const [monthlyFee, setMonthlyFee] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState('3');
  const [description, setDescription] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Challenge 3: Direct image file upload using ImgBB API
  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadToImgBB(file);
      setBannerImage(url);
      toast.success('Banner image uploaded successfully via ImgBB!');
    } catch (err) {
      toast.error(err.message || 'Image upload failed. You can paste a direct image URL as fallback.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        title,
        subject,
        classLevel,
        mode,
        location: location || (mode === 'Online' ? 'Online' : 'Location Not Specified'),
        monthlyFee: parseFloat(monthlyFee),
        daysPerWeek: parseInt(daysPerWeek, 10),
        description,
        bannerImage: bannerImage || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
      };

      const res = await api.createTuition(payload);
      if (res.success) {
        toast.success('Tuition submitted! Awaiting Admin approval.');
        router.push('/dashboard/tutor/my-tuitions');
      }
    } catch (err) {
      if (err.data?.code === 'LIMIT_REACHED') {
        toast.error('Free plan quota reached (max 2 tuitions). Please upgrade to Pro!');
      } else {
        toast.error(err.message || 'Failed to submit tuition');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
          Create Listing
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading mt-1">
          Post a Tuition Batch
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Provide complete details about your curriculum, days, and monthly fee.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Tuition Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g., HSC Higher Mathematics Complete Batch (Paper 1 & 2)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Subject *</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-emerald-500 focus:border-emerald-500"
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
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-emerald-500 focus:border-emerald-500"
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Mode *</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline / Home Visit</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Fee (BDT) *</label>
            <input
              type="number"
              required
              min="0"
              placeholder="e.g. 3500"
              value={monthlyFee}
              onChange={(e) => setMonthlyFee(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Days Per Week *</label>
            <input
              type="number"
              required
              min="1"
              max="7"
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Location or Platform (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g., Dhanmondi, Dhaka or Zoom Live"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
          />
        </div>

        {/* Challenge 3: ImgBB Banner Upload */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Banner Image (Direct File Upload via ImgBB API)
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
              className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
            />
            {uploadingImage && (
              <span className="text-xs text-emerald-600 font-semibold animate-pulse">
                Uploading to ImgBB...
              </span>
            )}
          </div>
          {bannerImage && (
            <div className="mt-3">
              <img src={bannerImage} alt="Uploaded Banner" className="w-40 h-24 object-cover rounded-xl border border-slate-200" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Detailed Description & Syllabus *
          </label>
          <textarea
            required
            rows="4"
            placeholder="Outline your topics, problem solving sessions, previous board questions solving, mock tests..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition disabled:opacity-50"
        >
          {submitting ? 'Submitting Tuition...' : 'Submit Tuition for Admin Approval'}
        </button>
      </form>
    </div>
  );
}
