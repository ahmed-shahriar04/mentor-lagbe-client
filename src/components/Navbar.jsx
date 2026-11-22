'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getStoredAuth, clearStoredAuth } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faBars,
  faTimes,
  faUser,
  faChartLine,
  faShieldAlt,
  faSignOutAlt,
  faSignInAlt,
  faBookOpen,
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const syncAuth = () => {
      const auth = getStoredAuth();
      setUser(auth?.user || null);
    };

    syncAuth();
    window.addEventListener('mentorlagbe_auth_change', syncAuth);
    return () => window.removeEventListener('mentorlagbe_auth_change', syncAuth);
  }, []);

  const handleSignOut = () => {
    clearStoredAuth();
    setUser(null);
    setDropdownOpen(false);
    setMenuOpen(false);
    toast.success('Signed out successfully');
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Browse Tuitions', href: '/tuitions' },
    { name: 'Pricing / Pro Plans', href: '/pricing' },
    { name: 'How It Works', href: '/#how-it-works' },
  ];

  const getDashboardHref = () => {
    if (!user) return '/sign-in';
    if (user.role === 'admin') return '/dashboard/admin';
    if (user.role === 'tutor') return '/dashboard/tutor';
    return '/dashboard/student';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navbar Container */}
        <div className="flex items-center justify-between h-16">
          
          {/* MOBILE LEFT: Burger Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200"
            >
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="w-5 h-5" />
            </button>
          </div>

          {/* BRAND LOGO & NAME (Mobile: Center, Desktop: Left) */}
          <div className="flex items-center justify-center md:justify-start">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <FontAwesomeIcon icon={faGraduationCap} className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-heading">
                  Mentor<span className="text-emerald-600">Lagbe</span>
                </span>
                <span className="text-[10px] text-slate-500 -mt-1 font-medium hidden sm:block">Smart Tuition & Mentorship</span>
              </div>
            </Link>
          </div>

          {/* DESKTOP CENTER: Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT SIDE: AUTH STATE (Mobile & Desktop) */}
          <div className="flex items-center space-x-3">
            {!user ? (
              /* When Logged Out: Sign In & Sign Up */
              <div className="flex items-center space-x-2">
                <Link
                  href="/sign-in"
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition flex items-center space-x-1.5 border border-slate-200 sm:border-transparent"
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/sign-up"
                  className="hidden sm:inline-block px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm shadow-emerald-600/30 transition transform active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              /* When Logged In: Only User Profile Image (Clicks directly to Profile Page) + PC Sign Out */
              <div className="flex items-center space-x-2">
                <Link
                  href="/dashboard/profile"
                  title="View / Update Profile"
                  className="relative group p-0.5 rounded-full ring-2 ring-emerald-500/40 hover:ring-emerald-600 transition"
                >
                  <img
                    src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=059669&color=fff&bold=true`}
                    alt={user.name || 'User Profile'}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=059669&color=fff&bold=true`;
                    }}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                  />
                  {user.plan === 'pro' && (
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold" title="Pro Member">
                      ✓
                    </span>
                  )}
                </Link>

                {/* PC ONLY: Sign Out icon button right beside profile avatar */}
                <button
                  type="button"
                  onClick={handleSignOut}
                  title="Sign Out"
                  aria-label="Sign Out"
                  className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition shadow-sm ml-1"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER / BURGER MENU */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          {/* User Preview in Mobile Drawer if logged in */}
          {user && (
            <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100 mb-2">
              <Link
                href="/dashboard/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center space-x-3 flex-1"
              >
                <img
                  src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=059669&color=fff&bold=true`}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=059669&color=fff&bold=true`;
                  }}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                </div>
              </Link>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                user.role === 'admin' ? 'bg-purple-100 text-purple-700' : user.role === 'tutor' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {user.role}
              </span>
            </div>
          )}

          {/* Navigation Items */}
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-50 rounded-xl"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Logged in Drawer Actions */}
          {user ? (
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <Link
                href={getDashboardHref()}
                onClick={() => setMenuOpen(false)}
                className="flex items-center px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl"
              >
                <FontAwesomeIcon icon={faChartLine} className="w-4 h-4 mr-3 text-slate-400" />
                <span>Dashboard ({user.role})</span>
              </Link>
              {user.role === 'admin' && (
                <Link
                  href="/dashboard/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-3 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-50 rounded-xl"
                >
                  <FontAwesomeIcon icon={faShieldAlt} className="w-4 h-4 mr-3 text-purple-500" />
                  <span>Admin Panel</span>
                </Link>
              )}
              <Link
                href="/dashboard/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl"
              >
                <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-3 text-slate-400" />
                <span>Update Profile</span>
              </Link>
              {/* Mobile Drawer Sign Out Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center px-4 py-2.5 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100/80 rounded-xl text-left border border-red-100 transition shadow-sm"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-3 text-red-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <Link
                href="/sign-in"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-xl"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
