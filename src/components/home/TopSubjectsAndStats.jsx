'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { api } from '@/lib/api';
import {
  faCalculator,
  faAtom,
  faComments,
  faCode,
  faFlask,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';

export default function TopSubjectsAndStats() {
  const [subjectCounts, setSubjectCounts] = useState({
    'Higher Mathematics': 2,
    'Physics (Board & Admission)': 1,
    'IELTS & Spoken English': 3,
    'ICT & Programming': 3,
    'Chemistry & Biology': 3,
    'Accounting & Commerce': 1,
  });

  useEffect(() => {
    async function loadSubjectStats() {
      try {
        const res = await api.getPlatformStats();
        if (res?.success && res?.data?.subjects) {
          setSubjectCounts(res.data.subjects);
        }
      } catch (err) {
        // Fallback silently if offline
      }
    }
    loadSubjectStats();
  }, []);

  const subjects = [
    { name: 'Higher Mathematics', fallbackCount: 'Browse Batches', icon: faCalculator, color: 'text-blue-600 bg-blue-50', href: '/tuitions?subject=Higher+Mathematics' },
    { name: 'Physics (Board & Admission)', fallbackCount: 'Browse Batches', icon: faAtom, color: 'text-purple-600 bg-purple-50', href: '/tuitions?subject=Physics' },
    { name: 'IELTS & Spoken English', fallbackCount: 'Browse Batches', icon: faComments, color: 'text-amber-600 bg-amber-50', href: '/tuitions?subject=IELTS' },
    { name: 'ICT & Programming', fallbackCount: 'Browse Batches', icon: faCode, color: 'text-emerald-600 bg-emerald-50', href: '/tuitions?subject=ICT+%26+Programming' },
    { name: 'Chemistry & Biology', fallbackCount: 'Browse Batches', icon: faFlask, color: 'text-rose-600 bg-rose-50', href: '/tuitions?subject=Chemistry' },
    { name: 'Accounting & Commerce', fallbackCount: 'Browse Batches', icon: faChartBar, color: 'text-indigo-600 bg-indigo-50', href: '/tuitions?subject=Accounting' },
  ];

  const testimonials = [
    {
      name: 'Sadia Rahman',
      role: 'HSC Candidate 2026',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      quote: 'MentorLagbe helped me find Dr. Tanvir Sir for Higher Math. His calculus conceptual problem sets helped me secure A+ in pre-test exams.',
      rating: 5,
    },
    {
      name: 'Rafiul Islam',
      role: 'Class 10 SSC Student',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop',
      quote: 'Applying took less than a minute! The mentor accepted my application on the same day and shared the class schedule directly.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Subjects */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
            Popular Categories
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading mt-1">
            Top Subjects in Demand
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Explore dedicated tuition batches organized by Bangladesh's top curriculum subjects.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {subjects.map((sub, index) => (
            <motion.a
              key={sub.name}
              href={sub.href}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.45,
                delay: (index % 6) * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-5 bg-slate-50 hover:bg-emerald-50/50 rounded-2xl border border-slate-200 hover:border-emerald-300 transition text-center group flex flex-col items-center justify-center shadow-sm"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${sub.color}`}>
                <FontAwesomeIcon icon={sub.icon} className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-slate-800 font-heading group-hover:text-emerald-700">
                {sub.name}
              </h4>
              <p className="text-[10px] text-emerald-700 font-semibold mt-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/80 inline-block">
                {subjectCounts[sub.name] !== undefined
                  ? `${subjectCounts[sub.name]} ${subjectCounts[sub.name] === 1 ? 'Active Batch' : 'Active Batches'}`
                  : sub.fallbackCount}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Testimonials */}
        <div className="border-t border-slate-100 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-heading">
              Student Experiences
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading mt-1">
              What Our Learners Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
              >
                <p className="text-sm text-slate-600 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center space-x-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{t.name}</h5>
                    <p className="text-[11px] text-slate-500">{t.role}</p>
                  </div>
                  <div className="ml-auto text-amber-500 text-xs">
                    {'★'.repeat(t.rating)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
