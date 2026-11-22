'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getStoredAuth, clearStoredAuth } from '@/lib/auth-client';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faClipboardList,
  faBookmark,
  faUser,
  faCrown,
  faPlus,
  faBook,
  faUsers,
  faBolt,
  faShieldAlt,
  faCreditCard,
  faSignOutAlt,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const auth = getStoredAuth();
    if (!auth || !auth.user) {
      toast.error('Please sign in to access the dashboard');
      router.push('/sign-in');
      setLoading(false);
      return;
    }

    let currentUser = auth.user;
    setUser(currentUser);

    // Live sync user profile and role from MongoDB in real time
    async function syncFreshUser() {
      try {
        const res = await api.getCurrentUser();
        if (res?.success && res?.data) {
          const fresh = res.data;
          const roleChanged = fresh.role && fresh.role !== currentUser.role;
          const planChanged = fresh.plan !== currentUser.plan;
          
          if (roleChanged || planChanged || fresh.name !== currentUser.name || fresh.image !== currentUser.image) {
            const updatedAuth = { ...auth, user: { ...currentUser, ...fresh } };
            setStoredAuth(updatedAuth);
            setUser(updatedAuth.user);
            currentUser = updatedAuth.user;

            if (roleChanged) {
              toast.success(`Role updated: You now have full ${fresh.role.toUpperCase()} privileges!`, {
                icon: '🎉',
                duration: 4000,
              });
              if (fresh.role === 'tutor' && pathname.includes('/dashboard/student')) {
                window.location.href = '/dashboard/tutor';
              } else if (fresh.role === 'student' && pathname.includes('/dashboard/tutor')) {
                window.location.href = '/dashboard/student';
              }
            }
          }
        }
      } catch (err) {
        // Silently ignore if offline
      }
    }

    syncFreshUser();

    // Strict Role-Based Route Guard
    if (pathname.startsWith('/dashboard/admin') && currentUser.role !== 'admin') {
      toast.error('Forbidden: Admin access required');
      router.push(`/dashboard/${currentUser.role || 'student'}`);
      return;
    }

    if (pathname.startsWith('/dashboard/tutor') && currentUser.role !== 'tutor' && currentUser.role !== 'admin') {
      toast.error('Forbidden: Tutor privileges required');
      router.push('/dashboard/student');
      return;
    }

    if (pathname.startsWith('/dashboard/student') && currentUser.role === 'tutor') {
      router.push('/dashboard/tutor');
      return;
    }

    setLoading(false);
  }, [pathname, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin"></div>
        <p className="mt-4 text-xs font-semibold text-slate-500 animate-pulse">
          Verifying secure credentials & role permissions...
        </p>
      </div>
    );
  }

  const role = user.role;

  // Student Navigation Links with FontAwesome Icons
  const studentLinks = [
    { name: 'Overview', href: '/dashboard/student', icon: faChartLine },
    { name: 'My Applications', href: '/dashboard/student/my-applications', icon: faClipboardList },
    { name: 'Saved Tuitions', href: '/dashboard/student/saved-tuitions', icon: faBookmark },
    { name: 'Payment Receipts', href: '/dashboard/payments', icon: faCreditCard },
    { name: 'Update Profile', href: '/dashboard/profile', icon: faUser },
    { name: 'Upgrade to Pro', href: '/pricing', icon: faCrown },
  ];

  // Tutor Navigation Links with FontAwesome Icons
  const tutorLinks = [
    { name: 'Overview', href: '/dashboard/tutor', icon: faChartLine },
    { name: 'Post a Tuition', href: '/dashboard/tutor/post-tuition', icon: faPlus },
    { name: 'My Created Tuitions', href: '/dashboard/tutor/my-tuitions', icon: faBook },
    { name: 'Manage Applicants', href: '/dashboard/tutor/applicants', icon: faUsers },
    { name: 'Payment Receipts', href: '/dashboard/payments', icon: faCreditCard },
    { name: 'Update Profile', href: '/dashboard/profile', icon: faUser },
    { name: 'Upgrade to Pro', href: '/pricing', icon: faCrown },
  ];

  // Admin Navigation Links with FontAwesome Icons
  const adminLinks = [
    { name: 'Admin Overview', href: '/dashboard/admin', icon: faBolt },
    { name: 'User Management', href: '/dashboard/admin/users', icon: faUsers },
    { name: 'Tuition Moderation', href: '/dashboard/admin/tuitions', icon: faShieldAlt },
    { name: 'Stripe Transactions', href: '/dashboard/admin/transactions', icon: faCreditCard },
    { name: 'Update Profile', href: '/dashboard/profile', icon: faUser },
  ];

  const currentLinks = role === 'admin' ? adminLinks : role === 'tutor' ? tutorLinks : studentLinks;

  const handleSignOut = () => {
    clearStoredAuth();
    toast.success('Signed out successfully');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle Button */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-800 text-sm font-heading">
            {role.toUpperCase()} PORTAL
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200"
        >
          <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          {/* Sidebar Top: User Profile Badge */}
          <div className="p-6 border-b border-slate-100 flex items-center space-x-3">
            <Link href="/dashboard/profile" title="Edit Profile" className="relative shrink-0">
              <img
                src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=059669&color=fff&bold=true`}
                alt={user.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=059669&color=fff&bold=true`;
                }}
                className="w-11 h-11 rounded-2xl object-cover ring-2 ring-emerald-500/20 hover:ring-emerald-500 transition shadow-sm"
              />
              {user.plan === 'pro' && (
                <img
                  src="/pro-badge.svg"
                  alt="Pro"
                  className="absolute -bottom-1 -right-1 w-4 h-4 drop-shadow-sm"
                  title="Verified Pro Member"
                />
              )}
            </Link>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate">{user.name}</h4>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                  role === 'admin' ? 'bg-purple-100 text-purple-700' : role === 'tutor' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {role}
                </span>
                {user.plan === 'pro' && (
                  <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    <img src="/pro-badge.svg" alt="Pro" className="w-3 h-3 inline" />
                    <span>PRO</span>
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-slate-600"
            >
              <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links with FontAwesome Icons */}
          <nav className="p-4 space-y-1">
            {currentLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    active
                      ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <FontAwesomeIcon icon={link.icon} className={`w-4 h-4 mr-3 shrink-0 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {/* Quick Sign Out in Sidebar Menu */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition text-left"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-3 shrink-0 text-red-500" />
                <span>Sign Out</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Sidebar Bottom: Highlighted Sign Out Button */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 shadow-sm transition"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-3.5 h-3.5 mr-2.5 text-red-500" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area: Full Width with smooth responsive padding */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
