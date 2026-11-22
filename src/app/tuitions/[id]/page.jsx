'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { getStoredAuth } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function TuitionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Application modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [studentPhone, setStudentPhone] = useState('');
  const [selectedDays, setSelectedDays] = useState(['Sat', 'Mon', 'Wed']);
  const [timeSlot, setTimeSlot] = useState('Evening (6:00 PM - 7:30 PM)');
  const [studentNote, setStudentNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      if (selectedDays.length === 1) {
        return toast.error('Please keep at least 1 preferred day selected');
      }
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  useEffect(() => {
    const auth = getStoredAuth();
    setUser(auth?.user || null);

    async function loadData() {
      try {
        const res = await api.getTuitionDetails(id);
        if (res.success && res.data) {
          setTuition(res.data);
        }
        // Load reviews
        const revRes = await api.getTuitionReviews(id).catch(() => ({}));
        if (revRes?.success) {
          setReviews(revRes.data || []);
        }
      } catch (err) {
        console.error('Failed to load tuition:', err);
        toast.error('Could not load tuition details');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadData();
    }
  }, [id]);

  const handleBookmarkToggle = async () => {
    if (!user) {
      toast.error('Please sign in to save this tuition');
      return router.push('/sign-in');
    }
    if (user.role !== 'student') {
      toast.error('Only students can bookmark tuitions');
      return;
    }

    try {
      if (isBookmarked) {
        await api.removeBookmark(id);
        setIsBookmarked(false);
        toast.success('Removed from saved tuitions');
      } else {
        await api.addBookmark(id);
        setIsBookmarked(true);
        toast.success('Tuition bookmarked successfully!');
      }
    } catch (err) {
      toast.error(err.message || 'Bookmark action failed');
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    const finalSchedule = `${selectedDays.join(', ')} (${timeSlot})`;

    if (!studentPhone) {
      return toast.error('Please fill in your phone number');
    }

    setSubmitting(true);
    try {
      const res = await api.applyForTuition({
        tuitionId: id,
        studentPhone,
        preferredSchedule: finalSchedule,
        studentNote,
      });

      if (res.success) {
        toast.success('Application submitted successfully! The mentor will reach out.');
        setModalOpen(false);
        setStudentPhone('');
        setStudentNote('');
      }
    } catch (err) {
      toast.error(err.message || 'Application submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin"></div>
      </div>
    );
  }

  if (!tuition) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Tuition Not Found</h2>
        <Link href="/tuitions" className="mt-4 inline-block text-emerald-600 font-semibold text-sm">
          Return to Browse Tuitions
        </Link>
      </div>
    );
  }

  const tutor = tuition.tutorDetails || {};
  const isStudent = user?.role === 'student';
  const isTutorOrAdmin = user?.role === 'tutor' || user?.role === 'admin';

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-emerald-600">Home</Link>
          <span>/</span>
          <Link href="/tuitions" className="hover:text-emerald-600">Tuitions</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate max-w-xs">{tuition.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info Left Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Banner Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="relative h-72 sm:h-96 w-full">
                <img
                  src={tuition.bannerImage || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop'}
                  alt={tuition.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="badge-role bg-white/95 text-emerald-800 font-bold shadow">
                    {tuition.subject}
                  </span>
                  <span className={`badge-role text-white font-bold shadow ${
                    tuition.mode === 'Online' ? 'bg-blue-600' : 'bg-amber-600'
                  }`}>
                    {tuition.mode}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    {tuition.classLevel}
                  </span>
                  <span className="text-2xl font-extrabold text-slate-900 font-heading">
                    ৳{tuition.monthlyFee?.toLocaleString()}<span className="text-xs text-slate-500 font-normal"> / month</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-2">
                  {tuition.title}
                </h1>

                {/* Details highlights */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <p className="text-slate-400">Class Mode</p>
                    <p className="font-bold text-slate-800 mt-0.5">{tuition.mode}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Days Per Week</p>
                    <p className="font-bold text-slate-800 mt-0.5">{tuition.daysPerWeek} Days / Week</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Location / Platform</p>
                    <p className="font-bold text-slate-800 mt-0.5 truncate">{tuition.location || 'Online'}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-slate-900 font-heading mb-3">
                    Batch Description & Syllabus Coverage
                  </h3>
                  <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {tuition.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Student Reviews Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 font-heading mb-4">
                Learner Reviews & Ratings ({reviews.length})
              </h3>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((r, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2.5">
                          <img
                            src={r.studentImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=80&auto=format&fit=crop'}
                            alt={r.studentName}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <span className="text-xs font-bold text-slate-800">{r.studentName}</span>
                        </div>
                        <span className="text-amber-500 text-xs font-bold">
                          {'★'.repeat(r.rating || 5)}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{r.feedback}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">No reviews submitted yet for this tuition batch.</p>
              )}
            </div>
          </div>

          {/* Right Column: Tutor Profile & Role-Restricted Apply Action */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tutor Profile Summary Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
                About the Mentor
              </span>
              <div className="mt-4 flex items-center space-x-3.5">
                <div className="relative shrink-0">
                  <img
                    src={tutor.image || tuition.tutorImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'}
                    alt={tutor.name || tuition.tutorName}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop';
                    }}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/20 shadow-sm"
                  />
                  {tutor.plan === 'pro' && (
                    <img
                      src="/pro-badge.svg"
                      alt="Pro"
                      className="absolute -bottom-1 -right-1 w-5 h-5 drop-shadow-md"
                      title="Pro Verified Mentor"
                    />
                  )}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-heading">
                    {tutor.name || tuition.tutorName}
                  </h4>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                      Tutor
                    </span>
                    {tutor.plan === 'pro' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 flex items-center space-x-1">
                        <img src="/pro-badge.svg" alt="Pro" className="w-3.5 h-3.5 inline" />
                        <span>Pro Verified Mentor</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-600 leading-relaxed">
                {tutor.bio || 'Verified academic educator on MentorLagbe specializing in board curriculum and admission mentorship.'}
              </p>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3 pt-6 border-t border-slate-100">
                {/* Apply Button Flow */}
                {!user ? (
                  <Link
                    href="/sign-in"
                    className="w-full block text-center py-3 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/25 transition"
                  >
                    Sign In to Apply
                  </Link>
                ) : isStudent ? (
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full py-3 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/25 transition transform active:scale-95"
                  >
                    Apply for Tuition
                  </button>
                ) : (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center">
                    <p className="text-xs font-semibold text-amber-800">
                      Role Notice: Only Students can apply
                    </p>
                    <p className="text-[11px] text-amber-700 mt-0.5">
                      You are signed in as a {user.role}. Tuition applications are role-restricted for students.
                    </p>
                  </div>
                )}

                {/* Bookmark Action */}
                {isStudent && (
                  <button
                    onClick={handleBookmarkToggle}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition flex items-center justify-center space-x-2"
                  >
                    <svg className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-600 text-emerald-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span>{isBookmarked ? 'Saved in Bookmarks' : 'Bookmark Tuition'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
              Student Enrollment Form
            </span>
            <h3 className="text-xl font-bold text-slate-900 font-heading mt-1">
              Apply for {tuition.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Monthly Fee: <strong>৳{tuition.monthlyFee?.toLocaleString()}</strong> | Mentor: <strong>{tuition.tutorName}</strong>
            </p>

            <form onSubmit={handleApplySubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+8801XXXXXXXXX"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                />
              </div>

              {/* Interactive Weekly Days Routine Selector */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Preferred Class Days *
                  </label>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {selectedDays.length} days selected
                  </span>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`py-2 rounded-xl text-xs font-bold transition shadow-sm border text-center ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-emerald-600/20'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Shift / Time Slot Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Preferred Time Slot *
                </label>
                <div className="relative">
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full appearance-none px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none cursor-pointer pr-8"
                  >
                    <option value="Evening (6:00 PM - 7:30 PM)">🌇 Evening Batch (6:00 PM - 7:30 PM) [Popular]</option>
                    <option value="Night (8:00 PM - 9:30 PM)">🌙 Night Batch (8:00 PM - 9:30 PM)</option>
                    <option value="Afternoon (3:30 PM - 5:00 PM)">☀️ Afternoon Batch (3:30 PM - 5:00 PM)</option>
                    <option value="Morning (8:30 AM - 10:00 AM)">🌅 Morning Batch (8:30 AM - 10:00 AM)</option>
                    <option value="Flexible / Negotiable">⚡ Flexible / Discuss with Mentor</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              {/* Live Routine Preview Box */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-center space-x-2.5 text-xs">
                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <span className="text-slate-500 font-medium">Selected Routine: </span>
                  <span className="font-bold text-emerald-800">
                    {selectedDays.join(', ')} ({timeSlot})
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Learning Note (Optional)
                </label>
                <textarea
                  rows="3"
                  placeholder="Tell the tutor about your target exams, current weak areas, or specific goals..."
                  value={studentNote}
                  onChange={(e) => setStudentNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Confirm Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
