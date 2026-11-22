'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getStoredAuth, clearStoredAuth } from '@/lib/auth-client';
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

    const currentUser = auth.user;
    setUser(currentUser);

    // Strict Role-Based Route Guard
    if (pathname.startsWith('/dashboard/admin') && currentUser.role !== 'admin') {
      toast.error('Forbidden: Admin access required');
      router.push(`/dashboard/${currentUser.role}`);
      return;
    }

    if (pathname.startsWith('/dashboard/tutor') && currentUser.role !== 'tutor' && currentUser.role !== 'admin') {
      toast.error('Forbidden: Tutor privileges required');
      router.push('/dashboard/student');
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
    { name: 'Update Profile', href: '/dashboard/profile', icon: faUser },
    { name: 'Upgrade to Pro', href: '/pricing', icon: faCrown },
  ];

  // Tutor Navigation Links with FontAwesome Icons
  const tutorLinks = [
    { name: 'Overview', href: '/dashboard/tutor', icon: faChartLine },
    { name: 'Post a Tuition', href: '/dashboard/tutor/post-tuition', icon: faPlus },
    { name: 'My Created Tuitions', href: '/dashboard/tutor/my-tuitions', icon: faBook },
    { name: 'Manage Applicants', href: '/dashboard/tutor/applicants', icon: faUsers },
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
            <Link href="/dashboard/profile" title="Edit Profile">
              <img
                src={user.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop'}
                alt={user.name}
                className="w-11 h-11 rounded-2xl object-cover ring-2 ring-emerald-500/20 hover:ring-emerald-500 transition"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate">{user.name}</h4>
              <div className="flex items-center space-x-1 mt-0.5">
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                  role === 'admin' ? 'bg-purple-100 text-purple-700' : role === 'tutor' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {role}
                </span>
                {user.plan === 'pro' && (
                  <span className="text-[9px] font-bold px-1 rounded bg-amber-100 text-amber-800">
                    PRO
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
          </nav>
        </div>

        {/* Sidebar Bottom: Sign Out */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition text-left"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-3 text-red-500" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-6xl">
        {children}
      </main>
    </div>
  );
}
