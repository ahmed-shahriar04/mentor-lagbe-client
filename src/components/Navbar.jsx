'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getStoredAuth, clearStoredAuth } from '@/lib/auth-client';
import { api } from '@/lib/api';
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
  faChevronDown,
  faCrown,
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 250);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const syncAuth = () => {
      const auth = getStoredAuth();
      setUser(auth?.user || null);
    };

    syncAuth();

    // Background sync with database to reflect admin role updates immediately
    const auth = getStoredAuth();
    if (auth?.token) {
      api.getCurrentUser()
        .then((res) => {
          if (res?.success && res?.data) {
            const fresh = res.data;
            if (fresh.role !== auth.user?.role || fresh.plan !== auth.user?.plan) {
              const updated = { ...auth, user: { ...auth.user, ...fresh } };
              setStoredAuth(updated);
            }
          }
        })
        .catch(() => {});
    }

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
    { name: 'How It Works', href: '/how-it-works' },
  ];

  const getDashboardHref = () => {
    if (!user) return '/sign-in';
    if (user.role === 'admin') return '/dashboard/admin';
    if (user.role === 'tutor') return '/dashboard/tutor';
    return '/dashboard/student';
  };

  const getSvgAvatar = (name) => {
    const initial = (name || 'U').charAt(0).toUpperCase();
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%23059669"/><text x="50%" y="55%" font-family="system-ui,sans-serif" font-size="46" font-weight="bold" fill="%23ffffff" text-anchor="middle" dominant-baseline="middle">${initial}</text></svg>`;
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
              /* When Logged In: Profile Picture + Hover Arrow Dropdown (Dashboard, Profile, Logout) */
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-1.5 p-1 pr-2 rounded-full hover:bg-slate-100 transition cursor-pointer select-none border border-transparent hover:border-slate-200"
                >
                  <div className="relative group p-0.5 rounded-full ring-2 ring-emerald-500/40 hover:ring-emerald-600 transition">
                    <img
                      src={user.image || getSvgAvatar(user.name)}
                      alt={user.name || 'User Profile'}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getSvgAvatar(user?.name);
                      }}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    {user.plan === 'pro' && (
                      <img
                        src="/pro-badge.svg"
                        alt="Pro"
                        className="absolute -bottom-1 -right-1 w-4 h-4 drop-shadow-sm"
                        title="Pro Member"
                      />
                    )}
                  </div>
                  {/* Arrow Icon beside profile */}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${
                      dropdownOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </div>

                {/* Dropdown Menu on Hover / Click with Seamless Bridge (zero gap) */}
                {dropdownOpen && (
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="absolute right-0 top-full pt-1.5 w-60 z-50 animate-fade-in"
                  >
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 py-2">
                      {/* User Profile Header */}
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{user.email}</p>
                        <div className="mt-2 flex items-center space-x-1.5">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                              user.role === 'admin'
                                ? 'bg-purple-100 text-purple-700'
                                : user.role === 'tutor'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {user.role}
                          </span>
                          {user.plan === 'pro' && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200 flex items-center space-x-1">
                              <img src="/pro-badge.svg" alt="Pro" className="w-3 h-3 inline" />
                              <span>PRO</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Navigation Items */}
                      <div className="py-1">
                        <Link
                          href={getDashboardHref()}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 transition"
                        >
                          <FontAwesomeIcon
                            icon={user.role === 'admin' ? faShieldAlt : faChartLine}
                            className="w-3.5 h-3.5 text-slate-400"
                          />
                          <span>
                            {user.role === 'admin'
                              ? 'Admin Panel'
                              : user.role === 'tutor'
                              ? 'Tutor Dashboard'
                              : 'Student Dashboard'}
                          </span>
                        </Link>

                        <Link
                          href="/dashboard/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60 transition"
                        >
                          <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5 text-slate-400" />
                          <span>My Profile</span>
                        </Link>

                        {user.plan !== 'pro' && (
                          <Link
                            href="/pricing"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-amber-600 hover:bg-amber-50/60 transition"
                          >
                            <FontAwesomeIcon icon={faCrown} className="w-3.5 h-3.5 text-amber-500" />
                            <span>Upgrade to Pro</span>
                          </Link>
                        )}
                      </div>

                      {/* Sign Out Button */}
                      <div className="border-t border-slate-100 pt-1 mt-1">
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition text-left cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faSignOutAlt} className="w-3.5 h-3.5 text-red-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
                  src={user.image || getSvgAvatar(user.name)}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = getSvgAvatar(user?.name);
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
