'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { getStoredAuth, setStoredAuth } from '@/lib/auth-client';
import { uploadToImgBB } from '@/lib/imgbb';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const auth = getStoredAuth();
    if (auth?.user) {
      setUser(auth.user);
      setName(auth.user.name || '');
      setPhone(auth.user.phone || '');
      setBio(auth.user.bio || '');
      setImage(auth.user.image || '');
    }
  }, []);

  // Challenge 3: Direct file upload via ImgBB API for user profile
  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadToImgBB(file);
      setImage(url);
      toast.success('Profile photo uploaded via ImgBB!');
    } catch (err) {
      toast.error(err.message || 'Image upload failed. You can paste an image URL instead.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.updateProfile({
        name,
        phone,
        bio,
        image,
      });

      if (res.success && res.data) {
        // Update local session
        const auth = getStoredAuth();
        if (auth) {
          auth.user = { ...auth.user, ...res.data };
          setStoredAuth(auth);
          setUser(auth.user);
        }
        toast.success('Profile updated successfully!');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
          Personal Information
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading mt-1">
          Update Profile
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Keep your contact information and photo updated so mentors and students can connect with you.
        </p>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-5">
        {/* Profile Avatar & ImgBB direct file upload */}
        <div className="flex items-center space-x-5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <img
            src={image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop'}
            alt="Profile Avatar"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/20"
          />
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800">
              Upload Profile Picture (ImgBB API)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageUpload}
              className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-100 cursor-pointer"
            />
            {uploadingImage && (
              <p className="text-[11px] text-emerald-600 font-semibold animate-pulse">
                Uploading to ImgBB...
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Email (Cannot be changed)</label>
          <input
            type="email"
            disabled
            value={user?.email || ''}
            className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="+8801XXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Bio / Academic Background</label>
          <textarea
            rows="3"
            placeholder="Introduce your institution, graduation subject, or learning goals..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Profile Changes'}
        </button>
      </form>
    </div>
  );
}
