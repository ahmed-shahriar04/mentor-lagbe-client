'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function AnimatedCounter({ target, duration = 1800, suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo for ultra smooth acceleration & soft deceleration
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * target;
      setCount(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current));

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [target, duration, decimals]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-slate-50 pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-bold border border-emerald-200/50 shadow-sm animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Smart Tuition & Mentorship Platform</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
              Find Your <span className="text-emerald-600">Ideal Tutor</span> or Mentorship Batch Today
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Connect with top university graduates, experienced lecturers, and verified mentors in Bangladesh. Filter by subject, class level, mode, and budget.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <Link
                href="/tuitions"
                className="w-full sm:w-auto px-7 py-3.5 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-600/25 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl text-center"
              >
                Browse All Tuitions
              </Link>
              <Link
                href="/sign-up"
                className="w-full sm:w-auto px-7 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-xl transition-all duration-300 transform hover:-translate-y-1 text-center shadow-sm"
              >
                Register as a Tutor
              </Link>
            </div>

            {/* Quick stats mini-bar with Animated Count-up Numbers */}
            <div className="pt-6 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 border-t border-slate-200/80">
              <div className="group transition-transform hover:-translate-y-0.5">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                  <AnimatedCounter target={500} suffix="+" />
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Verified Tutors</p>
              </div>
              <div className="group transition-transform hover:-translate-y-0.5">
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                  <AnimatedCounter target={12000} suffix="+" />
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Enrolled Students</p>
              </div>
              <div className="group transition-transform hover:-translate-y-0.5">
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-heading tracking-tight">
                  <AnimatedCounter target={99.4} decimals={1} suffix="%" />
                </p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          {/* Hero Illustration - Transparent, Clean & Big */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <div className="w-full flex items-center justify-center p-0">
              <object
                data="/teacher-student-animate.svg"
                type="image/svg+xml"
                aria-label="Teacher and student animated tuition illustration"
                className="w-full h-auto min-h-[360px] sm:min-h-[460px] lg:min-h-[540px] max-w-none scale-105 sm:scale-115 lg:scale-135 object-contain pointer-events-none"
              >
                <img
                  src="/teacher-student-animate.svg"
                  alt="Teacher and student animated tuition illustration"
                  className="w-full h-auto min-h-[360px] sm:min-h-[460px] lg:min-h-[540px] scale-105 sm:scale-115 lg:scale-135 object-contain"
                />
              </object>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
