'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { getStoredAuth, setStoredAuth, clearStoredAuth } from '@/lib/auth-client';
import { uploadToImgBB } from '@/lib/imgbb';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCamera, faSave, faTrash, faShieldAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

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

    async function loadFresh() {
      try {
        const res = await api.getCurrentUser();
        if (res?.success && res?.data) {
          const fresh = res.data;
          setUser(fresh);
          setName(fresh.name || '');
          setPhone(fresh.phone || '');
          setBio(fresh.bio || '');
          setImage(fresh.image || '');

          if (auth) {
            auth.user = { ...auth.user, ...fresh };
            setStoredAuth(auth);
          }
        }
      } catch (e) {
        // Continue with cached data if network issue
      }
    }
    loadFresh();
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-3xl mx-auto space-y-8 py-2"
    >
      {/* Profile Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Account Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading mt-2">
            Update Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Keep your contact information, phone, and profile photo up-to-date so students and mentors can reach you directly.
          </p>

          {/* Real-time Role & Status Indicators */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500">Assigned Role:</span>
            <span className={`px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider ${
              user?.role === 'admin'
                ? 'bg-purple-100 text-purple-800 border border-purple-200'
                : user?.role === 'tutor'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-blue-100 text-blue-800 border border-blue-200'
            }`}>
              {user?.role || 'student'}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">Tier:</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
              user?.plan === 'pro'
                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}>
              {user?.plan || 'free'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* Profile Avatar & direct file upload */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80">
            <div className="relative shrink-0">
              {image && !imgError ? (
                <img
                  src={image}
                  alt={name || 'Profile Avatar'}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-emerald-500/20 shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white font-extrabold text-3xl shadow-md ring-4 ring-emerald-500/20 shrink-0">
                  {(name || 'U').charAt(0).toUpperCase()}
                </div>
              )}
              {user?.plan === 'pro' && (
                <img
                  src="/pro-badge.svg"
                  alt="Pro"
                  className="absolute -bottom-2 -right-2 w-7 h-7 drop-shadow-md"
                  title="Verified Pro Member"
                />
              )}
            </div>

            <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                Profile Avatar Picture
              </label>
              <p className="text-[11px] text-slate-500">
                Upload a clear portrait photo (PNG, JPG or JPEG up to 5MB).
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  className="text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-white file:text-slate-700 hover:file:bg-emerald-50 hover:file:text-emerald-700 cursor-pointer border border-slate-200 rounded-xl"
                />
                {uploadingImage && (
                  <span className="text-xs text-emerald-600 font-semibold animate-pulse flex items-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-ping"></span>
                    Uploading photo...
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address (Permanent)
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Phone Number (For Batch Contacts)
            </label>
            <input
              type="tel"
              placeholder="+8801XXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Bio / Academic Background & Institution
            </label>
            <textarea
              rows="4"
              placeholder="Introduce your institution, graduation subject, previous teaching experience, or learning goals..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3.5 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/25 transition disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2"
          >
            <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
          </button>
        </form>
      </div>

      {/* Danger Zone: Delete Account */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-red-600 font-heading">
              Permanently Delete Account
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Once deleted, all your tuitions, applications, and bookmarks will be permanently removed.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={deleting}
            className="px-5 py-2.5 text-xs font-bold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-200 rounded-xl transition shadow-sm disabled:opacity-50 shrink-0 cursor-pointer"
          >
            {deleting ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
