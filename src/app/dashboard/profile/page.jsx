'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { getStoredAuth, setStoredAuth, clearStoredAuth } from '@/lib/auth-client';
import { uploadToImgBB } from '@/lib/imgbb';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');
  const [imgError, setImgError] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
      setImgError(false);
      toast.success('Profile photo uploaded successfully!');
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

  const handleDeleteAccount = async () => {
    const confirm = window.confirm(
      'Are you sure you want to permanently delete your account? All your data, applications, and tuitions will be removed. This action CANNOT be undone.'
    );
    if (!confirm) return;

    setDeleting(true);
    try {
      await api.deleteMyAccount();
      clearStoredAuth();
      toast.success('Your account has been permanently deleted.');
      router.push('/');
    } catch (err) {
      toast.error(err.message || 'Failed to delete account');
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
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
          {/* Profile Avatar & direct file upload */}
          <div className="flex items-center space-x-5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="relative shrink-0">
              {image && !imgError ? (
                <img
                  src={image}
                  alt={name || 'Profile Avatar'}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/20 shadow-sm"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-sm ring-2 ring-emerald-500/20 shrink-0">
                  {(name || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              {user?.plan === 'pro' && (
                <img
                  src="/pro-badge.svg"
                  alt="Pro"
                  className="absolute -bottom-1.5 -right-1.5 w-6 h-6 drop-shadow-md"
                  title="Verified Pro Member"
                />
              )}
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">
                Upload Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageUpload}
                className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-100 cursor-pointer"
              />
              {uploadingImage && (
                <p className="text-[11px] text-emerald-600 font-semibold animate-pulse">
                  Uploading photo...
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

      {/* Danger Zone: Delete Account */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-200/80 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-red-600 font-heading">
              Danger Zone
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Permanently delete your account and associated platform data.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={deleting}
            className="px-4 py-2 text-xs font-bold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-200 rounded-xl transition shadow-sm disabled:opacity-50"
          >
            {deleting ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
      </div>
    </div>
  );
}
